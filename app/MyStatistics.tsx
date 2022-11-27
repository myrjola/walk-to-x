import {
  getUser,
  getUserChallenge,
  getUserTeamMeters,
} from "../server/services/user-rsc";
import prisma from "../lib/prisma";

export default async function MyStatistics() {
  const user = await getUser();

  if (!user) {
    return null;
  }

  const totalDistance = await prisma.distance.aggregate({
    where: {
      userProfileId: user.id,
    },
    _sum: {
      meters: true,
    },
  });

  const totalMeters = Math.floor(totalDistance._sum.meters ?? 0);

  const challengePromise = getUserChallenge();
  const teamMetersPromise = getUserTeamMeters();

  const challenge = await challengePromise;

  if (!challenge) {
    return null;
  }

  const lastLeg = await prisma.leg.findFirst({
    where: {
      challengeId: challenge.id,
    },
    orderBy: {
      meters: "desc",
    },
  });

  const teamMeters = await teamMetersPromise;

  if (teamMeters == null) {
    return null;
  }

  const remainingDistance = Math.floor(
    Math.max(0, challenge.meters - teamMeters)
  );

  return (
    <div className="m-4 flex justify-between gap-2 text-sm text-gray-600">
      <div className="text-left">
        <div>You have walked</div>
        <div
          style={{ ["--meters" as any]: totalMeters }}
          className={`font-mono text-xl font-medium [transition:--meters_2s] [counter-reset:meters_var(--meters)] after:[content:counter(meters)]`}
        />{" "}
        <div>meters</div>
      </div>
      <div className="text-right">
        <div>Your team has</div>
        <div
          style={{ ["--meters" as any]: remainingDistance }}
          className={`font-mono text-xl font-medium [transition:--meters_2s] [counter-reset:meters_var(--meters)] after:[content:counter(meters)]`}
        />{" "}
        <div>meters to {lastLeg?.name}</div>
      </div>
    </div>
  );
}
