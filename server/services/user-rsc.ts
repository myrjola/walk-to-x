import { cookies } from "next/headers";
import {
  getChallengeForUserId,
  getTotalMetersForTeam,
  getUserFromTokenCookie,
} from "./user";

export function getUser() {
  const token = cookies().get("token");
  if (token) {
    return getUserFromTokenCookie(token.value);
  }
  return undefined;
}

export async function getUserChallenge() {
  const user = await getUser();

  if (!user) {
    return null;
  }

  return await getChallengeForUserId(user.id);
}

export async function getUserTeamMeters() {
  const user = await getUser();

  if (!user || !user.teamId) {
    return null;
  }

  return await getTotalMetersForTeam(user.teamId);
}
