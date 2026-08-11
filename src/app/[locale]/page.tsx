import { ArrowRightLeft, Sparkle } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Circle, Underline } from "@/components/graffiti";
import { Button, buttonVariants } from "@/components/ui/button";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n";

export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const t = getDictionary(locale);

  return (
    <main className="flex min-h-dvh flex-1 items-center justify-center px-6 py-10">
      <div className="max-w-content flex w-full flex-col items-center text-center">
        <h1 className="flex flex-col items-center">
          <Sparkle
            aria-hidden="true"
            className="text-marker size-12 sm:size-16"
            fill="currentColor"
            strokeWidth={0}
          />
          <span className="text-marker font-heading mt-6 text-7xl font-black uppercase sm:text-9xl">
            Verso
          </span>
        </h1>

        <p className="text-muted-foreground text-2xs mt-5 font-medium uppercase">
          {t.hero.tagline}
        </p>

        <div className="mt-14 flex w-fit max-w-full flex-col items-center">
          <h2 className="font-heading text-4xl font-bold uppercase sm:text-6xl">
            {t.hero.question.before}{" "}
            <span className="relative inline-block whitespace-nowrap">
              {t.hero.question.highlight}
              <Underline className="text-marker absolute bottom-[-0.25em] left-0 h-[0.36em] w-full" />
            </span>
            {t.hero.question.after}
          </h2>

          <p className="text-muted-foreground text-2xs mt-6 max-w-narrow font-medium uppercase">
            {t.hero.lead}
          </p>

          <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:gap-4">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              {t.modes.daily}
            </Button>
            <Link
              href={`/${locale}/play`}
              className={buttonVariants({ size: "lg", className: "w-full sm:w-auto" })}
            >
              {t.modes.endless}
            </Link>
          </div>

          <div className="bg-card mt-10 flex w-0 min-w-full items-center gap-5 rounded-sm p-6 text-left">
            <span className="bg-marker flex size-12 shrink-0 items-center justify-center rounded-sm">
              <ArrowRightLeft className="text-background size-6" />
            </span>
            <div>
              <p className="text-foreground text-2xs font-semibold uppercase">
                {t.howItWorks.title}
              </p>
              <p className="text-muted-foreground text-2xs mt-2 font-medium uppercase">
                {t.howItWorks.body.before}
                <span className="relative inline-block whitespace-nowrap">
                  {t.howItWorks.body.highlight}
                  <Circle className="text-marker absolute top-1/2 left-1/2 h-[2.4em] w-[calc(100%+1.6em)] -translate-x-1/2 -translate-y-1/2" />
                </span>
                {t.howItWorks.body.after}
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
