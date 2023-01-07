import { getUser } from "../../../server/services/user-rsc";
import JoinTeamButton from "./JoinTeamButton";
import { getMembers } from "../../../server/services/members";
import classNames from "classnames";

interface Props {
  teamId: number;
}

export default async function Members({ teamId }: Props) {
  const members = await getMembers(teamId);
  const user = await getUser();

  const canJointeam = user && user.teamId !== teamId;

  return (
    <>
      <h2 className="mb-2 text-xl font-medium">Members</h2>
      <ul className="flex flex-col gap-1">
        {members.map((member) => (
          <li
            className={classNames({ "text-gray-600": member.id !== user?.id })}
            key={member.id}
          >
            {member.name}
          </li>
        ))}
      </ul>
      {canJointeam && <JoinTeamButton teamId={teamId} />}
    </>
  );
}
