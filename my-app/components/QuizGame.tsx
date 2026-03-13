"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { markPartUnlocked } from "@/lib/visitorProgress";
import { RobotSuccessDisplay } from "@/components/RobotSuccessDisplay";

type QuizStepAnswer = {
  id: string;
  type: string;
  value: string;
  isCorrect?: boolean;
};

type QuizStep = {
  id: string;
  image?: string;
  question: string;
  extraInfo?: string;
  answers: QuizStepAnswer[];
};

export type QuizGameConfig = {
  steps?: QuizStep[];
};

type QuizGameProps = {
  moduleNumber: number;
  moduleSlug: string;
  robotPart?: string | null;
  backgroundImageUrl: string;
  gameName: string;
  gameExtraInfo: string;
  rawConfig?: unknown;
};

export function QuizGame({
  moduleNumber,
  moduleSlug,
  robotPart,
  backgroundImageUrl,
  gameName,
  gameExtraInfo,
  rawConfig,
}: QuizGameProps) {
  const config = (rawConfig ?? {}) as QuizGameConfig;
  const steps = config.steps ?? [];
  const directSuccess = Boolean(robotPart) && steps.length === 0;

  const hasMultipleSteps = steps.length > 1;
  const hasSingleStep = steps.length === 1;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswerId, setSelectedAnswerId] = useState<string | null>(null);
  const [status, setStatus] = useState<"quiz" | "checking" | "success" | "failure">(
    directSuccess ? "checking" : "quiz",
  );
  const [answersCorrectness, setAnswersCorrectness] = useState<boolean[]>([]);
  const router = useRouter();

  const currentStep: QuizStep | null = useMemo(() => {
    if (!steps.length) return null;
    return steps[Math.min(currentIndex, steps.length - 1)];
  }, [steps, currentIndex]);

  const isLastStep = currentIndex === steps.length - 1;

  // Succès direct (module avec partie robot mais sans quiz) : loader 5 s puis succès
  useEffect(() => {
    if (!directSuccess || status !== "checking") return;
    const t = window.setTimeout(() => {
      if (robotPart) markPartUnlocked(moduleNumber, robotPart);
      setStatus("success");
    }, 5000);
    return () => clearTimeout(t);
  }, [directSuccess, status, moduleNumber, robotPart]);

  const handleValidate = () => {
    if (!steps.length || !selectedAnswerId || !currentStep) return;

    // Marque la réponse de la question courante comme correcte / incorrecte
    const chosen = currentStep.answers.find((a) => a.id === selectedAnswerId);
    const isCorrect = Boolean(chosen?.isCorrect);

    setAnswersCorrectness((prev) => {
      const next = [...prev];
      next[currentIndex] = isCorrect;
      return next;
    });

    // Tant qu'on n'est pas sur la dernière étape, on passe simplement à la suivante
    if (!isLastStep) {
      setCurrentIndex((i) => i + 1);
      setSelectedAnswerId(null);
      return;
    }

    // Dernière étape : on lance le loader puis on décide succès / échec global
    setStatus("checking");

    const allCorrect = [...answersCorrectness, isCorrect].every(Boolean);

    // On garde l'écran de chargement au moins 5 secondes,
    // même si on a déjà le résultat.
    window.setTimeout(() => {
      setStatus(allCorrect ? "success" : "failure");
    }, 5000);
  };

  const title = (() => {
    if (!currentStep) return gameName;
    if (hasMultipleSteps) {
      return `QUESTION ${currentIndex + 1}/${steps.length}`;
    }
    if (hasSingleStep) {
      return gameName;
    }
    return gameName;
  })();

  const description = (() => {
    if (!currentStep) return gameExtraInfo;
    if (hasMultipleSteps) {
      return currentStep.question;
    }
    if (hasSingleStep) {
      return gameExtraInfo || currentStep.extraInfo || "";
    }
    return gameExtraInfo;
  })();

  // Quand on passe en succès, marquer la pièce comme débloquée
  useEffect(() => {
    if (status === "success" && robotPart) {
      markPartUnlocked(moduleNumber, robotPart);
    }
  }, [status, moduleNumber, robotPart]);

  const unlockedLabel = (() => {
    if (!robotPart) return "une partie du Mirokaï";
    if (robotPart === "torso") return "le corps du Mirokaï";
    if (robotPart === "head") return "la tête du Mirokaï";
    if (robotPart === "leftArm") return "le bras gauche du Mirokaï";
    if (robotPart === "rightArm") return "le bras droit du Mirokaï";
    if (robotPart === "legs") return "le pendule du Mirokaï";
    return "une partie du Mirokaï";
  })();

  return (
    <div className="relative flex min-h-svh flex-col items-center px-4 pb-12 pt-14 supports-[padding:env(safe-area-inset-bottom)]:pb-[max(3rem,env(safe-area-inset-bottom))] supports-[padding:env(safe-area-inset-top)]:pt-[max(3.5rem,env(safe-area-inset-top))]">
      {/* Header commun toujours en haut */}
      <div className="mx-auto flex w-full max-w-md flex-col gap-2 text-center">
        <p className="font-subtitle text-brand-subtitle font-normal text-[#F4F4F5]">
          Mission du Module {moduleNumber}
        </p>
        <h1 className="font-subtitle text-brand-title font-bold uppercase leading-10 text-white">
          {status === "success"
            ? "Bravo !"
            : status === "failure"
              ? "Mission échouée"
              : status === "checking"
                ? gameName
                : title}
        </h1>
      </div>

      {/* Contenu principal selon l'état */}
      {/* Loader de vérification */}
      {status === "checking" && (
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-6">
          <Image
            src="/loader.svg"
            alt="Vérification de ta mission"
            width={350}
            height={350}
            className="h-64 w-64 animate-spin"
          />
          <div className="w-full rounded-2xl bg-[#09090B]/34 px-5 py-4 text-left backdrop-blur-md">
            <p className="text-center font-body text-[18px] font-normal leading-6 text-white">
              Retourne toi vers le Mirokaï pour connaître le résultat de ta mission&nbsp;!
            </p>
          </div>
        </div>
      )}

      {/* Écran succès */}
      {status === "success" && (
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-6 text-center">
          <RobotSuccessDisplay newlyUnlockedPart={robotPart ?? undefined} />
          <p className="px-6 font-body text-base font-normal leading-6 text-white">
            Tu as débloqué {unlockedLabel} !
          </p>
        </div>
      )}

      {/* Écran échec */}
      {status === "failure" && (
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col items-center justify-center gap-6 text-center">
          <div className="flex h-full w-full items-center justify-center">
            <Image
              src="/module/icon-failed-mission.svg"
              alt="Mission échouée"
              width={343}
              height={343}
            />
          </div>
          <div className="w-full rounded-2xl bg-[#09090B]/34 px-5 py-4 text-left backdrop-blur-md">
            <p className="text-center font-body text-[18px] font-normal leading-6 text-white">
              Oups, ce n&apos;est pas tout à fait ça.
              <br />
              Tu veux retenter ?
            </p>
          </div>
        </div>
      )}

      {/* Écran principal du quiz */}
      {status === "quiz" && (
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col gap-6 mt-4">

        {/* Illustration : affichée uniquement si l'étape a une image */}
        {currentStep?.image && (
          <div className="overflow-hidden rounded-3xl bg-black/20">
            <Image
              src={currentStep.image}
              alt=""
              width={800}
              height={400}
              className="h-40 w-full object-cover"
            />
          </div>
        )}

        {/* Question / description bloc (glass) */}
        <div className="rounded-2xl bg-[#09090B]/34 px-5 py-4 text-left backdrop-blur-md">
          <p className="font-body text-[18px] font-normal leading-6 text-white">
            {description}
          </p>
        </div>

        {/* Réponses */}
        {currentStep && currentStep.answers?.length > 0 && (
          <>
            {/* Cas quiz image : réponses en 2x2, taille calculée selon la place disponible */}
            {currentStep.answers[0]?.type === "image" ? (
              <div className="flex min-h-0 flex-1 flex-col">
                <div className="grid max-h-[50vh] min-h-[200px] flex-1 grid-cols-2 grid-rows-[1fr_1fr] gap-3">
                  {currentStep.answers.map((answer) => {
                    const isSelected = selectedAnswerId === answer.id;
                    return (
                      <button
                        key={answer.id}
                        type="button"
                        onClick={() => setSelectedAnswerId(answer.id)}
                        className={`relative flex min-h-0 w-full items-stretch justify-center overflow-hidden rounded-3xl transition backdrop-blur-md ${
                          isSelected
                            ? "ring-2 ring-[#0B1742] bg-white/10"
                            : "bg-[#09090B]/34"
                        }`}
                      >
                        <Image
                          src={answer.value}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="(max-width: 400px) 50vw, 200px"
                        />
                      <span
                        className={`absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full border ${
                          isSelected
                            ? "border-white bg-white"
                            : "border-white/60 bg-black/40"
                        }`}
                        aria-hidden
                      >
                        {isSelected && (
                          <span className="h-2.5 w-2.5 rounded-full bg-[#0B1742]" />
                        )}
                      </span>
                    </button>
                  );
                })}
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {currentStep.answers.map((answer) => {
                  const isSelected = selectedAnswerId === answer.id;
                  return (
                    <button
                      key={answer.id}
                      type="button"
                      onClick={() => setSelectedAnswerId(answer.id)}
                      className={`flex w-full items-center justify-between rounded-3xl px-5 py-3 text-left transition backdrop-blur-md ${
                        isSelected
                          ? "bg-[#09090B]/45 text-white shadow-[0_10px_30px_rgba(0,0,0,0.20)]"
                          : "bg-[#09090B]/34 text-white/90 hover:bg-white/25"
                      }`}
                    >
                      <span className="font-body text-base font-normal">
                        {answer.value}
                      </span>
                      <span
                        className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                          isSelected
                            ? "border-white bg-white"
                            : "border-white/60 bg-transparent"
                        }`}
                        aria-hidden
                      >
                        {isSelected && (
                          <span className="h-2.5 w-2.5 rounded-full bg-[#0B1742]" />
                        )}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
      )}

      {/* Actions en bas */}
      {status === "quiz" && (
        <div className="mx-auto mt-6 flex w-full max-w-md">
          <button
            type="button"
            onClick={handleValidate}
            disabled={!selectedAnswerId}
            className={`flex w-full items-center justify-center rounded-full px-6 py-4 font-subtitle text-lg font-normal leading-6 transition ${
              selectedAnswerId
                ? "bg-[#0B1742] text-[#FCFCFC]  active:brightness-95"
                : "cursor-not-allowed bg-[#9F9FA9] text-[#FCFCFC]"
            }`}
          >
            Valider
          </button>
        </div>
      )}

      {status === "failure" && (
        <div className="mx-auto mt-6 flex w-full max-w-md flex-col gap-3">
          <button
            type="button"
            onClick={() => {
              // Recommencer le quiz depuis le début
              setSelectedAnswerId(null);
              setStatus("quiz");
              setCurrentIndex(0);
              setAnswersCorrectness([]);
            }}
            className="flex w-full items-center justify-center rounded-full bg-[#0B1742] px-6 py-4 font-subtitle text-lg font-normal leading-6 text-[#FCFCFC] shadow-[0_10px_30px_rgba(0,0,0,0.45)] transition active:brightness-95"
          >
            Recommencer
          </button>
          <button
            type="button"
            onClick={() => {
              router.push("/parcours");
            }}
            className="flex w-full items-center justify-center rounded-full bg-[#FAFAFA]/89 px-6 py-4 font-subtitle text-lg font-normal leading-6 text-[#112362] shadow-[0_10px_30px_rgba(0,0,0,0.25)] transition active:brightness-95"
          >
            Changer de module
          </button>
        </div>
      )}

      {status === "success" && (
        <div className="mx-auto mt-6 flex w-full max-w-md flex-col gap-3">
          <button
            type="button"
            onClick={() => {
              router.push("/parcours");
            }}
            className="flex w-full items-center justify-center rounded-full bg-[#0B1742] px-6 py-4 font-subtitle text-lg font-normal leading-6 text-[#FCFCFC] shadow-[0_10px_30px_rgba(0,0,0,0.45)] transition active:brightness-95"
          >
            Continuer
          </button>
        </div>
      )}
    </div>
  );
}

