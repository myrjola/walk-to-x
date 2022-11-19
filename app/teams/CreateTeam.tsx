"use client";

import client from "../../utils/trpc";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

interface FormData {
  teamName: string;
  challengeId: string;
}

interface Props {
  challenges: { id: number; name: string }[];
}

export default function CreateTeam({ challenges }: Props) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(async ({ teamName, challengeId }) => {
    const team = await client.addTeam.query({
      name: teamName,
      challengeId: parseInt(challengeId),
    });
    if (team) {
      router.push(`/teams/${team.id}`);
    }
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <label>
        New team
        <input {...register("teamName", { required: true })} />
      </label>

      <label>
        Select challenge
        <select {...register("challengeId")}>
          {challenges.map((challenge) => (
            <option key={challenge.id} value={challenge.id}>
              {challenge.name}
            </option>
          ))}
        </select>
      </label>

      <button disabled={isSubmitting} type="submit">
        Create
      </button>
    </form>
  );
}
