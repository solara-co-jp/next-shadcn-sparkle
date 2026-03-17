"use client";

import * as React from "react";
import { forwardRef } from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";
import { cn } from "@/lib/utils";
import type { SparkleSize } from "@/types/sparkle";

const sizeStyles: Record<SparkleSize, string> = {
  sm: "min-h-[32px] text-[length:var(--font-size-sp-1)] leading-[var(--lh-1)]",
  md: "min-h-[40px] text-[length:var(--font-size-sp-2)] leading-[var(--lh-2)]",
  lg: "min-h-[48px] text-[length:var(--font-size-sp-3)] leading-[var(--lh-3)]",
};

export interface InputProps
  extends Omit<React.ComponentProps<"input">, "size"> {
  size?: SparkleSize;
  isInvalid?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ size = "md", isInvalid = false, className, ...props }, ref) => {
    return (
      <InputPrimitive
        ref={ref}
        data-slot="input"
        aria-invalid={isInvalid || undefined}
        className={cn(
          "w-full",
          "bg-sp-white border border-solid",
          isInvalid ? "border-sp-negative-500" : "border-sp-neutral-500",
          "rounded-sp-action",
          "px-[var(--sp-12)] py-[var(--sp-4)]",
          "font-[family-name:var(--font-family-base)]",
          "text-sp-text-high",
          "placeholder:text-sp-text-placeholder",
          "sparkle-focus-ring outline-none",
          "disabled:opacity-40 disabled:cursor-not-allowed",
          sizeStyles[size],
          className
        )}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";

export { Input };
