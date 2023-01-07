"use client";

import client from "../../../utils/trpc";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  teamId: number;
}

export default function JoinTeamButton({ teamId }: Props) {
  const router = useRouter();
  const [isJoining, setIsJoining] = useState(false);

  const joinTeam = async () => {
    setIsJoining(true);
    await client.joinTeam.mutate({ teamId });
    await router.refresh();
    await router.push("/");
  };

  return (
    <button
      className="btn-primary my-4"
      disabled={isJoining}
      onClick={joinTeam}
    >
      {isJoining ? "Joining..." : "Join team"}
    </button>
  );
}
