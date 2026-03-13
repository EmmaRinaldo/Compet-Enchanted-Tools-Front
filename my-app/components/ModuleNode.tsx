"use client";

import Link from "next/link";
import type { ModuleMock } from "@/data/modules.mock";
import { useEffect, useState } from "react";
import { loadVisitorProgress } from "@/lib/visitorProgress";

export function ModuleNode({ module }: { module: ModuleMock }) {
  const label = module.title;

  const hasRobotPart = module.hasRobotPart ?? false;
  const [isUnlocked, setIsUnlocked] = useState(false);

  useEffect(() => {
    const progress = loadVisitorProgress();
    const unlocked = progress.parts.some(
      (p) => p.moduleNumber === module.number && !!module.hasRobotPart,
    );
    setIsUnlocked(unlocked);
  }, [module.number, module.hasRobotPart]);

  return (
    <Link
      href={`/module/${module.slug}`}
      aria-label={label}
      className="group absolute -translate-x-1/2 -translate-y-1/2"
      style={{
        left: `${module.x * 100}%`,
        top: `${module.y * 100}%`,
      }}
    >
      <div
        className={[
          "inline-flex items-center justify-center rounded-full p-3",
          hasRobotPart &&
            (isUnlocked
              ? "ring-[6px] ring-inset ring-[#E6A500]"
              : "ring-[6px] ring-inset ring-[#9F9FA9]"),
          "transition group-active:scale-[0.97]",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="flex w-14 flex-col items-center justify-center rounded-full bg-[#0B1742] p-2">
          <span className="font-subtitle text-center text-3xl font-extrabold uppercase leading-10 text-[#FCFCFC]">
            {module.number}
          </span>
        </div>
      </div>
    </Link>
  );
}


