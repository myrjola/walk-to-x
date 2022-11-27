"use client";
import Walker from "../../components/icons/walker";
import { useEffect, useRef, useState } from "react";
import OtherTeam from "./OtherTeam";
import LegDot from "./LegDot";
import { metersToPx, metersToScreenPx } from "./walkUtil";

const otherTeams: [string, number][] = [
  ["The masters", 50000],
  ["Ketchup if you can", 30000],
  ["Moonwalkers", 28000],
];

const legs: [string, number][] = [
  ["Helsinki", 0],
  ["Espoo", 15000],
  ["Siuntio", 50000],
  ["Turku", 167000],
];

export default function Walk() {
  const [teamMeters, setTeamMeters] = useState(0);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollTo({
      left: metersToScreenPx(teamMeters),
      behavior: "smooth",
    });
  }, [teamMeters]);

  return (
    <div className="mt-8">
      <button
        className="btn-primary"
        onClick={() =>
          setTeamMeters((teamMeters) => Math.max(teamMeters - 30000, 0))
        }
      >
        -
      </button>
      <button
        className="btn-primary"
        onClick={() =>
          setTeamMeters((teamMeters) => Math.min(teamMeters + 30000, 167000))
        }
      >
        +
      </button>
      <div
        className="scrollbar-hide h-[400px] w-full overflow-x-scroll"
        ref={ref}
      >
        <div
          style={{
            ["--challengeMeters" as any]: 167000 / 100 + "px",
          }}
          className="relative left-[50%] h-[300px] w-[var(--challengeMeters)] border-b-8 border-dashed border-b-gray-600"
        >
          <div className="absolute -right-1/2 h-1 w-1/2" />
          {legs.map(([name, meters]) => (
            <LegDot key={name} name={name} meters={meters} />
          ))}
          {otherTeams.map(([teamName, otherTeamMeters], index) => (
            <OtherTeam
              key={teamName}
              name={teamName}
              teamMeters={otherTeamMeters}
              userTeamMeters={teamMeters}
              index={index}
            />
          ))}
          <div
            style={{ ["--teamMeters" as any]: metersToPx(teamMeters) }}
            className="absolute left-[var(--teamMeters)] bottom-8 w-min -translate-x-1/2 text-center text-gray-600 drop-shadow-gray transition-left duration-1000 ease-in-out"
          >
            <div className="mb-1 font-medium">The snails</div>
            <Walker width={88} height={88} className="mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
