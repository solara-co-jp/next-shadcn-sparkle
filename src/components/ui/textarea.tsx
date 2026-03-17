"use client";

import { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { SparkleSize } from "@/types/sparkle";

const sizeStyles: Record<SparkleSize, string> = {
  sm: "text-[length:var(--font-size-sp-1)] leading-[var(--lh-1)]",
  md: "text-[length:var(--font-size-sp-2)] leading-[var(--lh-2)]",
  lg: "text-[length:var(--font-size-sp-3)] leading-[var(--lh-3)]",
};

export interface TextareaProps
  extends Omit<React.ComponentProps<"textarea">, "size"> {
  size?: SparkleSize;
  isInvalid?: boolean;
  showCounter?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      size = "md",
      isInvalid = false,
      showCounter = true,
      maxLength,
      value,
      defaultValue,
      onChange,
      className,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = useState(
      (defaultValue as string) ?? ""
    );
    const currentValue = value !== undefined ? String(value) : internalValue;
    const hasCounter = showCounter && maxLength !== undefined;

    return (
      <div
        className={cn(
          "relative w-full",
          "bg-sp-white border border-solid",
          isInvalid ? "border-sp-negative-500" : "border-sp-neutral-500",
          "rounded-sp-action",
          "sparkle-focus-within-ring",
          "has-[:disabled]:opacity-40 has-[:disabled]:cursor-not-allowed"
        )}
      >
        <textarea
          ref={ref}
          data-slot="textarea"
          aria-invalid={isInvalid || undefined}
          value={value}
          defaultValue={value !== undefined ? undefined : defaultValue}
          maxLength={maxLength}
          onChange={(e) => {
            if (value === undefined) {
              setInternalValue(e.target.value);
            }
            onChange?.(e);
          }}
          className={cn(
            "w-full min-h-[80px]",
            "bg-transparent border-none",
            "px-[var(--sp-12)] py-[var(--sp-8)]",
            "font-[family-name:var(--font-family-base)]",
            "text-sp-text-high",
            "placeholder:text-sp-text-placeholder",
            "outline-none resize-y",
            "disabled:cursor-not-allowed",
            hasCounter && "pb-[var(--sp-24)]",
            sizeStyles[size],
            className
          )}
          {...props}
        />
        {hasCounter && (
          <span
            className={cn(
              "absolute bottom-[var(--sp-8)] right-[var(--sp-12)]",
              "text-[length:var(--font-size-sp-1)] leading-[var(--lh-1)]",
              "font-[family-name:var(--font-family-base)]",
              "text-sp-text-low",
              "pointer-events-none select-none"
            )}
          >
            {currentValue.length}/{maxLength}
          </span>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export { Textarea };
