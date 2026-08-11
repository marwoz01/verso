"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useContext, useRef, type ReactNode } from "react";

gsap.registerPlugin(useGSAP);

const COLUMNS = 7;
const SWEEP = 0.5;
const STAGGER = 0.05;

type ScreenTransition = {
  navigate: (href: string) => void;
  sweep: (action: () => void) => void;
};

const TransitionContext = createContext<ScreenTransition>({
  navigate: () => {},
  sweep: (action) => action(),
});

export function useScreenTransition(): ScreenTransition {
  return useContext(TransitionContext);
}

export function TransitionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const columns = useRef<HTMLDivElement>(null);
  const arriving = useRef(false);
  const busy = useRef(false);

  function cover(onDone: () => void) {
    if (!columns.current) return;

    gsap.set(columns.current, { autoAlpha: 1 });
    gsap.fromTo(
      columns.current.children,
      { transformOrigin: "bottom", scaleY: 0 },
      {
        scaleY: 1,
        duration: SWEEP,
        ease: "power3.inOut",
        stagger: { each: STAGGER, from: "center" },
        onComplete: onDone,
      },
    );
  }

  function reveal() {
    if (!columns.current) return;

    gsap.set(columns.current, { autoAlpha: 1 });
    gsap.fromTo(
      columns.current.children,
      { transformOrigin: "top", scaleY: 1 },
      {
        scaleY: 0,
        duration: SWEEP,
        ease: "power3.inOut",
        stagger: { each: STAGGER, from: "center" },
        onComplete: () => {
          busy.current = false;
          gsap.set(columns.current, { autoAlpha: 0 });
        },
      },
    );
  }

  useGSAP(
    () => {
      if (!arriving.current) return;

      arriving.current = false;
      reveal();
    },
    { dependencies: [pathname] },
  );

  function navigate(href: string) {
    if (busy.current) return;

    busy.current = true;
    arriving.current = true;
    cover(() => router.push(href));
  }

  function sweep(action: () => void) {
    if (busy.current) return;

    busy.current = true;
    cover(() => {
      action();
      reveal();
    });
  }

  return (
    <TransitionContext.Provider value={{ navigate, sweep }}>
      {children}

      <div
        ref={columns}
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-50 flex opacity-0"
      >
        {Array.from({ length: COLUMNS }, (_, column) => (
          <div key={column} className="bg-marker h-full flex-1" />
        ))}
      </div>
    </TransitionContext.Provider>
  );
}

export function TransitionLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const { navigate } = useScreenTransition();

  return (
    <Link
      href={href}
      className={className}
      onClick={(event) => {
        event.preventDefault();
        navigate(href);
      }}
    >
      {children}
    </Link>
  );
}
