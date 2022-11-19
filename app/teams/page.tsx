import Link from "next/link";
import prisma from "../../lib/prisma";
import { headers } from "next/headers";
import CreateTeam from "./CreateTeam";

export default async function Page() {
  headers(); // Make this page dynamic

  const teams = await prisma.team.findMany();
  const challenges = await prisma.challenge.findMany();

  return (
    <main>
      <h1>Walk to X</h1>
      <CreateTeam
        challenges={challenges.map(({ id, name }) => ({ name, id }))}
      />
      <ul>
        {teams.map((team) => (
          <li key={team.id}>
            <Link href={`/teams/${team.id}`}>{team.name}</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
