import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import {
  VerifiedRegistrationResponse,
  verifyRegistrationResponse,
} from "@simplewebauthn/server";
import { expectedOrigin, expectedRPID } from "../../../utils/webauthn";
import { RegistrationCredentialJSON } from "@simplewebauthn/typescript-types";

interface Input extends RegistrationCredentialJSON {
  userName: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body as Input;

  const profile = await prisma.userProfile.findUnique({
    where: {
      name: body.userName,
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
    res.status(400).json({ error: "user not found" });
    return;
  }

  if (profile.webAuthnUser.authenticators.length > 0) {
    res.status(403).json({ error: "user already registered" });
    return;
  }

  const expectedChallenge = profile.webAuthnUser.challenge;

  if (!expectedChallenge) {
    res.status(403).json({ error: "call generate-registration-options first" });
    return;
  }

  let verification: VerifiedRegistrationResponse;
  try {
    verification = await verifyRegistrationResponse({
      credential: body,
      expectedChallenge,
      expectedOrigin,
      expectedRPID,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ error: (error as any).message });
  }

  const { verified, registrationInfo } = verification;
  if (!registrationInfo) {
    res.status(500).json({ error: "empty registrationInfo" });
    return;
  }
  const {
    credentialPublicKey,
    credentialID,
    counter,
    credentialDeviceType,
    credentialBackedUp,
  } = registrationInfo;

  await prisma.authenticator.create({
    data: {
      credentialPublicKey: credentialPublicKey,
      credentialId: credentialID.toString("base64"),
      counter,
      credentialDeviceType,
      credentialBackedUp,
      webAuthnUserId: profile.webAuthnUser.id,
    },
  });

  res.status(200).json({ verified });
}
