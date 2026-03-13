import Image from "next/image";
import { notFound } from "next/navigation";
import { AppShell } from "@/components/AppShell";
import { QuizGame } from "@/components/QuizGame";
import { fetchModuleBySlug } from "@/lib/api/modules";
import { fetchGameById } from "@/lib/api/games";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ModuleGamePage({ params }: PageProps) {
  const { slug } = await params;

  const moduleData = await fetchModuleBySlug(slug);
  if (!moduleData) notFound();

  const hasRobotPart = Boolean(moduleData.robotPart);
  const hasGameId = Boolean(moduleData.gameId);
  if (!hasRobotPart && !hasGameId) notFound();

  const game = hasGameId && moduleData.gameId ? await fetchGameById(moduleData.gameId) : null;
  const bgImageUrl = moduleData.imageUrl || "/bg-default.svg";
  const gameName = game?.name ?? `Mission du Module ${moduleData.number}`;
  const gameExtraInfo = game?.extraInfo ?? "";
  const rawConfig = game?.config ?? {};

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
      <QuizGame
        moduleNumber={moduleData.number}
        moduleSlug={moduleData.slug}
        robotPart={moduleData.robotPart}
        backgroundImageUrl={bgImageUrl}
        gameName={gameName}
        gameExtraInfo={gameExtraInfo}
        rawConfig={rawConfig}
      />
    </AppShell>
  );
}

