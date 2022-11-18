import { inferAsyncReturnType } from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import prisma from "../lib/prisma";

async function getUserProfileFromTokenCookie(token?: string) {
  if (token) {
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
  }
  return null;
}

export async function createContext({
  req,
}: trpcNext.CreateNextContextOptions) {
  const token = req.cookies.token;
  const user = await getUserProfileFromTokenCookie(token);
  return {
    user,
  };
}
export type Context = inferAsyncReturnType<typeof createContext>;
