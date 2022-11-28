import { metersToPx } from "./walkUtil";

interface Props {
  name: string;
  meters: number;
}

export default function LegDot({ name, meters }: Props) {
  return (
    <div
      style={{ "--left": metersToPx(meters) } as any}
      className="absolute -bottom-1 left-[var(--left)] h-10 w-10 -translate-x-1/2 translate-y-1/2 rounded-full border-8 border-gray-600 bg-gray-50"
    >
      <div className="absolute top-9 left-1/2 -translate-x-1/2 text-center font-medium uppercase text-gray-600">
        {name}
      </div>
    </div>
  );
}
