import { getUser } from "../server/services/user-rsc";
import { redirect } from "next/navigation";

export default async function Page() {
  const user = await getUser();

  if (!user) {
    redirect("/register");
  }

  return (
    <main>
      <h1>Walk to X</h1>
      <p>Welcome {user.name}!</p>
    </main>
  );
}
