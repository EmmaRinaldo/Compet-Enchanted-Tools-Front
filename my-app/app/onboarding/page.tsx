import Image from "next/image";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";

const CARDS = [
  "Découvre tous les modules sur la carte de la planète Nimira.",
  "Réussis toutes les missions pour construire le corps du Mirokaï.",
  "Explore les modules du laboratoire et construis ton Mirokaï !",
] as const;

export default function OnboardingPage() {
  return (
    <AppShell
      background={
        <div className="absolute inset-0">
          <Image
            src="/bg-default.svg"
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
      }
      className="min-h-svh"
    >
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 px-5 pb-[20%] supports-[padding:env(safe-area-inset-bottom)]:pb-[max(2rem,env(safe-area-inset-bottom))]">
        {/* Titre */}
        <h1 className="text-center font-subtitle text-brand-title font-bold uppercase tracking-wide text-white">
          Bienvenue à Nimira
        </h1>

        {/* Image principale */}
        <div className="relative w-full max-w-md overflow-hidden rounded-2xl">
          <Image
            src="/onboarding/image-onboarding.svg"
            alt=""
            width={343}
            height={434}
            className="w-full object-contain"
          />
        </div>

        {/* 3 blocs texte */}
        <div className="flex w-full max-w-md flex-col gap-4">
          {CARDS.map((text) => (
            <div
              key={text}
              className="rounded-2xl bg-[#09090B]/50 p-4 backdrop-blur-md shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
            >
              <p className="text-left font-subtitle text-base leading-6 text-[#FCFCFC]">
                {text}
              </p>
            </div>
          ))}
        </div>

        {/* Bouton Suivant */}
        <Link
          href="/profile"
          className="flex w-full max-w-md items-center justify-center gap-2 rounded-full bg-[#0B1742] px-6 py-4 font-subtitle text-lg font-normal leading-6 text-[#FCFCFC] transition active:brightness-95"
        >
          Suivant
        </Link>
      </div>
    </AppShell>
  );
}
