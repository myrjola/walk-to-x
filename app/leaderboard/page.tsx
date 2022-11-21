import { getUser } from "../../server/services/user-rsc";
import prisma from "../../lib/prisma";
import { redirect } from "next/navigation";
import Winners from "./Winners";

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
    <div className="text-center p-4">
      <h1 className="text-3xl font-medium">{challenge.name}</h1>
      {/* @ts-expect-error Server Component */}
      <Winners challengeId={challenge.id} />
    </div>
  );
}
