"use client";

import { useState } from "react";
import { startAuthentication } from "@simplewebauthn/browser";
import { PublicKeyCredentialRequestOptionsJSON } from "@simplewebauthn/typescript-types";
import { useRouter } from "next/navigation";

export default function AuthenticateUser() {
  const [name, setName] = useState("");
  const [verified, setVerified] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  return (
    <>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          setIsSubmitting(true);
          const res = await fetch(
            `/api/webauthn/generate-authentication-options?name=${name}`
          );

          if (res.status !== 200) {
            setVerified(JSON.stringify(await res.json(), null, 2));
            return;
          }

          const options: PublicKeyCredentialRequestOptionsJSON =
            await res.json();

          const asseResp = await startAuthentication(options);

          const verificationResp = await fetch(
            "/api/webauthn/verify-authentication",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ ...asseResp, userName: name }),
            }
          );

          setVerified(JSON.stringify(await verificationResp.json(), null, 2));
          setName("");
          setIsSubmitting(false);
          router.refresh();
        }}
      >
        <label>
          Your name
          <input
            disabled={isSubmitting}
            name="username"
            autoComplete="username webauthn"
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <button disabled={isSubmitting} type="submit">
          Sign in
        </button>
      </form>
      <pre>{verified}</pre>
    </>
  );
}
