import {
  getUser,
  getUserChallenge,
  getUserTeamMeters,
} from "../server/services/user-rsc";
import { redirect } from "next/navigation";
import LogDistance from "./LogDistance";
import MyStatistics from "./MyStatistics";
import ChallengeTrack from "./ChallengeTrack";
import { metersToPx } from "./walkUtil";
import Walker from "../components/icons/walker";
import LegDots from "./LegDots";
import OtherTeams from "./OtherTeams";

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

  const challenge = await getUserChallenge();

  if (!challenge) {
    return null;
  }

  let userTeamMeters = await getUserTeamMeters();
  if (userTeamMeters == null) {
    return null;
  }
  userTeamMeters = Math.min(challenge.meters, userTeamMeters);

  return (
    <>
      <LogDistance />
      {/* @ts-expect-error Server Component */}
      <MyStatistics />
      <ChallengeTrack userTeamMeters={userTeamMeters}>
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
          <OtherTeams userTeamMeters={userTeamMeters} />
          <div
            style={{
              ["--teamMeters" as any]: metersToPx(userTeamMeters),
            }}
            className="absolute left-[var(--teamMeters)] bottom-8 w-min -translate-x-1/2 text-center text-gray-600 drop-shadow-gray transition-left duration-1000 ease-in-out"
          >
            <div className="mb-1 font-medium">The snails</div>
            <Walker width={88} height={88} className="mx-auto" />
          </div>
        </div>
      </ChallengeTrack>
    </>
  );
}
