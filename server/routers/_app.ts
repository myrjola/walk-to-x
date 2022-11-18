import { z } from "zod";
import { protectedProcedure, router } from "../trpc";
import prisma from "../../lib/prisma";
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
});

export type AppRouter = typeof appRouter;
