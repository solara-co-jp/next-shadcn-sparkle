"use client";

import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import { cn } from "@/lib/utils";
import type { SparkleSize } from "@/types/sparkle";

export interface SegmentedControlOption {
  value: string;
  label: string;
}

export interface SegmentedControlProps {
  options: SegmentedControlOption[];
  value: string;
  onChange: (value: string) => void;
  size?: SparkleSize;
  className?: string;
}

const sizeStyles: Record<SparkleSize, string> = {
  sm: "min-h-[28px] px-[var(--sp-8)] text-[length:var(--font-size-sp-1)] leading-[var(--lh-1)]",
  md: "min-h-[32px] px-[var(--sp-12)] text-[length:var(--font-size-sp-2)] leading-[var(--lh-2)]",
  lg: "min-h-[40px] px-[var(--sp-16)] text-[length:var(--font-size-sp-3)] leading-[var(--lh-3)]",
};

function SegmentedControl({
  options,
  value,
  onChange,
  size = "md",
  className,
}: SegmentedControlProps) {
  return (
    <RadioGroupPrimitive
      value={value}
      onValueChange={onChange as (value: unknown) => void}
      className={cn(
        "inline-flex items-center",
        "bg-sp-neutral-100 rounded-sp-action",
        "p-[var(--sp-2)]",
        className
      )}
    >
      {options.map((option) => (
        <RadioPrimitive.Root
          key={option.value}
          value={option.value}
          className={cn(
            "inline-flex items-center justify-center",
            "rounded-sp-action",
            "font-[family-name:var(--font-family-base)] font-bold",
            "cursor-pointer transition-all",
            "sparkle-focus-ring",
            sizeStyles[size],
            "bg-transparent text-sp-text-low hover:text-sp-text-middle",
            "data-checked:bg-sp-white data-checked:shadow-sp-raise data-checked:text-sp-text-high"
          )}
        >
          {option.label}
        </RadioPrimitive.Root>
      ))}
    </RadioGroupPrimitive>
  );
}

SegmentedControl.displayName = "SegmentedControl";

export { SegmentedControl };
