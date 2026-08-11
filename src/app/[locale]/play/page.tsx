import { notFound } from "next/navigation";

import { Duel } from "@/components/duel";
import { getDictionary } from "@/lib/dictionaries";
import { isLocale } from "@/lib/i18n";

export default async function Play({ params }: PageProps<"/[locale]/play">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return <Duel locale={locale} t={getDictionary(locale).play} />;
}
