import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { AudioguideButton } from "@/components/AudioguideButton";
import { fetchModuleBySlug } from "@/lib/api/modules";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ModulePage({ params }: PageProps) {
  const { slug } = await params;
  const moduleData = await fetchModuleBySlug(slug);
  if (!moduleData) notFound();

  const bgImageUrl = moduleData.imageUrl || "/bg-default.svg";
  const hasRobotPart = Boolean(moduleData.robotPart);

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
        {/* Bouton fermer */}
        <Link
          href="/parcours"
          className="absolute right-4 top-12 z-10 flex h-[56PX] w-[56PX] items-center justify-center rounded-full bg-[#FAFAFA]/89 transition"
          aria-label="Fermer"
        >
          <Image
            src="/module/module-close.svg"
            alt=""
            width={24}
            height={24}
            className="h-6 w-6 text-[#112362]"
          />
        </Link>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 mt-[10%]">
          {/* Module X + Titre */}
          <div className="flex flex-col items-center gap-1 text-center">
            <p className="font-subtitle text-sm font-normal text-[#E4E4E7]">
              Module {moduleData.number}
            </p>
            <h1 className="font-subtitle text-brand-title font-bold uppercase leading-10 text-white">
              {moduleData.name}
            </h1>
          </div>

          {/* Bouton Écouter l'audioguide */}
          <AudioguideButton
            audioUrl={moduleData.audioUrl}
            videoUrl={moduleData.videoUrl}
          />

          {/* Section FR */}
          <div className="rounded-2xl bg-[#09090B]/34 p-4 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <Image
                src="/module/lang-fr.svg"
                alt=""
                width={24}
                height={18}
                className="h-[18px] w-6"
              />
              <span className="font-subtitle text-sm font-normal text-white">
                FR
              </span>
            </div>
            <p className="mt-3 font-body text-base font-normal leading-6 text-white">
              {moduleData.description}
            </p>
          </div>
        </div>

        {/* Bouton Découvrir la mission (en bas de page, seulement si robot) */}
        {hasRobotPart && moduleData.gameId && (
          <div className="mx-auto mt-5 flex w-full max-w-md justify-center">
            <Link
              href={`/module/${moduleData.slug}/mission`}
              className="inline-flex items-center justify-center rounded-full bg-[#0B1742] px-6 py-4 font-subtitle text-lg font-normal leading-6 text-[#FCFCFC] shadow-[0_10px_30px_rgba(0,0,0,0.45)] transition active:brightness-95"
            >
              Découvrir la mission
            </Link>
          </div>
        )}
      </div>
    </AppShell>
  );
}
