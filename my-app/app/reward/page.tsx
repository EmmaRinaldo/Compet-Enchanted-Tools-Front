"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { RobotSuccessDisplay } from "@/components/RobotSuccessDisplay";

export default function RewardPage() {
  const router = useRouter();
  const [mirokaiName, setMirokaiName] = useState("MIRAKAÏA");
  const [isEditingName, setIsEditingName] = useState(false);
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (isEditingName && nameInputRef.current) {
      nameInputRef.current.focus();
      nameInputRef.current.select();
    }
  }, [isEditingName]);

  const handleNameValidate = () => {
    if (!mirokaiName.trim()) {
      setMirokaiName("MIRAKAÏA");
    }
    setIsEditingName(false);
  };

  const today = new Date().toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="relative flex min-h-svh flex-col items-center justify-between px-4 pb-10 pt-12">
      {/* Fond image */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <Image
          src="/bg-rewards.svg"
          alt=""
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-slate-950/25" />
      </div>
      {/* Bouton fermer en haut à droite */}
      <button
        type="button"
        onClick={() => router.back()}
        className="absolute right-4 top-6 flex h-10 w-10 items-center justify-center rounded-full bg-[#FAFAFA]/89 text-white transition hover:bg-white/20 shadow-[0_8px_24px_rgba(0,0,0,0.35)]"
        aria-label="Fermer"
      >
        <Image
          src="/module/module-close.svg"
          alt=""
          width={24}
          height={24}
          className="h-6 w-6"
        />
      </button>

      {/* Titre */}
      <div className="mt-10 flex flex-col items-center gap-2 text-center">
        <h1 className="font-subtitle text-brand-title font-bold uppercase leading-10 text-white">
          Mission accomplie
        </h1>
      </div>

      {/* Illustration principale */}
      <div className="mt-4 flex w-full justify-center">
        <div className="relative h-64 w-full max-w-xs">
          <Image
            src="/rewards-perso.svg"
            alt="Illustration de la mission accomplie"
            fill
            className="object-contain drop-shadow-[0_18px_45px_rgba(0,0,0,0.4)]"
          />
        </div>
      </div>

      {/* Carte certificat */}
      <div className="mt-6 w-full max-w-xs rounded-[32px] border-3 border-[#FFCA44] bg-[#E6A500]/36 p-4 shadow-[0_18px_45px_rgba(0,0,0,0.35)] backdrop-blur-md">
        {/* Bandeau certificat + nom éditable */}
        <div className="rounded-3xl bg-[#F9C86B] px-4 py-3 shadow-[0_10px_25px_rgba(0,0,0,0.18)]">
          <p className="text-center text-[11px] font-semibold tracking-[0.2em] text-[#5C3B18]">
            CERTIFICAT
          </p>
          <div className="mt-1 flex items-center justify-center gap-2">
            {isEditingName ? (
              <input
                ref={nameInputRef}
                type="text"
                maxLength={18}
                value={mirokaiName}
                onChange={(e) => setMirokaiName(e.target.value)}
                onBlur={handleNameValidate}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleNameValidate();
                  } else if (e.key === "Escape") {
                    setIsEditingName(false);
                  }
                }}
                className="min-w-0 rounded-full bg-white/90 px-4 py-1.5 text-center font-subtitle text-lg font-bold uppercase tracking-[0.18em] text-[#112362] outline-none"
              />
            ) : (
              <span className="inline-flex items-center gap-2">
                <span className="font-subtitle text-lg font-bold uppercase tracking-[0.18em] text-[#112362]">
                  {mirokaiName}
                </span>
                <button
                  type="button"
                  onClick={() => setIsEditingName(true)}
                  className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#F8EBCC] text-[#5C3B18] shadow-sm"
                  aria-label="Renommer ton Mirokaï"
                >
                  <svg
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                    className="h-3.5 w-3.5"
                  >
                    <path
                      d="M4 20h3l11-11-3-3L4 17v3zM17.5 3.5l3 3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </span>
            )}
          </div>
        </div>

        {/* Robot complet */}
        
        <RobotSuccessDisplay />

        {/* Lieu + date */}
        <div className="mt-3 space-y-1 text-center text-[11px] text-[#5C3B18]">
          <p className="font-semibold">Nimira - Laboratoire des Mirokaïs</p>
          <p>{today}</p>
        </div>
      </div>

      {/* Boutons d'action */}
      <div className="mt-8 flex w-full max-w-xs flex-col gap-3 pb-4">
        <button
          type="button"
          className="h-11 rounded-full bg-[#0B1742] text-center font-subtitle text-sm font-semibold text-[#FCFCFC] shadow-[0_10px_30px_rgba(0,0,0,0.45)] active:brightness-95"
        >
          Télécharger
        </button>
        <button
          type="button"
          className="h-11 rounded-full bg-[#FAFAFA]/89 text-center font-subtitle text-sm font-semibold text-[#0B1742] shadow-[0_8px_24px_rgba(0,0,0,0.25)] active:brightness-95"
        >
          Partager
        </button>
        <button
          type="button"
          className="h-11 rounded-full bg-[#FAFAFA]/89 text-center font-subtitle text-sm font-semibold text-[#0B1742] shadow-[0_8px_24px_rgba(0,0,0,0.2)] active:brightness-95"
        >
          Suivre Enchanted Tools
        </button>
      </div>
    </div>
  );
}

