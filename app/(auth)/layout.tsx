import { ReactNode } from "react";
import { getUser } from "../../server/services/user-rsc";
import { redirect } from "next/navigation";

interface Props {
  children: ReactNode;
}

export default async function AuthLayout({ children }: Props) {
  const user = await getUser();

  if (user) {
    redirect("/");
    return null;
  }

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">{children}</div>
    </div>
  );
}
