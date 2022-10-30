import prisma from '../../../lib/prisma'

interface Props {
    params: {
        teamId: string
    }
}

export default async function Page({ params }: Props) {
    const id = parseInt(params.teamId)

    if (!id) {
        throw "Invalid team ID!"
    }

    const team = await prisma.team.findFirst({
        where: {id}
    })

    if (!team) {
        throw "Team not found!"
    }

    return (
        <main>
          <h1>{team.name}</h1>
        </main>
  );
}
