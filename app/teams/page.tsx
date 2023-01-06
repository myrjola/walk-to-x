import Link from "next/link";
import prisma from "../../lib/prisma";
import CreateTeam from "./CreateTeam";
import { getUser } from "../../server/services/user-rsc";
import { redirect } from "next/navigation";

export default async function Teams() {
  const user = await getUser();
  const teams = await prisma.team.findMany();
  const challenges = await prisma.challenge.findMany();

  if (!user) {
    redirect("/register");
    return null;
  }

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 mb-8">
      <h1 className="my-4 text-center text-2xl font-medium">Teams</h1>

      <CreateTeam
        challenges={challenges.map(({ id, name }) => ({ name, id }))}
      />

      <h2 className="mt-10 mb-4 text-xl font-medium">Join a team</h2>

      <ul className="flex flex-col gap-2">
        {teams.map((team) => (
          <li className="w-full" key={team.id}>
            <Link
              className="block rounded border bg-gray-100 px-6 py-4 text-gray-600 shadow hover:bg-indigo-100 hover:text-gray-700"
              href={`/teams/${team.id}`}
            >
              {team.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
