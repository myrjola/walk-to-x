import React from "react";
import * as Table from "../../components/Table";
import Winners from "./Winners";
import StillInTheRace from "./StillInTheRace";

interface Props {
  challengeId: number;
}

export default async function LeaderBoard({ challengeId }: Props) {
  return (
    <Table.Table>
      {/* @ts-expect-error Server Component */}
      <Winners challengeId={challengeId} />
      {/* @ts-expect-error Server Component */}
      <StillInTheRace challengeId={challengeId} />
    </Table.Table>
  );
}
