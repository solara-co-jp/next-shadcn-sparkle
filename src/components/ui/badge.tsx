"use client";

import { cn } from "@/lib/utils";

type BadgeVariant = "normal" | "emphasis";
type BadgeSize = "xs" | "sm" | "md" | "lg";

export interface BadgeProps {
  /** "normal" = blue (info/500), "emphasis" = red (negative/500) */
  variant?: BadgeVariant;
  /** xs=8px dot, sm=16px dot, md=24px with number, lg=32px with number */
  size?: BadgeSize;
  /** White border gap for overlay use (e.g. on avatars) */
  isGapped?: boolean;
  /** Number to display (only visible at md/lg) */
  count?: number;
  /** Maximum count before showing "max+" (default 99) */
  max?: number;
  className?: string;
}

const sizeStyles: Record<BadgeSize, string> = {
  xs: "size-[8px] min-w-[8px]",
  sm: "size-[16px] min-w-[16px]",
  md: "min-w-[24px] min-h-[24px] px-[var(--sp-4)] py-[var(--sp-2)]",
  lg: "min-w-[32px] min-h-[32px] px-[var(--sp-6)] py-[var(--sp-4)]",
};

const fontStyles: Record<BadgeSize, string> = {
  xs: "",
  sm: "",
  md: "text-[12px] leading-[20px] tracking-[0.6px]",
  lg: "text-[16px] leading-[24px] tracking-[0.8px]",
};

function Badge({
  variant = "normal",
  size = "md",
  isGapped = false,
  count,
  max = 99,
  className,
}: BadgeProps) {
  const showNumber = (size === "md" || size === "lg") && count !== undefined;
  const displayValue =
    showNumber && count! > max ? `${max}+` : count;

  return (
    <span
      data-slot="badge"
      className={cn(
        "inline-flex items-center justify-center",
        "rounded-full",
        "font-bold font-[family-name:var(--font-family-mono)]",
        "text-sp-white text-center whitespace-nowrap",
        variant === "normal" ? "bg-sp-info-500" : "bg-sp-negative-500",
        sizeStyles[size],
        showNumber && fontStyles[size],
        isGapped && "shadow-[0_0_0_4px_white]",
        className
      )}
    >
      {showNumber ? displayValue : null}
    </span>
  );
}

Badge.displayName = "Badge";

export { Badge };
