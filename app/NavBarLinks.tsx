import ActiveNavLink from "../components/ActiveNavLink";

interface Props {
  isLoggedIn: boolean;
  teamId?: number | null;
}

export default function NavBarLinks({ teamId, isLoggedIn }: Props) {
  if (!isLoggedIn) {
    return (
      <>
        <ActiveNavLink href="/sign-in">Sign in</ActiveNavLink>
        <ActiveNavLink href="/register">Register</ActiveNavLink>
      </>
    );
  }

  if (!teamId) {
    return <ActiveNavLink href="/teams">Teams</ActiveNavLink>;
  }

  return (
    <>
      <ActiveNavLink href={`/`}>Home</ActiveNavLink>
      <ActiveNavLink href="/leaderboard">Leaderboard</ActiveNavLink>
    </>
  );
}
