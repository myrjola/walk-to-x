import { generateRegistrationOptions } from "@simplewebauthn/server";
import { NextApiRequest, NextApiResponse } from "next";
import { rpID, rpName } from "../../../utils/webauthn";
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

  const profile = await prisma.userProfile.upsert({
    where: {
      name,
    },
    update: {},
    create: {
      name,
    },
  });

  const userProfileId = profile.id;

  const user = await prisma.webAuthnUser.upsert({
    where: {
      userProfileId,
    },
    update: {},
    create: {
      userProfileId,
    },
    include: {
      authenticators: true,
    },
  });

  const userAuthenticators = user.authenticators;

  if (userAuthenticators.length > 0) {
    res.status(403).json({ error: "user already registered" });
    return;
  }

  const options = generateRegistrationOptions({
    rpName,
    rpID,
    userID: user.id.toString(),
    userName: profile.name,
    // Don't prompt users for additional information about the authenticator
    // (Recommended for smoother UX)
    attestationType: "none",
  });

  await prisma.webAuthnUser.update({
    where: { id: user.id },
    data: { challenge: options.challenge },
  });

  res.status(200).json(options);
}
