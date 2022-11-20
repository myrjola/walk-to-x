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

  return (
    <div>
      <LogDistance />
      {/* @ts-expect-error Server Component */}
      <MyStatistics />
    </div>
  );
}
