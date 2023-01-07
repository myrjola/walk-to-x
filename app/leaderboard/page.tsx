import { getUser } from "../../server/services/user-rsc";
import prisma from "../../lib/prisma";
import { redirect } from "next/navigation";
import LeaderBoard from "./LeaderBoard";

export default async function Leaderboard() {
  const user = await getUser();

  if (!user) {
    redirect("/");
    return null;
  }

  const challenge = await prisma.challenge.findFirst({
    where: {
      teams: {
        some: {
          members: {
            some: {
              id: {
                equals: user.id,
              },
            },
          },
        },
      },
    },
  });

  if (!challenge) {
    redirect("/");
    return null;
  }

  return (
    <div className="p-4 text-center">
      <h1 className="mb-4 text-3xl font-medium">{challenge.name}</h1>
      {/* @ts-expect-error Server Component */}
      <LeaderBoard challengeId={challenge.id} />
    </div>
  );
}
