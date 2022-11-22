import Link from "next/link";
import prisma from "../../lib/prisma";
import CreateTeam from "./CreateTeam";
import { getUser } from "../../server/services/user-rsc";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getUser();
  const teams = await prisma.team.findMany();
  const challenges = await prisma.challenge.findMany();

  if (!user) {
    redirect("/register");
    return null;
  }

  return (
    <>
      <h1 className="text-3">Teams</h1>

      <h2>Create your team</h2>
      {!user.teamId && (
        <CreateTeam
          challenges={challenges.map(({ id, name }) => ({ name, id }))}
        />
      )}

      <h2>Join a team</h2>

      <ul>
        {teams.map((team) => (
          <li key={team.id}>
            <Link href={`/teams/${team.id}`}>{team.name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
