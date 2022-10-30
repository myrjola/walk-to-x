"use client";

import client from "../../utils/trpc";
import { useRouter } from "next/navigation";

export default function CreateTeam() {
  const router = useRouter();
  const onClick = async () => {
    await client.addTeam.query({ name: "Walker Smiths" });
    router.replace("/");
  };

  return <button onClick={onClick}>New team</button>;
}
