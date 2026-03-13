const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export type RobotLayoutVariantFromApi = {
  id: string;
  color: string;
  imageUrl: string;
};

export type RobotLayoutPartFromApi = {
  id: string;
  partName: string;
  position: { x: number; y: number };
  width: number;
  height: number;
  zIndex: number;
  variants?: RobotLayoutVariantFromApi[];
};

export async function fetchRobotLayout(): Promise<RobotLayoutPartFromApi[]> {
  const res = await fetch(`${API_BASE_URL}/api/robot-layout`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Erreur API robot-layout: ${res.status}`);
  }

  return res.json();
}
