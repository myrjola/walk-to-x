import prisma from '../../../lib/prisma'

interface Params {
    teamId: string
}

interface Props {
    params: Params
}

export const revalidate = 60

export default async function Page({ params }: any) {
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
