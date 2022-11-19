import { cookies } from "next/headers";
import { getUserFromTokenCookie } from "./user";

export function getUser() {
  const token = cookies().get("token");
  if (token) {
    return getUserFromTokenCookie(token.value);
  }
  return undefined;
}
