import { cookies } from "next/headers";
import RegisterUser from "./RegisterUser";
import AuthenticateUser from "./AuthenticateUser";
import prisma from "../lib/prisma";

export default async function Page() {
  const nextCookies = cookies(); // Make this page dynamic
  const token = nextCookies.get("token");

  let userName;

  if (token) {
    const authenticator = await prisma.authenticator.findUnique({
      where: {
        credentialID: token.value,
      },
      include: {
        webAuthnUser: {
          include: {
            userProfile: true,
          },
        },
      },
    });
    userName = authenticator?.webAuthnUser?.userProfile?.name;
  }

  return (
    <main>
      <h1>Walk to X</h1>
      {userName ? (
        <p>Welcome {userName}!</p>
      ) : (
        <>
          <RegisterUser />
          <AuthenticateUser />
        </>
      )}
    </main>
  );
}
