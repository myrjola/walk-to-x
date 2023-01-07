import { getUser } from "../../../server/services/user-rsc";
import JoinTeamButton from "./JoinTeamButton";
import { getMembers } from "../../../server/services/members";
import * as Table from "../../../components/Table";
import React from "react";

interface Props {
  teamId: number;
}

export default async function Members({ teamId }: Props) {
  const members = await getMembers(teamId);
  const user = await getUser();

  const canJointeam = user && user.teamId !== teamId;

  return (
    <>
      <h2 className="mb-2 text-xl font-medium">Members</h2>
      <Table.Table className="w-full">
        <Table.Header>
          <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Distance (meters)</Table.ColumnHeaderCell>
        </Table.Header>
        <tbody>
          {members.map((member) => (
            <Table.Row key={member.id}>
              <Table.RowHeaderCell>{member.name}</Table.RowHeaderCell>
              <Table.Cell className="whitespace-nowrap text-left font-mono">
                {Math.round(
                  member.distances.reduce((sum, d) => sum + d.meters, 0)
                )}
              </Table.Cell>
            </Table.Row>
          ))}
        </tbody>
      </Table.Table>
      {canJointeam && <JoinTeamButton teamId={teamId} />}
    </>
  );
}
