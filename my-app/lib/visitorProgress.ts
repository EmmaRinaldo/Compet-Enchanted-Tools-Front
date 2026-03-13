export type UnlockedPart = {
  moduleNumber: number;
  robotPart: string;
  unlockedAt: string;
};

export type VisitorProgress = {
  parts: UnlockedPart[];
};

const STORAGE_KEY = "mirokai-progress-v1";

export function loadVisitorProgress(): VisitorProgress {
  if (typeof window === "undefined") return { parts: [] };
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return { parts: [] };
  try {
    return JSON.parse(raw) as VisitorProgress;
  } catch {
    return { parts: [] };
  }
}

export function saveVisitorProgress(progress: VisitorProgress) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

export function markPartUnlocked(moduleNumber: number, robotPart: string) {
  const current = loadVisitorProgress();
  const exists = current.parts.some(
    (p) => p.moduleNumber === moduleNumber && p.robotPart === robotPart,
  );
  if (exists) return;

  const updated: VisitorProgress = {
    parts: [
      ...current.parts,
      {
        moduleNumber,
        robotPart,
        unlockedAt: new Date().toISOString(),
      },
    ],
  };

  saveVisitorProgress(updated);
}

