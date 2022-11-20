import Image from "next/image";

export default function Logo() {
  return (
    <Image
      className="mx-auto h-32 w-auto"
      src="/logo.svg"
      width={512}
      height={512}
      alt="Walk to X logo"
    />
  );
}
