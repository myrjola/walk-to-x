import { cookies } from "next/headers";
import {
  getChallengeForUserId,
  getTeam,
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

export async function getUserTeam() {
  const user = await getUser();

  if (!user || !user.teamId) {
    return null;
  }

  return await getTeam(user.teamId);
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
