import type { Metadata } from "next";
import { Big_Shoulders, DM_Sans } from "next/font/google";
import { notFound } from "next/navigation";

import "../globals.css";
import { LocaleSwitch } from "@/components/locale-switch";
import { getDictionary } from "@/lib/dictionaries";
import { LOCALES, isLocale } from "@/lib/i18n";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin", "latin-ext"],
});

const bigShoulders = Big_Shoulders({
  variable: "--font-big-shoulders",
  subsets: ["latin", "latin-ext"],
  fallback: ["Arial Narrow", "Helvetica Neue", "sans-serif"],
  adjustFontFallback: false,
});

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};

  return getDictionary(locale).meta;
}

export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  return (
    <html
      lang={locale}
      className={`${dmSans.variable} ${bigShoulders.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <LocaleSwitch current={locale} />
        {children}
      </body>
    </html>
  );
}
