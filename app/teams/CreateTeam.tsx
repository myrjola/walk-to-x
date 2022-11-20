"use client";

import client from "../../utils/trpc";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as FormControls from "../../components/FormControls";

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
      router.refresh();
      router.push(`/teams/${team.id}`);
    }
  });

  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <FormControls.Label>
        New team
        <FormControls.Input
          type="text"
          {...register("teamName", { required: true })}
        />
      </FormControls.Label>

      <FormControls.Label>
        Select challenge
        <FormControls.Select {...register("challengeId")}>
          {challenges.map((challenge) => (
            <option key={challenge.id} value={challenge.id}>
              {challenge.name}
            </option>
          ))}
        </FormControls.Select>
      </FormControls.Label>

      <button disabled={isSubmitting} type="submit">
        Create
      </button>
    </form>
  );
}
