"use client";

import client from "../utils/trpc";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateTeam() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  return (
    <form
      onSubmit={async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        const team = await client.addTeam.query({ name });
        setName("");
        setIsSubmitting(false);
        router.push(`/team/${team.id}`);
      }}
    >
      <label>
        New team
        <input
          disabled={isSubmitting}
          name="teamName"
          onChange={(event) => setName(event.target.value)}
        />
      </label>
      <button disabled={isSubmitting} type="submit">
        Create
      </button>
    </form>
  );
}
