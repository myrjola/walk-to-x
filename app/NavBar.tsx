import { getUser } from "../server/services/user-rsc";
import NavBarLinks from "./NavBarLinks";
import ProfileButton from "./ProfileButton";

export default async function NavBar() {
  const user = await getUser();

  return (
    <nav className="bg-stone-800 flex justify-between p-2 items-baseline">
      <div className="flex gap-2">
        <NavBarLinks teamId={user?.teamId} isLoggedIn={Boolean(user)} />
      </div>
      {user && <ProfileButton userName={user.name} />}
    </nav>
  );
}
