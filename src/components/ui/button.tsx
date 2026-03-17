"use client";

import { forwardRef, cloneElement, type ButtonHTMLAttributes, type ReactElement } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { SparkleTheme } from "@/types/sparkle";

type ButtonSize = "sm" | "md" | "lg" | "icon-xs" | "icon-sm" | "icon-md";
type ButtonVariant = "fill" | "outline" | "ghost";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center gap-[var(--sp-4)]",
    "rounded-sp-action",
    "font-bold font-[family-name:var(--font-family-base)]",
    "cursor-pointer transition-colors",
    "sparkle-focus-ring",
    "disabled:opacity-40 disabled:cursor-not-allowed",
  ],
  {
    variants: {
      theme: {
        neutral: "",
        primary: "",
        negative: "",
      },
      variant: {
        fill: "border shadow-sp-raise",
        outline: "border shadow-sp-raise bg-sp-white",
        ghost: "border border-transparent bg-transparent",
      },
      size: {
        sm: "min-h-[28px] min-w-[64px] px-[var(--sp-8)] py-[var(--sp-4)] text-[length:var(--font-size-sp-1)] leading-[var(--lh-1)]",
        md: "min-h-[32px] min-w-[80px] px-[var(--sp-12)] py-[var(--sp-4)] text-[length:var(--font-size-sp-2)] leading-[var(--lh-2)]",
        lg: "min-h-[40px] min-w-[96px] px-[var(--sp-16)] py-[var(--sp-8)] text-[length:var(--font-size-sp-3)] leading-[var(--lh-3)]",
        "icon-xs": "size-[24px] min-w-0 min-h-0 p-0",
        "icon-sm": "size-[28px] min-w-0 min-h-0 p-0",
        "icon-md": "size-[32px] min-w-0 min-h-0 p-0",
      },
    },
    compoundVariants: [
      // neutral × fill
      {
        theme: "neutral",
        variant: "fill",
        class:
          "bg-sp-neutral-500 border-sp-neutral-600 text-sp-white hover:bg-sp-neutral-600 active:bg-sp-neutral-700",
      },
      // neutral × outline
      {
        theme: "neutral",
        variant: "outline",
        class:
          "border-sp-neutral-200 text-sp-text-high hover:bg-sp-neutral-50 active:bg-sp-neutral-100",
      },
      // neutral × ghost
      {
        theme: "neutral",
        variant: "ghost",
        class:
          "text-sp-neutral-700 hover:bg-sp-neutral-50 active:bg-sp-neutral-100",
      },
      // primary × fill
      {
        theme: "primary",
        variant: "fill",
        class:
          "bg-sp-primary-500 border-sp-primary-600 text-sp-white hover:bg-sp-primary-600 active:bg-sp-primary-700",
      },
      // primary × outline
      {
        theme: "primary",
        variant: "outline",
        class:
          "border-sp-primary-500 text-sp-primary-500 hover:bg-sp-primary-50 active:bg-sp-primary-100",
      },
      // primary × ghost
      {
        theme: "primary",
        variant: "ghost",
        class:
          "text-sp-primary-500 hover:bg-sp-primary-50 active:bg-sp-primary-100",
      },
      // negative × fill
      {
        theme: "negative",
        variant: "fill",
        class:
          "bg-sp-negative-500 border-sp-negative-600 text-sp-white hover:bg-sp-negative-600 active:bg-sp-negative-700",
      },
      // negative × outline
      {
        theme: "negative",
        variant: "outline",
        class:
          "border-sp-negative-500 text-sp-negative-500 hover:bg-sp-negative-50 active:bg-sp-negative-100",
      },
      // negative × ghost
      {
        theme: "negative",
        variant: "ghost",
        class:
          "text-sp-negative-500 hover:bg-sp-negative-50 active:bg-sp-negative-100",
      },
    ],
    defaultVariants: {
      theme: "primary",
      variant: "fill",
      size: "md",
    },
  }
);

/* Inline CSS spinner for loading state */
function Spinner({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-block h-[1em] w-[1em] animate-spin rounded-full border-2 border-current border-r-transparent",
        className
      )}
      role="status"
      aria-label="Loading"
    />
  );
}

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "size"> {
  theme?: SparkleTheme;
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  /** Render as a different element (polymorphic) */
  render?: ReactElement;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      theme = "primary",
      variant = "fill",
      size = "md",
      isLoading = false,
      disabled,
      children,
      className,
      render,
      ...props
    },
    ref
  ) => {
    const combinedClassName = cn(buttonVariants({ theme, variant, size }), className);
    const content = isLoading ? <Spinner /> : children;

    if (render) {
      return cloneElement(render, {
        ref,
        className: combinedClassName,
        disabled: disabled || isLoading,
        ...props,
        children: content,
      } as Record<string, unknown>);
    }

    return (
      <button
        ref={ref}
        className={combinedClassName}
        disabled={disabled || isLoading}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
