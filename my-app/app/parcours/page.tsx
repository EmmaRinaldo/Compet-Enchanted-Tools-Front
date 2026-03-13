import { AppShell } from "@/components/AppShell";
import { SpiralMap } from "@/components/SpiralMap";
import { MissionProgressHeader } from "@/components/MissionProgressHeader";
import type { ModuleMock } from "@/data/modules.mock";
import { MODULES_MOCK } from "@/data/modules.mock";
import { fetchVisitorModules } from "@/lib/api/modules";

function buildSpiralModulesFromApi(
  apiModules: import("@/lib/api/modules").ModuleFromApi[],
): ModuleMock[] {
  if (!apiModules.length) {
    return MODULES_MOCK;
  }

  const sorted = [...apiModules].sort((a, b) => a.number - b.number);

  return sorted.map((api, index) => {
    const template = MODULES_MOCK[index % MODULES_MOCK.length];

    const hasPosition =
      typeof api.position?.x === "number" && typeof api.position?.y === "number";

    const x =
      hasPosition && typeof api.position?.x === "number"
        ? api.position.x / 100
        : template.x;
    const y =
      hasPosition && typeof api.position?.y === "number"
        ? api.position.y / 100
        : template.y;

    const hasGame = Boolean(api.gameId || (api.gameType && api.gameType !== "none"));
    const hasRobotPart = Boolean(api.robotPart);
    return {
      ...template,
      id: (`m${String(api.number).padStart(2, "0")}` as ModuleMock["id"]),
      slug: api.slug,
      title: api.name,
      number: api.number,
      x,
      y,
      hasGame,
      hasRobotPart,
    };
  });
}

export default async function ParcoursPage() {
  let modulesForSpiral: ModuleMock[] = MODULES_MOCK;
  try {
    const apiModules = await fetchVisitorModules();
    modulesForSpiral = buildSpiralModulesFromApi(apiModules);
  } catch (e) {
    // En cas d'erreur réseau ou API, on reste sur le layout mocké
    // eslint-disable-next-line no-console
    console.error("Erreur chargement modules API, fallback sur les mocks:", e);
  }

  return (
    <AppShell
      background={
        <div className="absolute inset-0 bg-slate-950" />
      }
      className="h-svh overflow-y-auto"
    >
      <div className="relative w-full">
        <MissionProgressHeader />

        <div className="-mt-[20%] w-full">
          <SpiralMap modules={modulesForSpiral} />
        </div>
      </div>
    </AppShell>
  );
}


