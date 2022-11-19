import prisma from "../../lib/prisma";
import { cache } from "react";

export const getUserFromTokenCookie = cache(async (token: string) => {
  const authenticator = await prisma.authenticator.findUnique({
    where: {
      credentialID: token,
    },
    include: {
      webAuthnUser: {
        include: {
          userProfile: true,
        },
      },
    },
  });
  return authenticator?.webAuthnUser?.userProfile;
});
