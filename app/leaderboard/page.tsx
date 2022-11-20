import { getUser } from "../../server/services/user-rsc";
import prisma from "../../lib/prisma";
import { redirect } from "next/navigation";

export default async function Leaderboard() {
  const user = await getUser();

  if (!user) {
    redirect("/");
    return null;
  }

  const challenge = await prisma.userProfile
    .findUnique({
      where: {
        id: user.id,
      },
    })
    .team()
    .challenge();

  if (!challenge) {
    redirect("/");
    return null;
  }

  const winners = await prisma.$queryRaw`
SELECT winningTeams.teamName,
       MIN(winningTeams.overChallengeAt) beatChallengeAt
FROM (
SELECT Team.name teamName,
       Distance.createdAt overChallengeAt,
       SUM(teamDistances.meters) teamSum,
       Challenge.meters
FROM Team
         INNER JOIN Challenge ON Team.challengeId = Challenge.id
         INNER JOIN UserProfile ON UserProfile.teamId = Team.id
         INNER JOIN Distance ON Distance.userProfileId = UserProfile.id
         INNER JOIN Distance teamDistances ON Distance.userProfileId = UserProfile.id AND Distance.userProfileId = teamDistances.userProfileId
WHERE teamDistances.createdAt <= Distance.createdAt
GROUP BY Team.name,
       Distance.createdAt,
       Distance.meters,
       teamDistances.userProfileId,
       Challenge.meters
HAVING teamSum >= Challenge.meters
ORDER BY Distance.createdAt) as winningTeams
GROUP BY winningTeams.teamName
ORDER BY beatChallengeAt
`;

  return (
    <div className="text-center p-4">
      <h1 className="text-3xl font-medium">{challenge.name}</h1>

      <h2>Winners</h2>

      <pre className="text-left">{JSON.stringify(winners, null, 2)}</pre>
    </div>
  );
}
