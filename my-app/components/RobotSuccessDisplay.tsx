"use client";

import { useEffect, useState } from "react";
import { fetchRobotLayout } from "@/lib/api/robotLayout";
import { loadVisitorProgress } from "@/lib/visitorProgress";
import type { RobotLayoutPartFromApi, RobotLayoutVariantFromApi } from "@/lib/api/robotLayout";

type RobotSuccessDisplayProps = {
  /** Pièce qu'on vient de débloquer (pas encore dans localStorage au premier render) */
  newlyUnlockedPart?: string | null;
};

function pickVariant(
  variants: RobotLayoutVariantFromApi[],
  useOrange: boolean
): RobotLayoutVariantFromApi | null {
  if (!variants.length) return null;

  const grayVariant =
    variants.find(
      (v) =>
        ["gris", "grey", "gray"].includes(v.color.toLowerCase())
    ) ?? variants[0];

  if (!useOrange) return grayVariant;

  const orangeVariant = variants.find(
    (v) => v.color.toLowerCase().includes("orange")
  );
  return orangeVariant ?? grayVariant;
}

export function RobotSuccessDisplay({ newlyUnlockedPart }: RobotSuccessDisplayProps) {
  const [parts, setParts] = useState<RobotLayoutPartFromApi[]>([]);
  const [error, setError] = useState<string | null>(null);

  const progress = loadVisitorProgress();
  const unlockedFromStorage = progress.parts.map((p) => p.robotPart);
  const allUnlocked = Array.from(
    new Set([...unlockedFromStorage, ...(newlyUnlockedPart ? [newlyUnlockedPart] : [])])
  );

  useEffect(() => {
    let cancelled = false;
    fetchRobotLayout()
      .then((data) => {
        if (!cancelled) setParts(data);
      })
      .catch(() => {
        if (!cancelled) setError("Impossible de charger le robot.");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  if (error) {
    return (
      <div className="flex h-72 items-center justify-center text-sm text-white/70">
        {error}
      </div>
    );
  }

  if (!parts.length) {
    return (
      <div className="flex h-72 items-center justify-center text-sm text-white/70">
        Chargement du robot…
      </div>
    );
  }

  return (
    <div className="relative mx-auto flex h-[360px] w-full max-w-md items-center justify-center">
      <div className="relative h-[360px] w-[360px]">
        {parts.map((part) => {
          const variants = part.variants ?? [];
          const isUnlocked = allUnlocked.includes(part.partName);
          const variant = pickVariant(variants, isUnlocked);

          if (variant?.imageUrl) {
            return (
              <img
                key={part.id}
                src={variant.imageUrl}
                alt={part.partName}
                className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 object-contain"
                style={{ zIndex: part.zIndex }}
              />
            );
          }

          return (
            <div
              key={part.id}
              className="absolute left-1/2 top-1/2 flex h-full w-full -translate-x-1/2 -translate-y-1/2 items-center justify-center text-xs font-semibold text-white/60"
              style={{ zIndex: part.zIndex }}
            >
              {part.partName}
            </div>
          );
        })}
      </div>
    </div>
  );
}
