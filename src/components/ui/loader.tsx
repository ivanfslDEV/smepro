// components/ui/loader.tsx
"use client";

type LoaderProps = {
  label?: string;
  className?: string;
};

export function Loader({ label = "Loading…", className = "" }: LoaderProps) {
  return (
    <div
      className={`inline-flex items-center gap-2 text-muted-foreground ${className}`}
      role="status"
      aria-live="polite"
      aria-busy="true"
    >
      <svg
        className="h-5 w-5 animate-spin"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        />
      </svg>
      <span className="text-sm">{label}</span>
    </div>
  );
}
