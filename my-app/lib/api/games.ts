const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL!;

export type GameFromApi = {
  id: string;
  name: string;
  type: string;
  config?: unknown;
  extraInfo: string;
};

export async function fetchGames(): Promise<GameFromApi[]> {
  const res = await fetch(`${API_BASE_URL}/api/games`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Erreur API games: ${res.status}`);
  }

  return res.json();
}

export async function fetchGameById(id: string): Promise<GameFromApi | null> {
  if (!id) return null;

  const games = await fetchGames();
  return games.find((g) => g.id === id) ?? null;
}

