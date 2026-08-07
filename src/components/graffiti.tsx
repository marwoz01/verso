type MarkProps = {
  className?: string;
};

export function Underline({ className }: MarkProps) {
  return (
    <svg
      viewBox="0 0 240 24"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M6 11c38-6 84-8 132-7 34 1 68 3 96 8"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M18 19c44-5 96-6 148-4 26 1 50 2 68 4"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}

export function ArrowUp({ className }: MarkProps) {
  return (
    <svg
      viewBox="0 0 64 72"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M31 68C29 50 29 32 31 8"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
      />
      <path
        d="M12 27C18 20 25 13 31 7c6 7 12 13 19 20"
        stroke="currentColor"
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function Circle({ className }: MarkProps) {
  return (
    <svg
      viewBox="0 0 300 104"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M172 12C104 6 26 20 16 48c-9 26 60 46 132 44 66-2 138-18 138-44 0-24-62-38-124-38-22 0-44 3-62 8"
        stroke="currentColor"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function Burst({ className }: MarkProps) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M20 4v11M6 12l8 6M34 12l-8 6"
        stroke="currentColor"
        strokeWidth="4"
        strokeLinecap="round"
      />
    </svg>
  );
}
