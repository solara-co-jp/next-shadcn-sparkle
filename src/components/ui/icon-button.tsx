"use client";

import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import type { SparkleSize } from "@/types/sparkle";

const sizeStyles: Record<SparkleSize, { button: string; icon: string }> = {
  sm: {
    button: "min-h-[24px] min-w-[24px] p-[var(--sp-4)]",
    icon: "text-[16px]",
  },
  md: {
    button: "min-h-[32px] min-w-[32px] p-[var(--sp-6)]",
    icon: "text-[20px]",
  },
  lg: {
    button: "min-h-[40px] min-w-[40px] p-[var(--sp-8)]",
    icon: "text-[24px]",
  },
};

export interface IconButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size"> {
  /** Material Symbols icon name or ReactNode */
  icon: React.ReactNode;
  size?: SparkleSize;
  /** Accessible label (required for icon-only buttons) */
  label: string;
}

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, size = "md", label, className, ...props }, ref) => {
    const styles = sizeStyles[size];

    const isStringIcon = typeof icon === "string";

    return (
      <button
        ref={ref}
        aria-label={label}
        className={cn(
          "inline-flex items-center justify-center",
          "rounded-sp-action",
          "text-sp-neutral-700",
          "hover:bg-sp-neutral-50",
          "cursor-pointer transition-colors",
          "sparkle-focus-ring",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          styles.button,
          className
        )}
        {...props}
      >
        {isStringIcon ? (
          <span
            className={cn(
              "font-[family-name:var(--font-family-icon)]",
              "leading-none select-none",
              styles.icon
            )}
          >
            {icon}
          </span>
        ) : (
          icon
        )}
      </button>
    );
  }
);

IconButton.displayName = "IconButton";

export { IconButton };
