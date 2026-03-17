"use client";

import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { cn } from "@/lib/utils";
import type { SparkleSize } from "@/types/sparkle";

const sizeStyles: Record<SparkleSize, { outer: string; inner: string; label: string }> = {
  sm: {
    outer: "h-[16px] w-[16px]",
    inner: "h-[8px] w-[8px]",
    label: "text-[length:var(--font-size-sp-1)] leading-[var(--lh-1)]",
  },
  md: {
    outer: "h-[20px] w-[20px]",
    inner: "h-[10px] w-[10px]",
    label: "text-[length:var(--font-size-sp-2)] leading-[var(--lh-2)]",
  },
  lg: {
    outer: "h-[24px] w-[24px]",
    inner: "h-[12px] w-[12px]",
    label: "text-[length:var(--font-size-sp-3)] leading-[var(--lh-3)]",
  },
};

export interface RadioOption {
  label: string;
  value: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name?: string;
  options: RadioOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  size?: SparkleSize;
  isInvalid?: boolean;
  disabled?: boolean;
  direction?: "horizontal" | "vertical";
  className?: string;
}

function RadioGroup({
  name,
  options,
  value,
  defaultValue,
  onChange,
  size = "md",
  isInvalid = false,
  disabled = false,
  direction = "vertical",
  className,
}: RadioGroupProps) {
  const styles = sizeStyles[size];

  return (
    <RadioGroupPrimitive
      name={name}
      value={value}
      defaultValue={defaultValue}
      onValueChange={onChange as ((value: unknown) => void) | undefined}
      disabled={disabled}
      className={cn(
        "flex",
        direction === "vertical"
          ? "flex-col gap-[var(--sp-12)]"
          : "flex-row gap-[var(--sp-16)]",
        className
      )}
    >
      {options.map((option) => (
        <label
          key={option.value}
          className={cn(
            "inline-flex items-center gap-[var(--sp-8)] cursor-pointer",
            (disabled || option.disabled) && "opacity-40 cursor-not-allowed"
          )}
        >
          <RadioPrimitive.Root
            value={option.value}
            disabled={option.disabled}
            className={cn(
              "inline-flex items-center justify-center shrink-0",
              "border-2 border-solid rounded-full",
              "transition-colors",
              "sparkle-focus-ring",
              isInvalid
                ? "border-sp-negative-500"
                : "border-sp-neutral-500 data-checked:border-sp-primary-500",
              "bg-sp-white",
              styles.outer
            )}
          >
            <RadioPrimitive.Indicator
              className={cn(
                "rounded-full",
                isInvalid ? "bg-sp-negative-500" : "bg-sp-primary-500",
                styles.inner
              )}
            />
          </RadioPrimitive.Root>
          <span
            className={cn(
              "font-[family-name:var(--font-family-base)] text-sp-text-high",
              styles.label
            )}
          >
            {option.label}
          </span>
        </label>
      ))}
    </RadioGroupPrimitive>
  );
}

RadioGroup.displayName = "RadioGroup";

export { RadioGroup };
