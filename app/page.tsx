import Link from 'next/link'
import prisma from '../lib/prisma'

export const revalidate = 60

export default async function Page() {
  const teams = await prisma.team.findMany()

  return (<main>
    <h1>Walk to X</h1>
    <ul>
      {teams.map(team => <li key={team.id}><Link href={`/team/${team.id}`}>{team.name}</Link></li>)}
    </ul>
  </main>)
}
