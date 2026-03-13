export type ModuleId =
  | "m01"
  | "m02"
  | "m03"
  | "m04"
  | "m05"
  | "m06"
  | "m07"
  | "m08"
  | "m09"
  | "m10"
  | "m11";

export type ModuleStatus = "locked" | "available" | "completed";

export type ModuleMock = {
  id: ModuleId;
  slug: string;
  title: string;
  number: number;
  status: ModuleStatus;
  accent: "gold" | "deepBlue" | "magenta" | "turquoise" | "orange";
  x: number; // 0..1 in the spiral container
  y: number; // 0..1 in the spiral container
  /** true si le module a un jeu associé (gameId ou gameType !== 'none') */
  hasGame?: boolean;
  /** true si le module a une partie de robot associée (affichage cercle gris) */
  hasRobotPart?: boolean;
};

export const MODULES_MOCK: ModuleMock[] = [
  {
    id: "m01",
    slug: "etincelle",
    title: "L’Étincelle",
    number: 1,
    status: "available",
    accent: "gold",
    x: 0.8,
    y: 0.92,
  },
  {
    id: "m02",
    slug: "souffle",
    title: "Le Souffle",
    number: 2,
    status: "available",
    accent: "turquoise",
    x: 0.9,
    y: 0.67,
  },
  {
    id: "m03",
    slug: "reflet",
    title: "Le Reflet",
    number: 3,
    status: "available",
    accent: "deepBlue",
    x: 0.9,
    y: 0.4,
  },
  {
    id: "m04",
    slug: "encre",
    title: "L’Encre",
    number: 4,
    status: "available",
    accent: "magenta",
    x: 0.78,
    y: 0.2,
  },
  {
    id: "m05",
    slug: "echo",
    title: "L’Écho",
    number: 5,
    status: "available",
    accent: "gold",
    x: 0.55,
    y: 0.1,
  },
  {
    id: "m06",
    slug: "constellation",
    title: "Constellation",
    number: 6,
    status: "available",
    accent: "turquoise",
    x: 0.3,
    y: 0.18,
  },
  {
    id: "m07",
    slug: "passage",
    title: "Le Passage",
    number: 7,
    status: "available",
    accent: "orange",
    x: 0.14,
    y: 0.38,
  },
  {
    id: "m08",
    slug: "signature",
    title: "Signature",
    number: 8,
    status: "available",
    accent: "deepBlue",
    x: 0.18,
    y: 0.6,
  },
  {
    id: "m09",
    slug: "mirokai",
    title: "Mirokaï",
    number: 9,
    status: "available",
    accent: "magenta",
    x: 0.32,
    y: 0.78,
  },
  {
    id: "m10",
    slug: "atelier",
    title: "Atelier",
    number: 10,
    status: "available",
    accent: "turquoise",
    x: 0.5,
    y: 0.82,
  },
  {
    id: "m11",
    slug: "finale",
    title: "Finale",
    number: 11,
    status: "available",
    accent: "gold",
    x: 0.66,
    y: 0.72,
  },
];

