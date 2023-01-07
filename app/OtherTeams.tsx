import prisma from "../lib/prisma";
import { getUser, getUserChallenge } from "../server/services/user-rsc";
import OtherTeam from "./OtherTeam";

interface Props {
  userTeamMeters: number;
}

export default async function OtherTeams({ userTeamMeters }: Props) {
  const user = await getUser();

  if (!user || !user.teamId) {
    return null;
  }

  const challenge = await getUserChallenge();

  if (!challenge) {
    return null;
  }

  const teams = await prisma.$queryRaw<
    {
      id: number;
      name: string;
      teamMeters: number;
    }[]
  >`
SELECT T.id, T.name, sum(D.meters) teamMeters
FROM Team T
INNER JOIN Challenge C on T.challengeId = ${challenge.id}
INNER JOIN UserProfile UP on UP.teamId = T.id
INNER JOIN Distance D on D.userProfileId = UP.id
WHERE T.id != ${user.teamId}
GROUP BY T.id, T.name, C.meters
HAVING teamMeters > 0 AND teamMeters < C.meters
ORDER BY teamMeters
`;

  return (
    <>
      {teams.map((team, index) => (
        <OtherTeam
          key={team.id}
          id={team.id}
          index={index}
          teamMeters={team.teamMeters}
          userTeamMeters={userTeamMeters}
          name={team.name}
        />
      ))}
    </>
  );
}
