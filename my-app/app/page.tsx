import Image from "next/image";
import Link from "next/link";
import { AppShell } from "@/components/AppShell";

export default function HomePage() {
  return (
    <AppShell
      background={
        <div className="absolute inset-0">
          <Image
            src="/home/bg-home.jpg"
            alt=""
            fill
            className="object-cover object-[67%_center]"
            priority
          />
        </div>
      }
      className="min-h-svh"
    >
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 px-[16px] py-[3%] supports-[padding:env(safe-area-inset-bottom)]:pb-[max(2rem,env(safe-area-inset-bottom))]">
        {/* Block 1 - Logo */}
        <div className="relative h-10 w-20 shrink-0 ">
          <Image
            src="/home/logo-mirokai-exp.svg"
            alt="Mirokaï Experience"
            fill
            className="object-contain object-center"
            priority
          />
        </div>

        {/* Block 2 - Illustration home-perso */}
        <div className="relative h-100 w-full shrink-0 overflow-hidden">
          <Image
            src="/home/home-perso.svg"
            alt=""
            fill
            className="object-contain object-center"
          />
        </div>

        {/* Block 3 - Texte */}
        <div className="w-full max-w-md">
          <div className="rounded-2xl bg-[#09090B]/50 p-4 backdrop-blur-md">
            <p className="text-center font-subtitle text-lg leading-6 text-[#FCFCFC]">
              <span className="font-normal">
                Un Mirokaï de Nimira veut traverser
                <br />
                le portail pour venir sur Terre.
                <br />
                Mais il a besoin d&apos;un corps…
                <br />
              </span>
              <span className="font-bold">Tu es maintenant apprenti enchanteur.</span>
            </p>
          </div>
        </div>

        {/* Block 4 - Bouton Suivant */}
        <Link
          href="/onboarding"
          className="flex w-full max-w-md items-center justify-center gap-2 rounded-full bg-[#0B1742] px-6 py-4 font-subtitle text-lg font-normal leading-6 text-[#FCFCFC] transition active:brightness-95"
        >
          Suivant
        </Link>
      </div>
    </AppShell>
  );
}
