import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import prisma from "../../lib/prisma";
export const appRouter = router({
  addTeam: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        challengeId: z.number(),
      })
    )
    .query(async ({ input, ctx }) => {
      const user = await prisma.userProfile.update({
        where: {
          id: ctx.user.id,
        },
        data: {
          team: {
            create: {
              name: input.name,
              challengeId: input.challengeId,
            },
          },
        },
        include: {
          team: true,
        },
      });

      return user.team;
    }),

  joinTeam: protectedProcedure
    .input(
      z.object({
        teamId: z.number().positive(),
      })
    )
    .query(async ({ input, ctx }) => {
      await prisma.userProfile.update({
        where: {
          id: ctx.user.id,
        },
        data: {
          teamId: input.teamId,
        },
      });

      return true;
    }),
});

export type AppRouter = typeof appRouter;
