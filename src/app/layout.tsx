import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";

// latin-ext jest wymagany: bez niego polskie znaki diakrytyczne spadaja na font
// zastepczy i tekst rozjezdza sie w pionie. Patrz context/architecture-context.md.
const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Verso — Compare the incomparable",
  description:
    "A game of higher or lower across unrelated things. Two objects, one unit, one guess.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} h-full font-sans antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
