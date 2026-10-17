import type { ReactNode } from "react";

export function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center gap-3 py-2 ${className}`} aria-hidden>
      <svg viewBox="0 0 320 40" className="h-8 w-full max-w-sm" fill="none">
        <defs>
          <linearGradient id="g-div" x1="0" x2="1">
            <stop offset="0" stopColor="var(--highlight)" stopOpacity="0" />
            <stop offset="0.3" stopColor="var(--highlight)" />
            <stop offset="0.5" stopColor="var(--accent-soft)" />
            <stop offset="0.7" stopColor="var(--highlight)" />
            <stop offset="1" stopColor="var(--highlight)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M0 20 H120 M200 20 H320" stroke="url(#g-div)" strokeWidth="1.2" />
        <path d="M120 20 c10 -10 20 -10 26 0 c-6 10 -16 10 -26 0z M200 20 c-10 -10 -20 -10 -26 0 c6 10 16 10 26 0z" fill="var(--highlight)" opacity="0.8" />
        <path d="M160 4 c8 8 8 24 0 32 c-8 -8 -8 -24 0 -32z" fill="var(--accent)" />
        <path d="M160 9 c4 5 4 17 0 22 c-4 -5 -4 -17 0 -22z" fill="var(--accent-soft)" />
        <circle cx="108" cy="20" r="2" fill="var(--highlight)" />
        <circle cx="212" cy="20" r="2" fill="var(--highlight)" />
        <path d="M140 20 h-4 M180 20 h4" stroke="var(--highlight)" />
      </svg>
    </div>
  );
}

function Corner({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 80 80" className={`pointer-events-none absolute h-14 w-14 sm:h-20 sm:w-20 ${className}`} fill="none" aria-hidden>
      <path d="M4 76 V20 Q4 4 20 4 H76" stroke="var(--highlight)" strokeWidth="1.5" />
      <path d="M12 76 V26 Q12 12 26 12 H76" stroke="var(--highlight)" strokeWidth="0.8" opacity="0.7" />
      <path d="M20 20 c10 0 18 6 18 16 c-10 0 -18 -6 -18 -16z" fill="var(--accent-soft)" opacity="0.85" />
      <path d="M20 20 c0 10 6 18 16 18" stroke="var(--accent)" strokeWidth="1" />
      <circle cx="20" cy="20" r="3" fill="var(--accent)" />
      <path d="M44 8 q6 4 0 8 M8 44 q4 6 8 0" stroke="var(--highlight)" strokeWidth="1" />
    </svg>
  );
}

export function Frame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`framed px-6 py-12 sm:px-12 sm:py-16 ${className}`}>
      <Corner className="left-1 top-1" />
      <Corner className="right-1 top-1 -scale-x-100" />
      <Corner className="bottom-1 left-1 -scale-y-100" />
      <Corner className="bottom-1 right-1 -scale-100" />
      {children}
    </div>
  );
}

export function Heading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-8 text-center">
      <p className="label-caps text-accent">{eyebrow}</p>
      <h2 className="mt-3 font-display text-4xl font-medium italic text-foreground sm:text-5xl">{title}</h2>
      <div className="mx-auto mt-4 h-px w-24" style={{ background: "var(--gold-gradient)" }} />
    </div>
  );
}
