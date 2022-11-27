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

export const getChallengeForUserId = cache(async (userId: number) => {
  return await prisma.challenge.findFirst({
    where: {
      teams: {
        some: {
          members: {
            some: {
              id: userId,
            },
          },
        },
      },
    },
  });
});

export const getTotalMetersForTeam = cache(async (teamId: number) => {
  const aggregations = await prisma.distance.aggregate({
    where: {
      userProfile: {
        teamId: teamId,
      },
    },
    _sum: {
      meters: true,
    },
  });
  return aggregations._sum.meters ?? 0;
});
