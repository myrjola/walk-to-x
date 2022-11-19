import { getUser } from "../../../server/services/user-rsc";
import JoinTeamButton from "./JoinTeamButton";
import { getMembers } from "../../../server/services/members";

interface Props {
  teamId: number;
}

export default async function Members({ teamId }: Props) {
  const members = await getMembers(teamId);
  const user = await getUser();

  const canJointeam = user && user.teamId !== teamId;

  return (
    <>
      <h2>Members</h2>
      <ul>
        {members.map((member) => (
          <li key={member.id}>{member.name}</li>
        ))}
        {canJointeam && (
          <li>
            <JoinTeamButton teamId={teamId} />
          </li>
        )}
      </ul>
    </>
  );
}
