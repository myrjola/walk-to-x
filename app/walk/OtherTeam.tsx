import Walker from "../../components/icons/walker";

export default function OtherTeam() {
  return (
    <div
      style={{ ["--teamMeters" as any]: 300 + "px" }}
      className="absolute top-0 left-[var(--teamMeters)] mb-3 w-min -translate-x-1/2 text-center text-indigo-600 hover:z-10 hover:text-gray-900 hover:drop-shadow-gray"
    >
      <div>Ketchup if you can</div>
      <Walker variant="smirk" width={88} height={88} className="mx-auto" />
    </div>
  );
}
