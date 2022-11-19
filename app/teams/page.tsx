import Link from "next/link";
import prisma from "../../lib/prisma";
import { headers } from "next/headers";
import CreateTeam from "./CreateTeam";
import { getUser } from "../../server/services/user-rsc";

export default async function Page() {
  headers(); // Make this page dynamic

  const user = getUser();
  const teams = await prisma.team.findMany();
  const challenges = await prisma.challenge.findMany();

  return (
    <main>
      <h1>Walk to X</h1>
      {user && (
        <CreateTeam
          challenges={challenges.map(({ id, name }) => ({ name, id }))}
        />
      )}
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
