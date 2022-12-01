import { metersToPx } from "./walkUtil";
import Walker from "../components/icons/walker";

interface Props {
  name: string;
  meters: number;
}

export default function MyTeam({ meters, name }: Props) {
  return (
    <div
      style={{
        ["--teamMeters" as any]: metersToPx(meters),
      }}
      className="absolute left-[var(--teamMeters)] bottom-8 w-min -translate-x-1/2 text-center text-gray-600 drop-shadow-gray transition-left duration-1000 ease-in-out"
    >
      <div className="mb-1 font-medium">{name}</div>
      <Walker width={88} height={88} className="mx-auto" />
    </div>
  );
}
