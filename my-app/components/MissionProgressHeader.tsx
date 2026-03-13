"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { loadVisitorProgress } from "@/lib/visitorProgress";
import { RobotSuccessDisplay } from "@/components/RobotSuccessDisplay";

export function MissionProgressHeader() {
  const [piecesCollected, setPiecesCollected] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const progress = loadVisitorProgress();
    setPiecesCollected(progress.parts.length);
  }, []);

  const isCompleted = piecesCollected >= 5;
  const canOpenModal = piecesCollected > 0 && piecesCollected < 5;
  const isInteractive = canOpenModal || isCompleted;

  const handleActivate = () => {
    if (canOpenModal) {
      setModalOpen(true);
      return;
    }
    if (isCompleted) {
      router.push("/reward");
    }
  };

  return (
    <>
      <header
        role={isInteractive ? "button" : undefined}
        tabIndex={isInteractive ? 0 : undefined}
        onClick={isInteractive ? handleActivate : undefined}
        onKeyDown={(e) =>
          isInteractive &&
          (e.key === "Enter" || e.key === " ") &&
          handleActivate()
        }
        className={`sticky top-0 z-50 flex flex-col gap-2 rounded-b-2xl bg-slate-950/95 px-4 pb-4 pt-10 backdrop-blur-sm shadow-[0_4px_20px_rgba(0,0,0,0.4)] ${
          isInteractive ? "cursor-pointer" : ""
        }`}
      >
        <div className="flex items-center justify-between">
          {piecesCollected >= 5 ? (
            <>
              <h1 className="text-sm font-semibold tracking-tight text-white">
                Mission terminée !
              </h1>
              <span className="flex items-center gap-1 text-xs font-semibold text-[#E6A500]">
                Récupère ta récompense
                <span className="relative inline-block h-3.5 w-3.5 shrink-0" aria-hidden>
                  <Image
                    src="/icon-log.svg"
                    alt=""
                    fill
                    className="object-contain"
                  />
                </span>
              </span>
            </>
          ) : (
            <>
              <h1 className="text-sm font-semibold tracking-tight text-white">
                Mission Mirokaï
              </h1>
              <span className="text-xs text-white/90">
                <span className="font-bold">{piecesCollected}</span>/5 pièces
              </span>
            </>
          )}
        </div>
        {/* Stepper: vide = border #9F9FA9; rempli = bg #E6A500 */}
        <div className="flex w-full gap-1">
          {[1, 2, 3, 4, 5].map((i) => {
            const filled = i <= piecesCollected;
            return (
              <div
                key={i}
                className={`h-1.5 flex-1 rounded-full ${
                  filled ? "bg-[#E6A500]" : "border border-[#9F9FA9]"
                }`}
                aria-hidden
              />
            );
          })}
        </div>
      </header>

      {/* Modal robot (quand pas encore 5 pièces) */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20 p-4"
          onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="Aperçu du robot"
        >
          <div className="relative max-h-[90vh] w-full max-w-md overflow-auto rounded-2xl bg-[#0B1742]/80 p-6 shadow-xl backdrop-blur-md border border-white/15">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#FAFAFA]/89 text-white transition hover:bg-white/20"
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
            <h2 className="mb-4 pr-12 text-center text-lg font-semibold text-white">
              Ton Mirokaï
            </h2>
            <div className="min-h-[320px]">
              <RobotSuccessDisplay />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

