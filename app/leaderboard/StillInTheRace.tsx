import React from "react";
import prisma from "../../lib/prisma";
import * as Table from "../../components/Table";
import Link from "next/link";

interface Props {
  challengeId: number;
}

export default async function LeaderBoard({ challengeId }: Props) {
  // language=MySQL
  const stillInTheRace = await prisma.$queryRaw<
    { id: number; teamName: string; remainingDistance: number }[]
  >`
SELECT t.id, t.name teamName, c.meters - sum(d.meters) remainingDistance
FROM Team t
         INNER JOIN Challenge c ON t.challengeId = c.id
         INNER JOIN UserProfile up ON up.teamId = t.id
         INNER JOIN Distance d ON d.userProfileId = up.id
WHERE c.id = ${challengeId}
GROUP BY t.id, t.name, c.meters
HAVING c.meters - sum(d.meters) > 0
ORDER BY remainingDistance
`;

  if (stillInTheRace.length === 0) {
    return null;
  }

  return (
    <>
      <Table.Header>
        <Table.ColumnHeaderCell>Team</Table.ColumnHeaderCell>
        <Table.ColumnHeaderCell>
          Remaining distance (meters)
        </Table.ColumnHeaderCell>
      </Table.Header>
      <tbody>
        {stillInTheRace.map((team) => (
          <Table.Row key={team.id}>
            <Link href={`/teams/${team.id}`}>
              <Table.RowHeaderCell className="text-left">
                <span>{team.teamName}</span>
              </Table.RowHeaderCell>
            </Link>
            <Table.Cell className="whitespace-nowrap text-left font-mono">
              {Math.ceil(team.remainingDistance)}
            </Table.Cell>
          </Table.Row>
        ))}
      </tbody>
    </>
  );
}
