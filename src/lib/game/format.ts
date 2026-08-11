import type { Locale } from "@/lib/i18n";
import type { Unit } from "@/lib/units";

export type TimeLabels = {
  second: string;
  minute: string;
  hour: string;
  day: string;
  year: string;
};

export type FormattedValue = {
  amount: string;
  suffix: string;
};

const MINUTE = 60;
const HOUR = 3600;
const DAY = 86_400;
const YEAR = 31_557_600;

function compact(value: number, locale: Locale): string {
  return new Intl.NumberFormat(locale, {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value);
}

function plain(value: number, locale: Locale): string {
  return new Intl.NumberFormat(locale, {
    maximumFractionDigits: value < 10 ? 2 : 0,
  }).format(value);
}

function formatTime(
  seconds: number,
  locale: Locale,
  labels: TimeLabels,
): FormattedValue {
  if (seconds < 90) {
    return { amount: plain(seconds, locale), suffix: labels.second };
  }

  if (seconds < 90 * MINUTE) {
    return { amount: plain(seconds / MINUTE, locale), suffix: labels.minute };
  }

  if (seconds < 48 * HOUR) {
    return { amount: plain(seconds / HOUR, locale), suffix: labels.hour };
  }

  if (seconds < 2 * YEAR) {
    return { amount: plain(seconds / DAY, locale), suffix: labels.day };
  }

  return { amount: compact(seconds / YEAR, locale), suffix: labels.year };
}

export function formatValue(
  value: number,
  unit: Unit,
  locale: Locale,
  labels: TimeLabels,
): FormattedValue {
  switch (unit) {
    case "people":
      return { amount: compact(value, locale), suffix: "" };

    case "money":
      return { amount: compact(value, locale), suffix: "USD" };

    case "length":
      return value < 1000
        ? { amount: plain(value, locale), suffix: "m" }
        : { amount: compact(value / 1000, locale), suffix: "km" };

    case "weight":
      return value < 1000
        ? { amount: plain(value, locale), suffix: "kg" }
        : { amount: compact(value / 1000, locale), suffix: "t" };

    case "speed":
      return { amount: plain(value * 3.6, locale), suffix: "km/h" };

    case "area":
      return value < 1_000_000
        ? { amount: compact(value, locale), suffix: "m²" }
        : { amount: compact(value / 1_000_000, locale), suffix: "km²" };

    case "time":
      return formatTime(value, locale, labels);
  }
}
