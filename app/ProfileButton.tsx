"use client";

import * as Popover from "@radix-ui/react-popover";

export default function ProfileButton() {
  return (
    <Popover.Root>
      <Popover.Trigger className="flex justify-center items-center rounded-full bg-sky-600 text-lg text-white w-11 h-11 focus:outline-none focus:ring-2 focus:ring-white">
        <span className="sr-only">Open user menu</span>
        <span>M</span>
      </Popover.Trigger>
      <Popover.Portal>
        <Popover.Content
          sideOffset={2}
          className="bg-white rounded mx-1 shadow-md"
        >
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a
            href="/api/webauthn/logout"
            className="block p-2 focus:outline-none focus:ring-2 focus:ring-sky200 rounded"
          >
            Sign out
          </a>
          <Popover.Arrow className="text-white fill-current" />
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}
