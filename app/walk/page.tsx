"use client";
import Walker from "../../components/icons/walker";
import { useEffect, useRef, useState } from "react";

export default function Walk() {
  const [teamMeters, setTeamMeters] = useState(0);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    ref.current?.scrollTo({ left: teamMeters, behavior: "smooth" });
  }, [teamMeters]);

  return (
    <div className="mt-8">
      <button
        className="btn-primary"
        onClick={() => setTeamMeters((teamMeters) => teamMeters - 300)}
      >
        -
      </button>
      <button
        className="btn-primary"
        onClick={() =>
          setTeamMeters((teamMeters) => Math.min(teamMeters + 300, 1670))
        }
      >
        +
      </button>
      <div
        className="scrollbar-hide h-[300px] w-full overflow-x-scroll"
        ref={ref}
      >
        <div
          style={{
            ["--challengeMeters" as any]: 167000 / 100 + "px",
          }}
          className={`relative left-[50%] w-[var(--challengeMeters)] border-b-8 border-dashed border-b-gray-900`}
        >
          <div className="absolute -right-1/2 h-1 w-1/2" />
          <div className="absolute -bottom-5 h-8 w-8 -translate-x-1/2 rounded-full border border-8 border-gray-900 bg-gray-50">
            <div className="absolute top-6 left-2 -translate-x-1/2">
              Helsinki
            </div>
          </div>
          <div
            style={{ ["--teamMeters" as any]: 300 + "px" }}
            className="absolute top-0 left-[var(--teamMeters)] mb-3 w-min -translate-x-1/2 text-center text-indigo-600 hover:z-10 hover:text-gray-900 hover:drop-shadow-gray"
          >
            <div>Ketchup if you can</div>
            <Walker width={64} height={64} className="mx-auto" />
          </div>
          <div
            style={{ ["--teamMeters" as any]: 200 + "px" }}
            className="absolute top-0 left-[var(--teamMeters)] mb-3 w-min -translate-x-1/2 text-center text-fuchsia-600 hover:z-10 hover:text-gray-900 hover:drop-shadow-gray"
          >
            <div>Moonwalkers</div>
            <Walker width={64} height={64} className="mx-auto" />
          </div>
          <div
            style={{ ["--teamMeters" as any]: teamMeters + "px" }}
            className="drop-shadow-red-400 relative left-[var(--teamMeters)] mb-8 w-min -translate-x-1/2 text-center drop-shadow-gray transition-left duration-1000 ease-in-out"
          >
            <div>The snails</div>
            <Walker width={64} height={64} className="mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
}
