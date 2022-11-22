import { getUser } from "../server/services/user-rsc";
import { redirect } from "next/navigation";
import LogDistance from "./LogDistance";
import MyStatistics from "./MyStatistics";

export default async function Page() {
  const user = await getUser();

  if (!user) {
    redirect("/register");
    return;
  }

  if (!user.teamId) {
    redirect("/teams");
    return null;
  }

  return (
    <div>
      <LogDistance />
      {/* @ts-expect-error Server Component */}
      <MyStatistics />
    </div>
  );
}
