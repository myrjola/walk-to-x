import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";
import {
  VerifiedAuthenticationResponse,
  verifyAuthenticationResponse,
} from "@simplewebauthn/server";
import { AuthenticationCredentialJSON } from "@simplewebauthn/typescript-types";
import { resolveRpIdAndOrigin } from "../../../utils/webauthn";

interface Input extends AuthenticationCredentialJSON {
  userName: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body as Input;

  const { userName } = body;
  if (!userName) {
    res.status(400).json({ error: "invalid username" });
    return;
  }

  const profile = await prisma.userProfile.findUnique({
    where: {
      name: userName,
    },
    include: {
      webAuthnUser: true,
    },
  });

  if (!profile || !profile.webAuthnUser) {
    res.status(400).json({ error: "user not found" });
    return;
  }

  const expectedChallenge = profile.webAuthnUser.challenge;

  if (!expectedChallenge) {
    res
      .status(403)
      .json({ error: "call generate-authentication-options first" });
    return;
  }

  let verification: VerifiedAuthenticationResponse;

  const { rpId, origin } = resolveRpIdAndOrigin(req.headers);

  const authenticator = await prisma.authenticator.findUnique({
    where: {
      credentialID: body.id,
    },
  });

  if (!authenticator) {
    res.status(403).json({ error: "invalid authenticator id" });
    return;
  }

  try {
    verification = await verifyAuthenticationResponse({
      credential: body,
      expectedChallenge,
      expectedOrigin: origin,
      expectedRPID: rpId,
      authenticator: {
        ...authenticator,
        transports: undefined,
        credentialID: Buffer.from(authenticator.credentialID, "base64url"),
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send({ error: (error as any).message });
  }

  const { verified, authenticationInfo } = verification;

  const { newCounter } = authenticationInfo;

  await prisma.authenticator.update({
    where: {
      credentialID: authenticator.credentialID,
    },
    data: {
      counter: newCounter,
    },
  });

  res.setHeader(
    "Set-Cookie",
    `token=${authenticator.credentialID}; path=/; samesite=lax; httponly;`
  );

  res.status(200).json({ verified });
}
