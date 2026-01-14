"use client";

import { cn } from "@/lib/utils";

type LoaderProps = {
  label?: string;
  vertical?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
};

export function Loader({
  label = "Loading…",
  vertical = false,
  size = "md",
  className = "",
}: LoaderProps) {
  const sizeMap = {
    sm: "h-4 w-4",
    md: "h-7 w-7",
    lg: "h-10 w-10",
  };

  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className={cn(
        "flex animate-fade-in items-center justify-center text-primary",
        vertical ? "flex-col gap-3" : "inline-flex gap-3",
        className
      )}
    >
      {/* Spinner */}
      <svg
        className={cn(
          sizeMap[size],
          "animate-spin-smooth drop-shadow-[0_0_6px_var(--primary-shadow)]"
        )}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <circle
          className="opacity-20"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
        />
        <path
          className="opacity-90"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v3.5a4.5 4.5 0 00-4.5 4.5H4z"
        />
      </svg>

      {label && (
        <span className="text-sm font-medium text-primary/90 animate-pulse">
          {label}
        </span>
      )}
    </div>
  );
}
