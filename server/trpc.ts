import { initTRPC, TRPCError } from "@trpc/server";
import { Context } from "./context";
import prisma from "../lib/prisma";

const t = initTRPC.context<Context>().create();

const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  return next({
    ctx: {
      user: ctx.user,
    },
  });
});

const hasTeam = t.middleware(async ({ next, ctx }) => {
  if (!ctx.user) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  const user = await prisma.userProfile.findUniqueOrThrow({
    where: {
      id: ctx.user.id,
    },
    include: {
      team: true,
    },
  });

  return next({
    ctx: {
      user: ctx.user,
      team: user.team,
    },
  });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
export const withTeamProcedure = t.procedure.use(hasTeam);
