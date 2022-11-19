"use client";

import { startAuthentication } from "@simplewebauthn/browser";
import { PublicKeyCredentialRequestOptionsJSON } from "@simplewebauthn/typescript-types";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as FormControls from "../components/FormControls";
import { useEffect } from "react";

interface FormData {
  userName: string;
}

export default function AuthenticateUser() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<FormData>();

  const userName = watch("userName");

  useEffect(() => {
    if (userName) {
      fetch(`/api/webauthn/generate-authentication-options?name=${userName}`)
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            throw "error";
          }
        })
        .then((options) => startAuthentication(options, true))
        .then((asseResp) =>
          fetch("/api/webauthn/verify-authentication", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...asseResp, userName }),
          })
        )
        .then(() => router.refresh());
    }
  }, [userName, router]);

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
    }

    router.refresh();
  });

  return (
    <form className="flex flex-col mx-auto" onSubmit={onSubmit}>
      <FormControls.Label htmlFor="userName">Your name</FormControls.Label>
      <FormControls.Input
        id="userName"
        aria-invalid={errors.userName ? "true" : "false"}
        autoComplete="webauthn"
        aria-errormessage={errors.userName ? "username-error" : undefined}
        {...register("userName")}
      />
      {errors.userName && (
        <FormControls.Error id="username-error">
          {errors.userName?.message}
        </FormControls.Error>
      )}
      <button disabled={isSubmitting} type="submit">
        Sign in
      </button>
    </form>
  );
}
