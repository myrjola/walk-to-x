import { getUserChallenge } from "../server/services/user-rsc";
import prisma from "../lib/prisma";
import LegDot from "./LegDot";

export default async function LegDots() {
  const challenge = await getUserChallenge();

  if (!challenge) {
    return null;
  }

  const legs = await prisma.leg.findMany({
    where: {
      challengeId: challenge.id,
    },
    orderBy: {
      meters: "asc",
    },
  });

  return (
    <>
      {legs.map((leg) => (
        <LegDot key={leg.name} name={leg.name} meters={leg.meters} />
      ))}
    </>
  );
}
