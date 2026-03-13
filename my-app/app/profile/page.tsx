"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { AppShell } from "@/components/AppShell";

const PROFILES = [
  {
    id: "niv1",
    level: "Niveau 1",
    subtitle: "Mini-jeux faciles",
    icon: "/profile/profil-niv1.svg",
  },
  {
    id: "niv2",
    level: "Niveau 2",
    subtitle: "Jouer ensemble",
    icon: "/profile/profil-niv2.svg",
  },
  {
    id: "niv3",
    level: "Niveau 3",
    subtitle: "Défis avancés",
    icon: "/profile/profil-niv3.svg",
  },
] as const;

export default function ProfilePage() {
  const [selectedProfile, setSelectedProfile] = useState<string | null>(null);

  const isSelected = (id: string) => selectedProfile === id;

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
      <div className="flex min-h-svh flex-col items-center justify-between px-4 pb-12 pt-16 supports-[padding:env(safe-area-inset-bottom)]:pb-[max(3rem,env(safe-area-inset-bottom))]">
        <div className="flex w-full max-w-md flex-1 flex-col gap-6 pt-4">
          {/* Header */}
          <div className="flex flex-col gap-1">
            <h1 className="text-center font-subtitle text-brand-title font-bold uppercase leading-10 text-white">
              Choisis ton profil
            </h1>
            <p className="text-center font-subtitle text-base font-normal leading-6 text-[#E4E4E7]">
              Ce choix influencera ton expérience.
            </p>
          </div>

          {/* Options profil */}
          <div className="flex flex-col gap-4">
            {PROFILES.map(({ id, level, subtitle, icon }) => (
              <button
                key={id}
                type="button"
                onClick={() => setSelectedProfile(id)}
                className="flex w-full items-center gap-4 rounded-3xl bg-[#09090B]/40 p-4 text-left transition hover:bg-[#09090B]/40"
              >
                <Image
                  src={icon}
                  alt=""
                  width={64}
                  height={64}
                  className="h-16 w-16 shrink-0 object-contain"
                />
                <div className="flex flex-1 flex-col gap-1">
                  <p className="font-subtitle text-lg font-bold leading-6 text-white">
                    {level}
                  </p>
                  <p className="font-subtitle text-base font-normal leading-6 text-white">
                    {subtitle}
                  </p>
                </div>
                <div
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-[32px] border transition ${
                    isSelected(id)
                      ? "border-[#0B1742] bg-[#0B1742]"
                      : "border-[#E4E4E7] bg-transparent"
                  }`}
                  aria-hidden
                >
                  {isSelected(id) && (
                    <div className="h-2 w-2 rounded-full bg-white" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Bouton Commencer la mission */}
        {selectedProfile ? (
          <Link
            href="/parcours"
            className="flex w-full max-w-md items-center justify-center gap-2 self-center rounded-full bg-[#0B1742] px-6 py-4 font-subtitle text-lg font-normal leading-6 text-[#FCFCFC] transition active:brightness-95"
          >
            Commencer la mission
          </Link>
        ) : (
          <span
            aria-disabled
            className="flex w-full max-w-md cursor-not-allowed items-center justify-center gap-2 self-center rounded-full bg-[#9E9EA9] px-6 py-4 font-subtitle text-lg font-normal leading-6 text-[#FCFCFC]"
          >
            Commencer la mission
          </span>
        )}
      </div>
    </AppShell>
  );
}
