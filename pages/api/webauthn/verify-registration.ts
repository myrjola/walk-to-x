import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import {
  VerifiedRegistrationResponse,
  verifyRegistrationResponse,
} from "@simplewebauthn/server";
import { RegistrationResponseJSON } from "@simplewebauthn/typescript-types";
import { resolveRpIdAndOrigin } from "../../../utils/webauthn";

interface Input extends RegistrationResponseJSON {
  userName: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body as Input;

  const { userName } = body;
  if (!userName) {
    res.status(400).json({ error: "Invalid username" });
    return;
  }

  const profile = await prisma.userProfile.findUnique({
    where: {
      name: userName,
    },
    include: {
      webAuthnUser: {
        include: {
          authenticators: true,
        },
      },
    },
  });

  if (!profile || !profile.webAuthnUser) {
    res.status(400).json({ error: "User not found" });
    return;
  }

  if (profile.webAuthnUser.authenticators.length > 0) {
    res.status(403).json({ error: "User already registered" });
    return;
  }

  const expectedChallenge = profile.webAuthnUser.challenge;

  if (!expectedChallenge) {
    res.status(403).json({ error: "Call generate-registration-options first" });
    return;
  }

  let verification: VerifiedRegistrationResponse;

  const { rpId, origin } = resolveRpIdAndOrigin(req.headers);

  try {
    verification = await verifyRegistrationResponse({
      response: body,
      expectedChallenge,
      expectedOrigin: origin,
      expectedRPID: rpId,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ error: (error as any).message });
  }

  const { verified, registrationInfo } = verification;
  if (!registrationInfo) {
    res.status(500).json({ error: "Empty registrationInfo" });
    return;
  }
  const {
    credentialPublicKey,
    credentialID,
    counter,
    credentialDeviceType,
    credentialBackedUp,
  } = registrationInfo;

  const encodedCredentialId = Buffer.from(credentialID).toString("base64url");

  await prisma.authenticator.create({
    data: {
      credentialPublicKey: Buffer.from(credentialPublicKey),
      credentialID: encodedCredentialId,
      counter,
      credentialDeviceType,
      credentialBackedUp,
      webAuthnUserId: profile.webAuthnUser.id,
    },
  });

  res.setHeader(
    "Set-Cookie",
    `token=${encodedCredentialId}; path=/; samesite=lax; httponly;`
  );

  res.status(200).json({ verified });
}
