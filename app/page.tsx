import { cookies } from "next/headers";
import prisma from "../lib/prisma";
import Link from "next/link";

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
          <Link href="/sign-in">Sign in</Link>
          <Link href="/register">Register new user</Link>
        </>
      )}
    </main>
  );
}
