"use client";

import { cn } from "@/lib/utils";
import type { SparkleSize } from "@/types/sparkle";

const sizeMap: Record<SparkleSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
};

export interface IconProps {
  name: string;
  size?: SparkleSize;
  filled?: boolean;
  color?: string;
  className?: string;
}

function Icon({
  name,
  size = "md",
  filled = false,
  color,
  className,
}: IconProps) {
  const resolvedSize = sizeMap[size];

  return (
    <span
      className={cn(
        "font-[family-name:var(--font-family-icon)]",
        "leading-none select-none inline-flex items-center justify-center",
        color,
        className
      )}
      style={{
        fontSize: `${resolvedSize}px`,
        width: `${resolvedSize}px`,
        height: `${resolvedSize}px`,
        fontVariationSettings: filled ? "'FILL' 1" : "'FILL' 0",
      }}
      aria-hidden="true"
    >
      {name}
    </span>
  );
}

Icon.displayName = "Icon";

export { Icon };
