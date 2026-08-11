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

function digits(fixed: number | undefined, adaptive: number) {
  return fixed === undefined
    ? { maximumFractionDigits: adaptive }
    : { minimumFractionDigits: fixed, maximumFractionDigits: fixed };
}

function compact(value: number, locale: Locale, fixed?: number): string {
  return new Intl.NumberFormat(locale, {
    notation: "compact",
    ...digits(fixed, 1),
  }).format(value);
}

function plain(value: number, locale: Locale, fixed?: number): string {
  return new Intl.NumberFormat(locale, {
    ...digits(fixed, value < 10 ? 2 : 0),
  }).format(value);
}

function formatTime(
  seconds: number,
  locale: Locale,
  labels: TimeLabels,
  fixed?: number,
): FormattedValue {
  if (seconds < 90) {
    return { amount: plain(seconds, locale, fixed), suffix: labels.second };
  }

  if (seconds < 90 * MINUTE) {
    return {
      amount: plain(seconds / MINUTE, locale, fixed),
      suffix: labels.minute,
    };
  }

  if (seconds < 48 * HOUR) {
    return { amount: plain(seconds / HOUR, locale, fixed), suffix: labels.hour };
  }

  if (seconds < 2 * YEAR) {
    return { amount: plain(seconds / DAY, locale, fixed), suffix: labels.day };
  }

  return { amount: compact(seconds / YEAR, locale, fixed), suffix: labels.year };
}

export function formatValue(
  value: number,
  unit: Unit,
  locale: Locale,
  labels: TimeLabels,
  fixed?: number,
): FormattedValue {
  switch (unit) {
    case "people":
      return { amount: compact(value, locale, fixed), suffix: "" };

    case "money":
      return { amount: compact(value, locale, fixed), suffix: "USD" };

    case "length":
      return value < 1000
        ? { amount: plain(value, locale, fixed), suffix: "m" }
        : { amount: compact(value / 1000, locale, fixed), suffix: "km" };

    case "weight":
      return value < 1000
        ? { amount: plain(value, locale, fixed), suffix: "kg" }
        : { amount: compact(value / 1000, locale, fixed), suffix: "t" };

    case "speed":
      return { amount: plain(value * 3.6, locale, fixed), suffix: "km/h" };

    case "area":
      return value < 1_000_000
        ? { amount: compact(value, locale, fixed), suffix: "m²" }
        : { amount: compact(value / 1_000_000, locale, fixed), suffix: "km²" };

    case "time":
      return formatTime(value, locale, labels, fixed);
  }
}
