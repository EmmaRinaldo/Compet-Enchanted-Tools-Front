import Image from "next/image";
import type { ModuleMock } from "@/data/modules.mock";
import { ModuleNode } from "@/components/ModuleNode";

export function SpiralMap({ modules }: { modules: ModuleMock[] }) {
  return (
    <div className="relative w-full">
      <div
        className="relative w-full overflow-hidden bg-black/40"
        style={{
          aspectRatio: "375 / 1300",
        }}
      >
        {/* Carte de parcours - map-bg.svg plein écran, non déformée */}
        <div className="absolute inset-0">
          <Image
            src="/map-bg.svg"
            alt="Carte des modules"
            fill
            className="object-contain object-center"
            priority
          />
        </div>

        {/* Halo magique central */}
        <div className="absolute inset-0 bg-[radial-gradient(65%_55%_at_50%_40%,rgba(212,175,106,0.28)_0%,rgba(92,222,202,0.16)_28%,rgba(184,75,176,0.16)_52%,rgba(0,0,0,0)_80%)]" />

        {/* Modules positionnés manuellement */}
        <div className="absolute inset-0">
          {modules.map((m) => (
            <ModuleNode key={m.id} module={m} />
          ))}
        </div>

        
      </div>
    </div>
  );
}

