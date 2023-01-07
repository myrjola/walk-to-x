import React from "react";
import prisma from "../../lib/prisma";
import * as Table from "../../components/Table";
import { format, parseJSON } from "date-fns";
import Link from "next/link";

interface Props {
  challengeId: number;
}

export default async function LeaderBoard({ challengeId }: Props) {
  const winners = await prisma.$queryRaw<
    { id: number; teamName: string; beatChallengeAt: string }[]
  >`SELECT winningTeams.id, winningTeams.teamName,
       MIN(winningTeams.overChallengeAt) beatChallengeAt
FROM (SELECT t.id,
             t.name                    teamName,
             Distance.createdAt        overChallengeAt,
             SUM(teamDistances.meters) teamSum,
             c.meters
      FROM Team t
               INNER JOIN Challenge c ON t.challengeId = c.id
               INNER JOIN UserProfile ON UserProfile.teamId = t.id
               INNER JOIN Distance ON Distance.userProfileId = UserProfile.id
               INNER JOIN (SELECT up.teamId, d.meters, d.createdAt
                           FROM UserProfile up
                                    INNER JOIN Distance d ON d.userProfileId = up.id
                           GROUP BY up.teamId, d.id, d.meters, d.createdAt) AS teamDistances
                          ON teamDistances.teamId = t.id
      WHERE teamDistances.createdAt <= Distance.createdAt
        AND c.id = ${challengeId}
      GROUP BY t.name,
               Distance.createdAt,
               Distance.meters,
               c.meters
      HAVING teamSum >= c.meters
      ORDER BY Distance.createdAt) as winningTeams
GROUP BY winningTeams.teamName
ORDER BY beatChallengeAt
`;

  if (winners.length === 0) {
    return null;
  }

  return (
    <>
      <Table.Header>
        <Table.ColumnHeaderCell>Team</Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell>Reached goal at</Table.ColumnHeaderCell>
      </Table.Header>
      <tbody>
        {winners.map((winner, index) => (
          <Table.Row key={winner.id} className="relative">
            <Link href={`/teams/${winner.id}`}>
              <Table.RowHeaderCell className="text-left">
                {index === 0 && <div className="absolute left-1.5">🏆</div>}
                {index === 1 && <div className="absolute left-1.5">🥈</div>}
                {index === 2 && <div className="absolute left-1.5">🥉</div>}
                <span>{winner.teamName}</span>
              </Table.RowHeaderCell>
            </Link>
            <Table.Cell className="whitespace-nowrap text-left font-mono">
              {format(parseJSON(winner.beatChallengeAt), "dd.MM.yyyy hh:mm")}
            </Table.Cell>
          </Table.Row>
        ))}
      </tbody>
    </>
  );
}
