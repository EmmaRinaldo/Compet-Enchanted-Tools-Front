import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { fetchModuleBySlug } from "@/lib/api/modules";
import { fetchGameById } from "@/lib/api/games";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function MissionPage({ params }: PageProps) {
  const { slug } = await params;

  const moduleData = await fetchModuleBySlug(slug);
  if (!moduleData) notFound();

  // Afficher la mission si le module a une partie robot et/ou un jeu (quiz)
  const hasRobotPart = Boolean(moduleData.robotPart);
  const hasGame = Boolean(moduleData.gameId);
  if (!hasRobotPart && !hasGame) notFound();

  const game = hasGame && moduleData.gameId ? await fetchGameById(moduleData.gameId) : null;
  const bgImageUrl = moduleData.imageUrl || "/bg-default.svg";
  const missionTitle = game?.name ?? `Mission du Module ${moduleData.number}`;
  const missionExtraInfo = game?.extraInfo ?? "";

  return (
    <AppShell
      background={
        <div className="absolute inset-0">
          {bgImageUrl.startsWith("http") ? (
            <img
              src={bgImageUrl}
              alt=""
              className="h-full w-full object-cover"
            />
          ) : (
            <Image
              src={bgImageUrl}
              alt=""
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-slate-950/30" />
        </div>
      }
      className="min-h-svh"
    >
      <div className="relative flex min-h-svh flex-col items-center px-4 pb-12 pt-14 supports-[padding:env(safe-area-inset-bottom)]:pb-[max(3rem,env(safe-area-inset-bottom))] supports-[padding:env(safe-area-inset-top)]:pt-[max(3.5rem,env(safe-area-inset-top))]">
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6">
          {/* Header mission */}
          <div className="mt-10 flex flex-col items-center gap-2 text-center">
            <p className="font-subtitle text-brand-subtitle font-normal text-[#F4F4F5]">
              Mission du Module {moduleData.number}
            </p>
            <h1 className="font-subtitle text-brand-title font-bold uppercase leading-10 text-white">
              {missionTitle}
            </h1>
          </div>

          {/* Bloc de description (extra_info) */}
          {missionExtraInfo && (
            <div className="rounded-2xl bg-[#09090B]/55 px-5 py-4 text-left">
              <p className="font-body text-base font-normal leading-6 text-white">
                {missionExtraInfo}
              </p>
            </div>
          )}

          {/* Carte de la pièce à récupérer */}
          <div className="rounded-[32px] bg-[#09090B]/13 p-4 border border-white/15 shadow-[0_18px_45px_rgba(0,0,0,0.35)]">
            <div className="flex items-center justify-between rounded-3xl px-4 py-3 text-xs font-semibold tracking-wide text-white">
              <span className="text-[#FCFCFC] font-body">Pièce à récupérer</span>
              {moduleData.robotPart && (
                <span className="uppercase text-[#FCFCFC]">
                  {moduleData.robotPart === "torso" && "CORPS"}
                  {moduleData.robotPart === "leftarm" && "BRAS-GAUCHE"}
                  {moduleData.robotPart === "rightarm" && "BRAS-DROIT"}
                  {moduleData.robotPart === "head" && "TÊTE"}
                  {moduleData.robotPart === "legs" && "PENDULE"}
                </span>
              )}
            </div>
            <div className="mt-3 overflow-hidden rounded-3xl">
              <div className="flex h-72 items-center justify-center">
                {moduleData.robotPart ? (
                  <Image
                    src={`/robot/${moduleData.robotPart}.svg`}
                    alt="Illustration de la pièce du robot"
                    width={256}
                    height={256}
                    className="h-72 w-full object-contain"
                  />
                ) : (
                  <span className="font-subtitle text-sm text-white/70">
                    Illustration de la pièce
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Boutons en bas : Commencer / Retour */}
        <div className="mx-auto mt-6 flex w-full max-w-md flex-col gap-3">
          <Link
            href={`/module/${moduleData.slug}/game`}
            className="flex items-center justify-center rounded-full bg-[#0B1742] px-6 py-4 font-subtitle text-lg font-normal leading-6 text-[#FCFCFC] shadow-[0_10px_30px_rgba(0,0,0,0.45)] transition active:brightness-95"
          >
            Commencer la mission
          </Link>
          <Link
            href={`/module/${moduleData.slug}`}
            className="flex items-center justify-center rounded-full bg-[#FAFAFA]/89 px-6 py-4 font-subtitle text-lg font-normal leading-6 text-[#112362] shadow-[0_6px_20px_rgba(0,0,0,0.25)] transition active:brightness-95"
          >
            Retour
          </Link>
        </div>
      </div>
    </AppShell>
  );
}

