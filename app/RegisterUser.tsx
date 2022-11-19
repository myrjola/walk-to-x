"use client";

import { startRegistration } from "@simplewebauthn/browser";
import { PublicKeyCredentialCreationOptionsJSON } from "@simplewebauthn/typescript-types";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

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
      setError("userName", {
        message: JSON.stringify(await res.json(), null, 2),
      });
      return;
    }

    const options: PublicKeyCredentialCreationOptionsJSON = await res.json();

    const attResp = await startRegistration(options);

    await fetch("/api/webauthn/verify-registration", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...attResp, userName: options.user.name }),
    });
    router.refresh();
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <label>
          Your name
          <input {...register("userName")} autoComplete="username webauthn" />
        </label>
        {errors.userName && <pre>{errors.userName?.message}</pre>}
        <button disabled={isSubmitting} type="submit">
          Register
        </button>
      </form>
    </>
  );
}
