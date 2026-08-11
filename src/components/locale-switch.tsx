"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { LOCALES, type Locale } from "@/lib/i18n";

export function LocaleSwitch({ current }: { current: Locale }) {
  const pathname = usePathname();
  const rest = pathname.split("/").slice(2).join("/");

  return (
    <nav className="text-2xs fixed top-5 right-5 flex items-center gap-2 font-medium uppercase">
      {LOCALES.map((locale, index) => (
        <span key={locale} className="flex items-center gap-2">
          {index > 0 && (
            <span aria-hidden="true" className="text-muted-foreground">
              /
            </span>
          )}
          <Link
            href={rest ? `/${locale}/${rest}` : `/${locale}`}
            aria-current={locale === current ? "true" : undefined}
            className={
              locale === current
                ? "text-foreground"
                : "text-muted-foreground hover:text-foreground transition-colors"
            }
          >
            {locale.toUpperCase()}
          </Link>
        </span>
      ))}
    </nav>
  );
}
