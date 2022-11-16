import { generateAuthenticationOptions } from "@simplewebauthn/server";
import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const name = req.query.name?.toString().trim();
  if (!name) {
    res.status(400).json({ error: "invalid username" });
    return;
  }

  const profile = await prisma.userProfile.findUnique({
    where: {
      name,
    },
    include: {
      webAuthnUser: {
        include: {
          authenticators: true,
        },
      },
    },
  });

  if (!profile) {
    res.status(403).json({ error: "user not found" });
    return;
  }

  const user = profile.webAuthnUser;

  if (!user) {
    res.status(403).json({ error: "no webauthn user" });
    return;
  }

  const userAuthenticators = user.authenticators;

  if (userAuthenticators.length == 0) {
    res.status(403).json({ error: "register an authenticator first" });
    return;
  }

  const options = generateAuthenticationOptions({
    // Require users to use a previously-registered authenticator
    allowCredentials: userAuthenticators.map((authenticator) => ({
      id: Buffer.from(authenticator.credentialID, "base64url"),
      type: "public-key",
    })),
    userVerification: "preferred",
  });

  await prisma.webAuthnUser.update({
    where: { id: user.id },
    data: { challenge: options.challenge },
  });

  res.status(200).json(options);
}
