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
    .mutation(async ({ input, ctx }) => {
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
    .mutation(async ({ input, ctx }) => {
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

  logDistance: protectedProcedure
    .input(
      z.object({
        meters: z.number().positive(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return prisma.distance.create({
        data: {
          userProfileId: ctx.user.id,
          meters: input.meters,
        },
      });
    }),
});

export type AppRouter = typeof appRouter;
