"use client";

import { startAuthentication } from "@simplewebauthn/browser";
import { PublicKeyCredentialRequestOptionsJSON } from "@simplewebauthn/typescript-types";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

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
      setError("userName", {
        message: JSON.stringify(await res.json(), null, 2),
      });
      return;
    }

    const options: PublicKeyCredentialRequestOptionsJSON = await res.json();

    const asseResp = await startAuthentication(options);

    await fetch("/api/webauthn/verify-authentication", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...asseResp, userName }),
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
          Sign in
        </button>
      </form>
    </>
  );
}
