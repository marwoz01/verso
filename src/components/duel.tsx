"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Check, ChevronDown, ChevronUp, RotateCcw, X } from "lucide-react";
import Image from "next/image";
import { useMemo, useRef, useState, useSyncExternalStore } from "react";

import { TransitionLink, useScreenTransition } from "@/components/transition";
import { Button, buttonVariants } from "@/components/ui/button";
import { playChain } from "@/lib/game/chain";
import { formatValue } from "@/lib/game/format";
import { PREVIEW_OBJECTS } from "@/lib/game/preview-unverified";
import type { Round, TraitRef } from "@/lib/game/types";
import type { Dictionary, Locale } from "@/lib/i18n";

gsap.registerPlugin(useGSAP);

type Phase = "guessing" | "revealing" | "over";
type Verdict = "correct" | "wrong";

const COUNT_UP = 2.5;
const COUNT_EASE = "power4.out";
const COUNT_DECIMALS = 2;
const COUNT_SHORT = 0.995;
const COUNT_PAUSE = 0.35;
const VERDICT_DELAY = 0.5;
const CARRY_POP = 0.55;
const SLIDE = 0.55;
const GAME_OVER_HOLD = 1.8;

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

function Heading({ traitRef, locale }: { traitRef: TraitRef; locale: Locale }) {
  return (
    <>
      <p className="font-heading text-3xl font-bold uppercase sm:text-5xl">
        {traitRef.object.name[locale]}
      </p>
      <p className="text-muted-foreground text-2xs font-medium uppercase">
        {traitRef.object.traits[traitRef.traitIndex].label[locale]}
      </p>
    </>
  );
}

function Backdrop({ traitRef }: { traitRef: TraitRef }) {
  const photo = traitRef.object.photo;
  if (!photo) return null;

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden">
      <Image
        src={photo.url}
        alt=""
        fill
        sizes="50vw"
        className="scale-105 object-cover opacity-25 grayscale"
        priority={false}
      />
      <div className="from-background via-background/70 to-background absolute inset-0 bg-linear-to-b" />
    </div>
  );
}

