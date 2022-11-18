import prisma from "../../../lib/prisma";
import { headers } from "next/headers";

interface Params {
  teamId: string;
}

interface Props {
  params: Params;
}

export default async function Page({ params }: Props) {
  headers(); // Make this page dynamic

  const id = parseInt(params.teamId);

  if (!id) {
    throw "Invalid team ID!";
  }

  const team = await prisma.team.findFirst({
    where: { id },
    include: {
      members: true,
    },
  });

  if (!team) {
    throw "Team not found!";
  }

  return (
    <main>
      <h1>{team.name}</h1>
      <h2>Members</h2>
      <ul>
        {team.members.map((member) => (
          <li key={member.id}>{member.name}</li>
        ))}
      </ul>
    </main>
  );
}
