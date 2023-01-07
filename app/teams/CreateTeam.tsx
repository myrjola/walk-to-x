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
    formState: { isSubmitting, errors },
  } = useForm<FormData>();

  const onSubmit = handleSubmit(async ({ teamName, challengeId }) => {
    const team = await client.addTeam.mutate({
      name: teamName,
      challengeId: parseInt(challengeId),
    });
    if (team) {
      router.refresh();
      router.push(`/`);
    }
  });

  return (
    <>
      <h2 className="mb-4 text-xl font-medium">Create your team</h2>

      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        <div>
          <FormControls.Label htmlFor="teamName">Cool name</FormControls.Label>
          <FormControls.Input
            type="text"
            id="teamName"
            aria-invalid={Boolean(errors.teamName)}
            {...register("teamName", {
              required: "The team needs a cool name.",
            })}
          />
          <FormControls.Error error={errors.teamName} />
        </div>

        <FormControls.Label className="flex items-center justify-between gap-4">
          <div className="text-lg font-light text-gray-600">Team Challenge</div>
          <FormControls.Select
            className="flex-1"
            {...register("challengeId", { required: true })}
          >
            {challenges.map((challenge) => (
              <option key={challenge.id} value={challenge.id}>
                {challenge.name}
              </option>
            ))}
          </FormControls.Select>
        </FormControls.Label>

        <button className="btn-primary" disabled={isSubmitting} type="submit">
          {isSubmitting ? "Creating..." : "Create"}
        </button>
      </form>
    </>
  );
}
