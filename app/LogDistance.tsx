"use client";

import { useForm } from "react-hook-form";
import client from "../utils/trpc";
import { useRouter } from "next/navigation";
import * as FormControls from "../components/FormControls";
import Walker from "../components/icons/walker";
import LoadingSpinner from "../components/LoadingSpinner";

interface FormData {
  steps: number;
}

export default function LogDistance() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();
  const onSubmit = handleSubmit(async ({ steps }) => {
    const meters = steps * 0.762;
    await client.logDistance.mutate({ meters });
    router.refresh();
    reset();
  });
  return (
    <section className="mx-auto max-w-md p-4">
      <h2 className="mt-6 mb-4 text-xl font-bold tracking-tight text-gray-900">
        How far did walk today?
      </h2>
      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        <FormControls.Label htmlFor="steps">Steps</FormControls.Label>
        <FormControls.Input
          id="steps"
          type="number"
          className="m-0 appearance-none"
          aria-invalid={Boolean(errors.steps)}
          aria-errormessage={errors.steps ? "steps-error" : undefined}
          {...register("steps", {
            required: "How many steps did walk?",
            min: { value: 0, message: "Can't have negative steps" },
            valueAsNumber: true,
          })}
        />
        <FormControls.Error id="steps-error" error={errors.steps} />
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn-primary text-lg"
        >
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            {isSubmitting ? (
              <LoadingSpinner />
            ) : (
              <Walker
                aria-hidden={true}
                className="text-white"
                width={20}
                height={20}
              />
            )}
          </div>
          <div>{isSubmitting ? "Adding steps..." : "Add steps"}</div>
        </button>
      </form>
    </section>
  );
}
