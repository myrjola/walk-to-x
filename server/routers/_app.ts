import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import prisma from "../../lib/prisma";
import { TRPCError } from "@trpc/server";
export const appRouter = router({
  addTeam: protectedProcedure
    .input(
      z.object({
        name: z.string(),
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

  addTeamMember: protectedProcedure
    .input(
      z.object({
        teamId: z.number().positive(),
        userId: z.number().positive(),
      })
    )
    .query(async ({ input, ctx }) => {
      if (ctx.user.teamId !== input.teamId) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Not your team" });
      }

      const user = await prisma.userProfile.update({
        where: {
          id: input.userId,
          teamId: undefined,
        },
        data: {
          teamId: input.teamId,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "User not found or already has team",
        });
      }

      return true;
    }),
});

export type AppRouter = typeof appRouter;
