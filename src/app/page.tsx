import { ArrowUp, Burst, Circle, Underline } from "@/components/graffiti";

// Strona glowna. Uklad wzorowany na ekranie startowym The Higher Lower Game
// (wysrodkowana kolumna: znak, pytanie, opis, tryby, ramka z zasada),
// styl minimalistyczny: biel, czarna typografia, zielony marker jako jedyny akcent.
//
// Przyciski trybow nie sa jeszcze podpiete - Endless i Daily nie istnieja.
export default function Home() {
  return (
    <main className="flex flex-1 items-center justify-center px-6 py-16 sm:py-20">
      <div className="flex w-full max-w-2xl flex-col items-center text-center">
        {/* Znak: strzalka w gore to gest "wiecej", czyli cala decyzja w tej grze */}
        <div className="flex items-end gap-3 sm:gap-5">
          <ArrowUp className="mb-2 w-7 text-accent sm:mb-4 sm:w-11" />
          <h1 className="text-6xl leading-[0.85] font-extrabold tracking-tighter uppercase sm:text-8xl">
            Verso
          </h1>
        </div>

        <p className="mt-5 text-sm font-medium tracking-[0.2em] text-ink-muted uppercase sm:text-base">
          Compare the incomparable
        </p>

        {/* Pytanie, ktore gra zadaje w kazdej rundzie */}
        <h2 className="mt-12 text-3xl font-bold tracking-tight sm:mt-16 sm:text-5xl">
          Which one is{" "}
          <span className="relative inline-block whitespace-nowrap">
            bigger
            <Underline className="absolute -bottom-2 left-0 h-3 w-full text-accent sm:-bottom-3 sm:h-4" />
          </span>
          ?
        </h2>

        <p className="mt-8 max-w-md text-base leading-relaxed text-ink-muted sm:mt-10 sm:text-lg">
          Two things from completely different worlds, measured in the same unit.
          The population of Poland against Taylor Swift&rsquo;s monthly listeners.
          The cost of GTA V against the Burj Khalifa.
        </p>

        {/* Tryby z zakresu v1 */}
        <div className="mt-10 flex w-full flex-col gap-3 sm:mt-12 sm:w-auto sm:flex-row sm:gap-4">
          <button
            type="button"
            className="bg-ink text-paper cursor-pointer px-10 py-4 text-base font-bold tracking-wide uppercase transition-transform duration-150 hover:-translate-y-0.5 active:translate-y-0"
          >
            Endless
          </button>
          <button
            type="button"
            className="border-ink text-ink hover:bg-ink hover:text-paper cursor-pointer border-2 px-10 py-4 text-base font-bold tracking-wide uppercase transition-colors duration-150"
          >
            Daily
          </button>
        </div>

        {/* Zasada w jednym zdaniu - to jest cale wprowadzenie do gry */}
        <div className="border-accent relative mt-16 w-full max-w-md border-2 px-6 pt-8 pb-6 sm:mt-20">
          <span className="bg-paper text-accent-ink absolute -top-3 left-1/2 -translate-x-1/2 px-3 text-xs font-bold tracking-[0.15em] uppercase">
            How it works
          </span>
          <p className="text-base leading-relaxed font-medium">
            Pick the bigger value. Get it right and the revealed object stays —
            but next round it is measured by{" "}
            <span className="relative inline-block whitespace-nowrap">
              something else
              {/* rozmiar wynika wylacznie z inset - podanie obok h/w nadpisywaloby prawa krawedz */}
              <Circle className="text-accent absolute -inset-x-4 -inset-y-2" />
            </span>
            .
          </p>
        </div>

        <p className="mt-14 flex items-center gap-2 text-xs font-medium tracking-[0.15em] text-ink-muted uppercase sm:mt-16">
          <Burst className="text-accent w-4" />
          No account. No install. Just guess.
        </p>
      </div>
    </main>
  );
}
