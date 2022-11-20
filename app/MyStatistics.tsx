import { getUser } from "../server/services/user-rsc";
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

  return (
    <div className="flex flex-col items-center">
      <div className="text-center">
        <div>You have walked</div>
        <div
          style={{ ["--steps" as any]: totalMeters }}
          className={`font-medium text-xl [transition:--steps_2s] [counter-set:steps_var(--steps)] after:[content:counter(steps)]`}
        />{" "}
        <div>meters!</div>
      </div>
    </div>
  );
}
