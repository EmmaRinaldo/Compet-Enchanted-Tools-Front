const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export type ModuleFromApi = {
  id: string;
  number: number;
  slug: string;
  name: string;
  description: string;
  videoUrl?: string;
  imageUrl?: string;
  audioUrl?: string;
  gameId?: string | null;
  gameType?: string;
  robotPart?: string | null;
  position?: {
    x?: number;
    y?: number;
  };
  isActive?: boolean;
  order?: number;
};

export async function fetchVisitorModules(): Promise<ModuleFromApi[]> {
  const res = await fetch(`${API_BASE_URL}/api/modules`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Erreur API modules: ${res.status}`);
  }

  return res.json();
}

export async function fetchModuleBySlug(slug: string): Promise<ModuleFromApi | null> {
  const modules = await fetchVisitorModules();
  return modules.find((m) => m.slug === slug) ?? null;
}


