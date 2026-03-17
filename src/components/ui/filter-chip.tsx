"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export type FilterChipSize = "sm" | "md" | "lg";

export interface FilterChipProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  label: string;
  selected?: boolean;
  size?: FilterChipSize;
  isDropdown?: boolean;
}

const sizeStyles: Record<
  FilterChipSize,
  { root: string; text: string; iconSize: string; iconBox: string }
> = {
  sm: {
    root: "min-h-[32px] px-[var(--sp-8)] py-[var(--sp-4)] text-[length:var(--font-size-sp-2)] leading-[var(--lh-2)]",
    text: "",
    iconSize: "text-[20px]",
    iconBox: "size-[20px]",
  },
  md: {
    root: "min-h-[40px] p-[var(--sp-8)] text-[length:var(--font-size-sp-3)] leading-[var(--lh-3)]",
    text: "",
    iconSize: "text-[24px]",
    iconBox: "size-[24px]",
  },
  lg: {
    root: "min-h-[48px] px-[var(--sp-12)] py-[var(--sp-8)] text-[length:var(--font-size-sp-4)] leading-[var(--lh-4)]",
    text: "",
    iconSize: "text-[28px]",
    iconBox: "size-[28px]",
  },
};

const FilterChip = forwardRef<HTMLButtonElement, FilterChipProps>(
  (
    {
      label,
      selected = false,
      size = "md",
      isDropdown = false,
      disabled,
      className,
      ...props
    },
    ref
  ) => {
    const s = sizeStyles[size];

    return (
      <button
        ref={ref}
        type="button"
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center",
          "min-w-[80px] rounded-sp-action border border-solid",
          "font-[family-name:var(--font-family-base)]",
          "cursor-pointer transition-colors",
          "sparkle-focus-ring",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          s.root,
          selected
            ? "bg-sp-primary-100 border-sp-primary-200 text-sp-text-middle hover:bg-sp-primary-200"
            : "bg-sp-neutral-50 border-sp-neutral-200 text-sp-text-middle hover:bg-sp-neutral-100",
          className
        )}
        {...props}
      >
        {selected && (
          <span
            className={cn(
              "inline-flex items-center justify-center shrink-0 overflow-hidden",
              "font-[family-name:var(--font-family-icon)] leading-none select-none",
              s.iconSize,
              s.iconBox
            )}
          >
            check
          </span>
        )}
        <span className={cn("px-[var(--sp-6)] text-center whitespace-nowrap")}>
          {label}
        </span>
        {isDropdown && (
          <span
            className={cn(
              "inline-flex items-center justify-center shrink-0 overflow-hidden",
              "font-[family-name:var(--font-family-icon)] leading-none select-none",
              s.iconSize,
              s.iconBox
            )}
          >
            arrow_drop_down
          </span>
        )}
      </button>
    );
  }
);

FilterChip.displayName = "FilterChip";

export { FilterChip };
