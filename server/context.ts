import { inferAsyncReturnType } from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { getUserFromTokenCookie } from "./services/user";

export async function createContext({
  req,
}: trpcNext.CreateNextContextOptions) {
  const token = req.cookies.token;

  let user;
  if (token) {
    user = await getUserFromTokenCookie(token);
  }

  return {
    user,
  };
}
export type Context = inferAsyncReturnType<typeof createContext>;
