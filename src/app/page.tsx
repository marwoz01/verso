import Image from "next/image";

import logo from "@/assets/logo.png";
import { Burst, Circle, Underline } from "@/components/graffiti";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16 sm:py-20">
      <div className="flex w-full max-w-2xl flex-col items-center text-center">
        <h1>
          <Image
            src={logo}
            alt="Verso — compare the incomparable"
            priority
            className="h-auto w-48 sm:w-64"
          />
        </h1>

        <h2 className="mt-12 text-3xl font-semibold tracking-tight sm:mt-16 sm:text-5xl">
          Which one is{" "}
          <span className="relative inline-block whitespace-nowrap">
            bigger
            <Underline className="text-marker absolute -bottom-2 left-0 h-3 w-full sm:-bottom-3 sm:h-4" />
          </span>
          ?
        </h2>

        <p className="text-muted-foreground mt-8 max-w-md text-base leading-relaxed font-light sm:mt-10 sm:text-lg">
          Two things from completely different worlds, measured in the same unit.
          The population of Poland against Taylor Swift&rsquo;s monthly listeners.
          The cost of GTA V against the Burj Khalifa.
        </p>

        <div className="mt-10 flex w-full flex-col gap-3 sm:mt-12 sm:w-auto sm:flex-row sm:gap-4">
          <Button size="lg" className="w-full sm:w-auto">
            Endless
          </Button>
          <Button variant="outline" size="lg" className="w-full sm:w-auto">
            Daily
          </Button>
        </div>

        <div className="border-marker relative mt-16 w-full max-w-md border-2 px-6 pt-8 pb-6 sm:mt-20">
          <span className="bg-background text-marker-ink absolute -top-3 left-1/2 -translate-x-1/2 px-3 text-xs font-semibold tracking-[0.15em] uppercase">
            How it works
          </span>
          <p className="text-base leading-relaxed font-light">
            Pick the bigger value. Get it right and the revealed object stays —
            but next round it is measured by{" "}
            <span className="relative inline-block whitespace-nowrap">
              something else
              <Circle className="text-marker absolute -inset-x-4 -inset-y-2" />
            </span>
            .
          </p>
        </div>

        <p className="text-muted-foreground mt-14 flex items-center gap-2 text-xs font-light tracking-[0.15em] uppercase sm:mt-16">
          <Burst className="text-marker w-4" />
          No account. No install. Just guess.
        </p>
      </div>
    </main>
  );
}
