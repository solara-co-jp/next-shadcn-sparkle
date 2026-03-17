"use client";

import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { SparkleStatus, SparkleSize } from "@/types/sparkle";

type TagStatus = SparkleStatus | "neutral";
type TagVariant = "solid" | "outline" | "subtle";

const tagVariants = cva(
  [
    "inline-flex items-center justify-center",
    "border border-solid",
    "rounded-sp-notice",
    "font-bold font-[family-name:var(--font-family-base)]",
    "text-center whitespace-nowrap",
  ],
  {
    variants: {
      status: {
        neutral: "",
        info: "",
        success: "",
        warning: "",
        negative: "",
      },
      variant: {
        solid: "",
        outline: "bg-sp-white",
        subtle: "border-transparent",
      },
      size: {
        sm: "min-w-[40px] px-[var(--sp-8)] text-[length:var(--font-size-sp-1)] leading-[var(--lh-1)]",
        md: "min-w-[48px] px-[var(--sp-8)] py-[var(--sp-2)] text-[length:var(--font-size-sp-2)] leading-[var(--lh-2)]",
        lg: "min-w-[56px] px-[var(--sp-8)] py-[var(--sp-4)] text-[length:var(--font-size-sp-2)] leading-[var(--lh-2)]",
      },
    },
    compoundVariants: [
      // neutral
      { status: "neutral", variant: "solid", class: "bg-sp-neutral-500 border-sp-neutral-600 text-sp-white" },
      { status: "neutral", variant: "outline", class: "border-sp-neutral-500 text-sp-neutral-600" },
      { status: "neutral", variant: "subtle", class: "bg-sp-neutral-100 text-sp-neutral-600" },
      // info
      { status: "info", variant: "solid", class: "bg-sp-info-500 border-sp-info-600 text-sp-white" },
      { status: "info", variant: "outline", class: "border-sp-info-500 text-sp-info-500" },
      { status: "info", variant: "subtle", class: "bg-sp-info-50 text-sp-info-600" },
      // success
      { status: "success", variant: "solid", class: "bg-sp-success-500 border-sp-success-600 text-sp-white" },
      { status: "success", variant: "outline", class: "border-sp-success-500 text-sp-success-500" },
      { status: "success", variant: "subtle", class: "bg-sp-success-100 text-sp-success-600" },
      // warning
      { status: "warning", variant: "solid", class: "bg-sp-warning-500 border-sp-warning-600 text-sp-white" },
      { status: "warning", variant: "outline", class: "border-sp-warning-500 text-sp-warning-500" },
      { status: "warning", variant: "subtle", class: "bg-sp-warning-100 text-sp-warning-600" },
      // negative
      { status: "negative", variant: "solid", class: "bg-sp-negative-500 border-sp-negative-600 text-sp-white" },
      { status: "negative", variant: "outline", class: "border-sp-negative-500 text-sp-negative-500" },
      { status: "negative", variant: "subtle", class: "bg-sp-negative-100 text-sp-negative-600" },
    ],
    defaultVariants: {
      status: "neutral",
      variant: "subtle",
      size: "md",
    },
  }
);

export interface TagProps {
  status?: TagStatus;
  variant?: TagVariant;
  size?: SparkleSize;
  children: React.ReactNode;
  onRemove?: () => void;
  className?: string;
}

function Tag({
  status = "neutral",
  variant = "subtle",
  size = "md",
  children,
  onRemove,
  className,
}: TagProps) {
  return (
    <span
      className={cn(
        tagVariants({ status, variant, size }),
        onRemove && "gap-[var(--sp-4)] pr-[var(--sp-4)]",
        className
      )}
    >
      {children}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className={cn(
            "inline-flex items-center justify-center",
            "w-[16px] h-[16px] rounded-full",
            "cursor-pointer transition-colors",
            "hover:bg-black/10",
            "sparkle-focus-ring",
            "font-[family-name:var(--font-family-icon)]",
            "text-[14px] leading-none select-none"
          )}
          aria-label="Remove"
        >
          close
        </button>
      )}
    </span>
  );
}

Tag.displayName = "Tag";

export { Tag, tagVariants };
