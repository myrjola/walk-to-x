"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import classNames from "classnames";

interface Props {
  href: string;
  children: ReactNode;
}

export default function ActiveNavLink({ href, children }: Props) {
  const pathname = usePathname();

  const active = href === pathname;

  return (
    <Link
      className={classNames(
        "rounded-md px-3 py-2.5 font-medium text-gray-300 hover:bg-gray-700 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white",
        {
          "bg-stone-600 text-white": active,
        }
      )}
      href={href}
    >
      {children}
    </Link>
  );
}
