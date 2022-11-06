import { headers } from "next/headers";
import RegisterUser from "./RegisterUser";

export default async function Page() {
  headers(); // Make this page dynamic

  return (
    <main>
      <h1>Walk to X</h1>
      <RegisterUser />
    </main>
  );
}
