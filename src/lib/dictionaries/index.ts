import type { Dictionary, Locale } from "@/lib/i18n";

import { en } from "./en";
import { pl } from "./pl";

const DICTIONARIES: Record<Locale, Dictionary> = { en, pl };

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}
