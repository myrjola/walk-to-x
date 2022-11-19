import prisma from "../../lib/prisma";
import { cache } from "react";

export const getMembers = cache(async (teamId: number) => {
  return await prisma.userProfile.findMany({
    where: {
      teamId,
    },
  });
});
