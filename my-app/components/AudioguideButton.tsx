"use client";

import Image from "next/image";
import { useCallback, useRef } from "react";

type AudioguideButtonProps = {
  audioUrl?: string | null;
  videoUrl?: string | null;
};

export function AudioguideButton({ audioUrl, videoUrl }: AudioguideButtonProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleClick = useCallback(() => {
    if (audioUrl) {
      if (!audioRef.current) {
        audioRef.current = new Audio(audioUrl);
      }
      const audio = audioRef.current;
      if (audio.paused) {
        audio.play();
      } else {
        audio.pause();
        audio.currentTime = 0;
        audio.play();
      }
    } else if (videoUrl) {
      window.open(videoUrl, "_blank");
    }
  }, [audioUrl, videoUrl]);

  const hasSource = Boolean(audioUrl || videoUrl);

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        disabled={!hasSource}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-[#0B1742] px-6 py-4 font-subtitle text-base font-normal leading-6 text-[#FCFCFC] transition active:brightness-95 disabled:cursor-not-allowed disabled:opacity-60"
      >
        Écouter l&apos;audioguide
        <span className="flex h-6 w-6 items-center justify-center filter-[invert(1)_brightness(1.1)]">
          <Image
            src="/module/icon-audioguide.svg"
            alt=""
            width={24}
            height={24}
            className="h-6 w-6"
          />
        </span>
      </button>
    </>
  );
}
