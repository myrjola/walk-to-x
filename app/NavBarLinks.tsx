import ActiveNavLink from "../components/ActiveNavLink";

interface Props {
  isLoggedIn: boolean;
  teamId?: number | null;
}

export default function NavBarLinks({ teamId, isLoggedIn }: Props) {
  return (
    <div className="flex space-x-4">
      {teamId && (
        <ActiveNavLink href={`/teams/${teamId}`}>My team</ActiveNavLink>
      )}
      {isLoggedIn && (
        <ActiveNavLink href="/leaderboard">Leaderboard</ActiveNavLink>
      )}
      <ActiveNavLink href="/teams">Teams</ActiveNavLink>
    </div>
  );
}
