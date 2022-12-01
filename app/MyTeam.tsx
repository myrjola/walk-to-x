"use client";

import { metersToPx } from "./walkUtil";
import Walker from "../components/icons/walker";
import { useState } from "react";

interface Props {
  name: string;
  meters: number;
}

export default function MyTeam({ meters, name }: Props) {
  const [teamMeters, setTeamMeters] = useState(meters);
  return (
    <div
      onClick={() => {
        setTeamMeters((m) => m + 10000);
      }}
      style={{
        ["--teamMeters" as any]: metersToPx(teamMeters),
      }}
      className="absolute left-[var(--teamMeters)] bottom-8 w-min -translate-x-1/2 text-center text-gray-600 drop-shadow-gray transition-left duration-1000 ease-in-out"
    >
      <div className="mb-1 font-medium">{name}</div>
      <Walker width={88} height={88} className="mx-auto" />
    </div>
  );
}
