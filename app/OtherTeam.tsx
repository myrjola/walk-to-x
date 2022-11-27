import Walker from "../components/icons/walker";
import classNames from "classnames";
import { metersToPx } from "./walkUtil";

interface Props {
  name: string;
  teamMeters: number;
  userTeamMeters: number;
  index: number;
}

const teamColors = [
  "text-indigo-600",
  "text-pink-600",
  "text-lime-500",
  "text-fuchsia-600",
  "text-red-600",
  "text-violet-600",
  "text-teal-600",
  "text-orange-600",
  "text-amber-600",
  "text-emerald-600",
  "text-cyan-600",
  "text-sky-600",
  "text-blue-600",
  "text-purple-600",
  "text-rose-600",
];

const bottoms = ["bottom-8", "bottom-10", "bottom-12"];

export default function OtherTeam({
  name,
  teamMeters,
  userTeamMeters,
  index,
}: Props) {
  return (
    <button
      style={{ ["--teamMeters" as any]: metersToPx(teamMeters) }}
      className={classNames(
        "absolute bottom-8 left-[var(--teamMeters)] w-min -translate-x-1/2 text-center hover:z-10 hover:drop-shadow-gray",
        teamColors[index % teamColors.length],
        bottoms[index % bottoms.length]
      )}
    >
      <div className="font-medium ">{name}</div>
      <Walker
        variant={teamMeters < userTeamMeters ? "unamused" : "smirk"}
        width={88}
        height={88}
        className="mx-auto"
      />
    </button>
  );
}
