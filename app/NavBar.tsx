import { getUser } from "../server/services/user-rsc";
import NavBarLinks from "./NavBarLinks";
import ProfileButton from "./ProfileButton";

export default async function NavBar() {
  const user = await getUser();

  const isLoggedIn = Boolean(user);

  return (
    <nav className="bg-stone-800 flex justify-between p-2 items-baseline">
      <div className="flex gap-2">
        <NavBarLinks teamId={user?.teamId} isLoggedIn={isLoggedIn} />
      </div>
      {isLoggedIn && <ProfileButton />}
    </nav>
  );
}
