import prisma from "../../../lib/prisma";
import { headers } from "next/headers";
import JoinTeamButton from "./JoinTeamButton";
import { getUser } from "../../../server/services/user-rsc";

interface Params {
  teamId: string;
}

interface Props {
  params: Params;
}

export default async function Page({ params }: Props) {
  headers(); // Make this page dynamic

  const teamId = parseInt(params.teamId);

  if (!teamId) {
    throw "Invalid team ID!";
  }

  const team = await prisma.team.findFirst({
    where: { id: teamId },
    include: {
      members: true,
    },
  });

  if (!team) {
    throw "Team not found!";
  }

  const user = await getUser();

  const canJointeam = !user || user.teamId !== teamId;

  return (
    <main>
      <h1>{team.name}</h1>
      <h2>Members</h2>
      <ul>
        {team.members.map((member) => (
          <li key={member.id}>{member.name}</li>
        ))}
        {canJointeam && (
          <li>
            <JoinTeamButton teamId={teamId} />
          </li>
        )}
      </ul>
    </main>
  );
}
