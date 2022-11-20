"use client";

import { startRegistration } from "@simplewebauthn/browser";
import { PublicKeyCredentialCreationOptionsJSON } from "@simplewebauthn/typescript-types";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import * as FormControls from "../../../components/FormControls";
import { LockClosedIcon } from "@heroicons/react/20/solid";

interface FormData {
  userName: string;
}

export default function RegisterUser() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(async ({ userName }) => {
    const res = await fetch(
      `/api/webauthn/generate-registration-options?name=${userName}`
    );

    if (res.status !== 200) {
      const response = await res.json();
      setError("userName", {
        message: response.error,
      });
      return;
    }

    const options: PublicKeyCredentialCreationOptionsJSON = await res.json();

    try {
      const attResp = await startRegistration(options);

      await fetch("/api/webauthn/verify-registration", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...attResp, userName: options.user.name }),
      });
    } catch (e) {
      setError("userName", {
        message: e + "",
      });
      return;
    }
    router.push("/");
    router.refresh();
  });

  return (
    <form className="mt-8 space-y-2" onSubmit={onSubmit}>
      <div>
        <FormControls.Label htmlFor="userName">Your name</FormControls.Label>
        <FormControls.Input
          id="userName"
          type="text"
          autoFocus
          aria-invalid={Boolean(errors.userName)}
          autoComplete="webauthn"
          aria-errormessage={errors.userName ? "username-error" : undefined}
          {...register("userName", { required: "Fill in your name" })}
        />
        <FormControls.Error id="username-error" error={errors.userName} />
      </div>

      <div>
        <button
          disabled={isSubmitting}
          className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          type="submit"
        >
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            {isSubmitting ? (
              <div role="status">
                <svg
                  aria-hidden="true"
                  className="mr-2 w-5 h-5 animate-spin fill-indigo-400"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              </div>
            ) : (
              <LockClosedIcon
                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                aria-hidden="true"
              />
            )}
          </span>
          {isSubmitting ? "Registering..." : "Register"}
        </button>
      </div>
    </form>
  );
}