export function Duel({ locale, t }: { locale: Locale; t: Dictionary["play"] }) {
  const { sweep } = useScreenTransition();
  const hydrated = useHydrated();
  const [seed, setSeed] = useState(newSeed);
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("guessing");
  const [verdict, setVerdict] = useState<Verdict | null>(null);
  const [correct, setCorrect] = useState(0);

  const container = useRef<HTMLElement>(null);
  const left = useRef<HTMLDivElement>(null);
  const leftValue = useRef<HTMLParagraphElement>(null);
  const right = useRef<HTMLDivElement>(null);
  const amount = useRef<HTMLSpanElement>(null);
  const suffix = useRef<HTMLSpanElement>(null);
  const flash = useRef<HTMLDivElement>(null);
  const badge = useRef<HTMLDivElement>(null);

  const rounds = useMemo<Round[]>(
    () => playChain(PREVIEW_OBJECTS, seed, 60),
    [seed],
  );

  const round = rounds[index];

  useGSAP(
    () => {
      if (!left.current || !right.current) return;

      if (amount.current) amount.current.textContent = "?";
      if (suffix.current) suffix.current.textContent = "";

      gsap.set([flash.current, badge.current], { autoAlpha: 0 });
      gsap.set([left.current, right.current], { clearProps: "all" });
      gsap.from(right.current, {
        xPercent: 100,
        duration: SLIDE,
        ease: "power2.out",
      });
      gsap.fromTo(
        leftValue.current,
        { scale: 0.45, autoAlpha: 0 },
        {
          scale: 1,
          autoAlpha: 1,
          duration: CARRY_POP,
          ease: "back.out(1.8)",
          delay: SLIDE * 0.35,
        },
      );
    },
    { dependencies: [index, seed], scope: container },
  );

  function guess(higher: boolean) {
    if (!round || phase !== "guessing") return;

    const reference = round.reference.object.traits[round.reference.traitIndex];
    const hidden = round.hidden.object.traits[round.hidden.traitIndex];
    const isRight = hidden.value > reference.value === higher;

    setPhase("revealing");
    setVerdict(isRight ? "correct" : "wrong");
    if (isRight) setCorrect((current) => current + 1);

    const counter = { value: 0 };
    const timeline = gsap.timeline();

    timeline.to(counter, {
      value: hidden.value * COUNT_SHORT,
      duration: COUNT_UP,
      ease: COUNT_EASE,
      onUpdate: () => {
        const ticking = formatValue(
          counter.value,
          hidden.unit,
          locale,
          t.time,
          COUNT_DECIMALS,
        );
        if (amount.current) amount.current.textContent = ticking.amount;
        if (suffix.current) suffix.current.textContent = ticking.suffix;
      },
    });

    timeline.call(
      () => {
        const landed = formatValue(
          hidden.value,
          hidden.unit,
          locale,
          t.time,
          COUNT_DECIMALS,
        );
        if (amount.current) amount.current.textContent = landed.amount;
        if (suffix.current) suffix.current.textContent = landed.suffix;
      },
      undefined,
      `+=${COUNT_PAUSE}`,
    );

    timeline.fromTo(
      flash.current,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 0.15 },
      `+=${VERDICT_DELAY}`,
    );
    timeline.fromTo(
      badge.current,
      { scale: 0.5, autoAlpha: 0 },
      { scale: 1, autoAlpha: 1, duration: 0.3, ease: "back.out(2)" },
      "<",
    );
    timeline.to(flash.current, { autoAlpha: 0, duration: 0.45 });

    if (!isRight) {
      timeline.call(() => setPhase("over"), undefined, `+=${GAME_OVER_HOLD}`);
      return;
    }

    timeline.to(badge.current, { autoAlpha: 0, duration: 0.2 }, "+=0.15");
    timeline.to(left.current, {
      xPercent: -110,
      autoAlpha: 0,
      duration: SLIDE,
      ease: "power2.inOut",
    });
    timeline.to(
      right.current,
      { xPercent: -100, duration: SLIDE, ease: "power2.inOut" },
      "<",
    );
    timeline.call(() => {
      if (index + 1 >= rounds.length) {
        setPhase("over");
        return;
      }

      setIndex((current) => current + 1);
      setPhase("guessing");
      setVerdict(null);
    });
  }

  function restart() {
    setSeed(newSeed());
    setIndex(0);
    setCorrect(0);
    setPhase("guessing");
    setVerdict(null);
  }

  if (!hydrated || !round) {
    return <main className="min-h-dvh" />;
  }

  const exhausted = phase === "over" && verdict !== "wrong";
  const shown = formatValue(
    round.reference.object.traits[round.reference.traitIndex].value,
    round.unit,
    locale,
    t.time,
  );

  return (
    <main ref={container} className="flex min-h-dvh flex-col overflow-hidden">
      <div className="flex flex-1 flex-col md:flex-row">
        <div
          ref={left}
          className="relative flex flex-1 items-center justify-center px-6 py-10"
        >
          <Backdrop traitRef={round.reference} />
          <div className="relative flex flex-col items-center gap-3 text-center">
            <Heading traitRef={round.reference} locale={locale} />
            <p
              ref={leftValue}
              className="text-marker font-heading text-5xl font-black sm:text-7xl"
            >
              {shown.amount}
              <span className="text-3xl sm:text-4xl"> {shown.suffix}</span>
            </p>
          </div>
        </div>

        <div
          ref={right}
          className="relative flex flex-1 items-center justify-center px-6 py-10"
        >
          <Backdrop traitRef={round.hidden} />
          <div className="relative flex flex-col items-center gap-3 text-center">
            <Heading traitRef={round.hidden} locale={locale} />
            <p className="font-heading text-5xl font-black sm:text-7xl">
              <span ref={amount} className="text-marker">
                ?
              </span>
              <span ref={suffix} className="text-marker text-3xl sm:text-4xl" />
            </p>

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
          </div>
        </div>
      </div>

      <div
        ref={flash}
        aria-hidden="true"
        className={`pointer-events-none fixed inset-0 opacity-0 ${
          verdict === "wrong" ? "bg-alert/25" : "bg-marker/20"
        }`}
      />

      <div
        ref={badge}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 flex items-center justify-center opacity-0"
      >
        {verdict === "wrong" ? (
          <X className="text-alert size-32 sm:size-48" strokeWidth={2.5} />
        ) : (
          <Check className="text-marker size-32 sm:size-48" strokeWidth={2.5} />
        )}
      </div>

      {round.relaxation > 0 ? (
        <span className="text-2xs text-muted-foreground fixed bottom-5 left-5 font-medium uppercase">
          {t.relaxed} ({round.relaxation})
        </span>
      ) : null}

      <span className="text-2xs fixed right-5 bottom-5 font-medium uppercase">
        {t.streak} <span className="text-marker">{correct}</span>
      </span>

      {phase === "over" ? (
        <div className="bg-background/95 fixed inset-0 flex flex-col items-center justify-center gap-6 px-6 text-center">
          <p className="font-heading text-5xl font-black uppercase sm:text-7xl">
            {exhausted ? t.exhausted : t.wrong}
          </p>
          <p className="text-2xs text-muted-foreground font-medium uppercase">
            {t.streak}: {correct}
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button size="lg" onClick={() => sweep(restart)}>
              <RotateCcw />
              {t.again}
            </Button>
            <TransitionLink
              href={`/${locale}`}
              className={buttonVariants({ variant: "outline", size: "lg" })}
            >
              {t.home}
            </TransitionLink>
          </div>
        </div>
      ) : null}
    </main>
  );
}
