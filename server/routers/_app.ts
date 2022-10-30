import { z } from "zod";
import { publicProcedure, router } from "../trpc";
import prisma from "../../lib/prisma";
export const appRouter = router({
  addTeam: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .query(({ input }) => {
      return prisma.team.create({data: {name: input.name}});
    }),
});

export type AppRouter = typeof appRouter;
