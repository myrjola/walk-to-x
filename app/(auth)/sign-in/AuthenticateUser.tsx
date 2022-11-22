"use client";

import { startAuthentication } from "@simplewebauthn/browser";
import { PublicKeyCredentialRequestOptionsJSON } from "@simplewebauthn/typescript-types";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as FormControls from "../../../components/FormControls";
import { LockClosedIcon } from "@heroicons/react/20/solid";
import LoadingSpinner from "../../../components/LoadingSpinner";

interface FormData {
  userName: string;
}

export default function AuthenticateUser() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { isSubmitting, errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(async ({ userName }) => {
    const res = await fetch(
      `/api/webauthn/generate-authentication-options?name=${userName}`
    );

    if (res.status !== 200) {
      const errorResponse = await res.json();

      setError("userName", {
        message: errorResponse.error,
      });
      return;
    }

    const options: PublicKeyCredentialRequestOptionsJSON = await res.json();

    try {
      const asseResp = await startAuthentication(options);

      await fetch("/api/webauthn/verify-authentication", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...asseResp, userName }),
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
          className="btn-primary group"
          type="submit"
        >
          <span className="absolute inset-y-0 left-0 flex items-center pl-3">
            {isSubmitting ? (
              <LoadingSpinner />
            ) : (
              <LockClosedIcon
                className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                aria-hidden="true"
              />
            )}
          </span>
          {isSubmitting ? "Signing in..." : "Sign in"}
        </button>
      </div>
    </form>
  );
}
