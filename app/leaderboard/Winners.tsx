import React from "react";
import prisma from "../../lib/prisma";
import * as Table from "../../components/Table";
import { format, parseJSON } from "date-fns";

interface Props {
  challengeId: number;
}

export default async function Winners({ challengeId }: Props) {
  const winners = await prisma.$queryRaw<
    { id: number; teamName: string; beatChallengeAt: string }[]
  >`
SELECT winningTeams.teamName,
       MIN(winningTeams.overChallengeAt) beatChallengeAt
FROM (
SELECT 
    Team.id,
    Team.name teamName,
    Distance.createdAt overChallengeAt,
    SUM(teamDistances.meters) teamSum,
    Challenge.meters
FROM Team
         INNER JOIN Challenge ON Team.challengeId = Challenge.id
         INNER JOIN UserProfile ON UserProfile.teamId = Team.id
         INNER JOIN Distance ON Distance.userProfileId = UserProfile.id
         INNER JOIN Distance teamDistances ON Distance.userProfileId = UserProfile.id AND Distance.userProfileId = teamDistances.userProfileId
WHERE teamDistances.createdAt <= Distance.createdAt
      AND Challenge.id = ${challengeId}
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

  if (winners.length === 0) {
    return null;
  }

  return (
    <>
      <h2 className="font-medium text-xl my-5">Winners</h2>

      <Table.Table>
        <Table.Header>
          <Table.ColumnHeaderCell>Team</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Reached goal at</Table.ColumnHeaderCell>
        </Table.Header>
        <tbody>
          {winners.map((winner, index) => (
            <Table.Row className="relative" key={winner.id}>
              <Table.RowHeaderCell className="text-left">
                {index === 0 && <div className="absolute left-1.5">🏆</div>}
                {index === 1 && <div className="absolute left-1.5">🥈</div>}
                {index === 2 && <div className="absolute left-1.5">🥉</div>}
                <span>{winner.teamName}</span>
              </Table.RowHeaderCell>
              <Table.Cell className="text-left font-mono whitespace-nowrap">
                {format(parseJSON(winner.beatChallengeAt), "dd.MM.yyyy hh:mm")}
              </Table.Cell>
            </Table.Row>
          ))}
        </tbody>
      </Table.Table>
    </>
  );
}
