"use client";

import { useState } from "react";
import { startRegistration } from "@simplewebauthn/browser";
import { PublicKeyCredentialCreationOptionsJSON } from "@simplewebauthn/typescript-types";

export default function RegisterUser() {
  const [name, setName] = useState("");
  const [verified, setVerified] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          setIsSubmitting(true);
          const res = await fetch(
            `/api/webauthn/generate-registration-options?name=${name}`
          );

          if (res.status !== 200) {
            setVerified(JSON.stringify(await res.json(), null, 2));
            return;
          }

          const options: PublicKeyCredentialCreationOptionsJSON =
            await res.json();

          const attResp = await startRegistration(options);

          const verificationResp = await fetch(
            "/api/webauthn/verify-registration",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ ...attResp, userName: options.user.name }),
            }
          );

          setVerified(JSON.stringify(await verificationResp.json(), null, 2));
          setName("");
          setIsSubmitting(false);
        }}
      >
        <label>
          Your name
          <input
            disabled={isSubmitting}
            name="userName"
            onChange={(event) => setName(event.target.value)}
          />
        </label>
        <button disabled={isSubmitting} type="submit">
          Register
        </button>
      </form>
      <pre>{verified}</pre>
    </>
  );
}
