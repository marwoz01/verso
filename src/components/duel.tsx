"use client";

import { ChevronDown, ChevronUp, RotateCcw } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState, useSyncExternalStore } from "react";

import { Button, buttonVariants } from "@/components/ui/button";
import { playChain } from "@/lib/game/chain";
import { formatValue } from "@/lib/game/format";
import { PREVIEW_OBJECTS } from "@/lib/game/preview-unverified";
import type { Round, TraitRef } from "@/lib/game/types";
import type { Dictionary, Locale } from "@/lib/i18n";

type Phase = "guessing" | "revealed" | "over";

type CardProps = {
  traitRef: TraitRef;
  locale: Locale;
  t: Dictionary["play"];
  revealed: boolean;
  children?: React.ReactNode;
};

function Card({ traitRef, locale, t, revealed, children }: CardProps) {
  const trait = traitRef.object.traits[traitRef.traitIndex];
  const formatted = formatValue(trait.value, trait.unit, locale, t.time);

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 py-10 text-center">
      <p className="font-heading text-3xl font-bold uppercase sm:text-4xl">
        {traitRef.object.name[locale]}
      </p>
      <p className="text-muted-foreground text-2xs font-medium uppercase">
        {trait.label[locale]}
      </p>

      {revealed ? (
        <p className="text-marker font-heading text-5xl font-black sm:text-7xl">
          {formatted.amount}
          {formatted.suffix ? (
            <span className="text-3xl sm:text-4xl"> {formatted.suffix}</span>
          ) : null}
        </p>
      ) : (
        <p className="text-muted-foreground font-heading text-5xl font-black sm:text-7xl">
          ?
        </p>
      )}

      {children}
    </div>
  );
}

function newSeed(): number {
  return Math.floor(Math.random() * 2 ** 31);
}

function useHydrated(): boolean {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function Duel({ locale, t }: { locale: Locale; t: Dictionary["play"] }) {
  const hydrated = useHydrated();
  const [seed, setSeed] = useState(newSeed);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("guessing");
  const [correct, setCorrect] = useState(0);

  const rounds = useMemo<Round[]>(
    () => playChain(PREVIEW_OBJECTS, seed, 60),
    [seed],
  );

  const round = rounds[index];

  useEffect(() => {
    if (phase !== "revealed") return;

    const timer = setTimeout(() => {
      if (index + 1 >= rounds.length) {
        setPhase("over");
        return;
      }

      setIndex((current) => current + 1);
      setPhase("guessing");
    }, 1600);

    return () => clearTimeout(timer);
  }, [phase, index, rounds.length]);

  function restart() {
    setSeed(newSeed());
    setIndex(0);
    setCorrect(0);
    setPhase("guessing");
  }

  function guess(higher: boolean) {
    if (!round || phase !== "guessing") return;

    const reference = round.reference.object.traits[round.reference.traitIndex];
    const hidden = round.hidden.object.traits[round.hidden.traitIndex];

    if (hidden.value > reference.value === higher) {
      setCorrect((current) => current + 1);
      setPhase("revealed");
      return;
    }

    setPhase("over");
  }

  if (!hydrated || !round) {
    return <main className="min-h-dvh" />;
  }

  const exhausted = phase === "over" && index + 1 >= rounds.length;

  return (
    <main className="flex min-h-dvh flex-col">
      <header className="flex items-center justify-between gap-4 px-5 py-4">
        <span className="text-2xs text-muted-foreground font-medium uppercase">
          {t.preview}
        </span>
        <span className="text-2xs font-medium uppercase">
          {t.streak} <span className="text-marker">{correct}</span>
        </span>
      </header>

      <div className="flex flex-1 flex-col md:flex-row">
        <Card traitRef={round.reference} locale={locale} t={t} revealed />

        <div className="flex items-center justify-center px-5 md:px-0">
          <span className="border-border bg-card text-2xs rounded-sm border px-4 py-2 font-medium tracking-widest uppercase">
            {t.units[round.unit]}
          </span>
        </div>

        <Card
          traitRef={round.hidden}
          locale={locale}
          t={t}
          revealed={phase !== "guessing"}
        >
          {phase === "guessing" ? (
            <div className="mt-4 flex gap-3">
              <Button size="lg" onClick={() => guess(true)}>
                <ChevronUp />
                {t.higher}
              </Button>
              <Button size="lg" variant="outline" onClick={() => guess(false)}>
                <ChevronDown />
                {t.lower}
              </Button>
            </div>
          ) : null}
        </Card>
      </div>

      <footer className="text-2xs flex min-h-14 items-center justify-center px-5 py-4 font-medium uppercase">
        {round.relaxation > 0 ? (
          <span className="text-alert">
            {t.relaxed} ({round.relaxation})
          </span>
        ) : null}
      </footer>

      {phase === "over" ? (
        <div className="bg-background/95 fixed inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center">
          <p className="font-heading text-5xl font-black uppercase sm:text-7xl">
            {exhausted ? t.exhausted : t.wrong}
          </p>
          <p className="text-2xs text-muted-foreground font-medium uppercase">
            {t.streak}: {correct}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" onClick={restart}>
              <RotateCcw />
              {t.again}
            </Button>
            <Link
              href={`/${locale}`}
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              {t.home}
            </Link>
          </div>
        </div>
      ) : null}
    </main>
  );
}
