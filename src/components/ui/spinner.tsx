"use client";

import { cn } from "@/lib/utils";
import type { SparkleSize } from "@/types/sparkle";

interface SpinnerProps {
  size?: SparkleSize;
  className?: string;
}

const sizeStyles: Record<SparkleSize, string> = {
  sm: "w-[16px] h-[16px] border-2",
  md: "w-[24px] h-[24px] border-[3px]",
  lg: "w-[32px] h-[32px] border-4",
};

function Spinner({ size = "md", className }: SpinnerProps) {
  return (
    <span
      data-slot="spinner"
      className={cn(
        "inline-block rounded-full animate-spin",
        "border-sp-neutral-200 border-t-sp-primary-500",
        sizeStyles[size],
        className
      )}
      role="status"
      aria-label="Loading"
    />
  );
}

export { Spinner };
export type { SpinnerProps };
