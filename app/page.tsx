import {
  getUser,
  getUserChallenge,
  getUserTeam,
  getUserTeamMeters,
} from "../server/services/user-rsc";
import { redirect } from "next/navigation";
import LogDistance from "./LogDistance";
import MyStatistics from "./MyStatistics";
import ChallengeTrack from "./ChallengeTrack";
import { metersToPx } from "./walkUtil";
import LegDots from "./LegDots";
import OtherTeams from "./OtherTeams";
import MyTeam from "./MyTeam";

export default async function Page() {
  const user = await getUser();

  if (!user) {
    redirect("/register");
    return;
  }

  if (!user.teamId) {
    redirect("/teams");
    return null;
  }

  const teamPromise = getUserTeam(),
    challengePromise = getUserChallenge(),
    userTeamMetersPromise = getUserTeamMeters();

  const team = await teamPromise,
    challenge = await challengePromise,
    userTeamMeters = await userTeamMetersPromise;

  if (!challenge || !team || userTeamMeters == null) {
    return null;
  }

  const clampedUserTeamMeters = Math.min(challenge.meters, userTeamMeters);

  return (
    <>
      <LogDistance />
      {/* @ts-expect-error Server Component */}
      <MyStatistics />
      <ChallengeTrack userTeamMeters={clampedUserTeamMeters}>
        <div
          style={{
            ["--challengeMeters" as any]: metersToPx(challenge.meters),
          }}
          className="relative left-[50%] h-[200px] w-[var(--challengeMeters)] border-b-8 border-dashed border-b-gray-600"
        >
          <div className="absolute -right-1/2 h-1 w-1/2" />
          {/* @ts-expect-error Server Component */}
          <LegDots />
          {/* @ts-expect-error Server Component */}
          <OtherTeams userTeamMeters={clampedUserTeamMeters} />
          <MyTeam meters={clampedUserTeamMeters} name={team.name} />
        </div>
      </ChallengeTrack>
    </>
  );
}
