"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import { metersToScreenPx } from "./walkUtil";
import classNames from "classnames";

interface Props {
  children: ReactNode;
  userTeamMeters: number;
}

export default function ChallengeTrack({ children, userTeamMeters }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    ref.current?.scrollTo({
      left: metersToScreenPx(userTeamMeters),
      behavior: initialized ? "smooth" : undefined,
    });
  }, [userTeamMeters, initialized]);

  useEffect(() => {
    setInitialized(true);
  }, []);

  return (
    <div
      className={classNames("mt-8", {
        invisible: !initialized,
      })}
    >
      <div
        className="scrollbar-hide h-[400px] w-full overflow-x-scroll"
        ref={ref}
      >
        {children}
      </div>
    </div>
  );
}
