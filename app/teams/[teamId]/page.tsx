import prisma from "../../../lib/prisma";
import { headers } from "next/headers";
import Members from "./Members";

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
  });

  if (!team) {
    throw "Team not found!";
  }

  return (
    <main className="mx-auto mb-8 flex max-w-md flex-col px-4">
      <h1 className="my-4 text-center text-2xl font-medium">{team.name}</h1>
      {/* @ts-expect-error Server Component */}
      <Members teamId={teamId} />
    </main>
  );
}
