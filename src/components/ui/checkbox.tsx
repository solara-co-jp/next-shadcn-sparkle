"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { cn } from "@/lib/utils";
import type { SparkleSize } from "@/types/sparkle";

const sizeStyles: Record<
  SparkleSize,
  { box: string; icon: string; label: string }
> = {
  sm: {
    box: "h-[16px] w-[16px]",
    icon: "text-[12px]",
    label: "text-[length:var(--font-size-sp-1)] leading-[var(--lh-1)]",
  },
  md: {
    box: "h-[20px] w-[20px]",
    icon: "text-[16px]",
    label: "text-[length:var(--font-size-sp-2)] leading-[var(--lh-2)]",
  },
  lg: {
    box: "h-[24px] w-[24px]",
    icon: "text-[20px]",
    label: "text-[length:var(--font-size-sp-3)] leading-[var(--lh-3)]",
  },
};

export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  size?: SparkleSize;
  disabled?: boolean;
  isInvalid?: boolean;
  indeterminate?: boolean;
  name?: string;
  className?: string;
}

function Checkbox({
  checked,
  defaultChecked,
  onCheckedChange,
  label,
  size = "md",
  disabled,
  isInvalid = false,
  indeterminate = false,
  name,
  className,
}: CheckboxProps) {
  const styles = sizeStyles[size];

  return (
    <label
      className={cn(
        "inline-flex items-center gap-[var(--sp-8)] cursor-pointer",
        disabled && "opacity-40 cursor-not-allowed",
        className
      )}
    >
      <CheckboxPrimitive.Root
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        indeterminate={indeterminate}
        name={name}
        className={cn(
          "relative inline-flex items-center justify-center shrink-0 overflow-hidden",
          "border-2 border-solid rounded-sp-notice",
          "transition-colors",
          "sparkle-focus-ring",
          styles.box,
          isInvalid
            ? [
                "border-sp-negative-500",
                "data-checked:bg-sp-negative-500",
                "data-indeterminate:bg-sp-negative-500",
              ]
            : [
                "border-sp-neutral-500",
                "data-checked:border-sp-primary-500",
                "data-indeterminate:border-sp-primary-500",
                "data-checked:bg-sp-primary-500",
                "data-indeterminate:bg-sp-primary-500",
              ],
          "bg-sp-white"
        )}
      >
        <CheckboxPrimitive.Indicator
          className={cn(
            "font-[family-name:var(--font-family-icon)]",
            "select-none text-sp-white",
            "absolute inset-0 flex items-center justify-center",
            styles.icon
          )}
        >
          {indeterminate ? "remove" : "check"}
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label && (
        <span
          className={cn(
            "font-[family-name:var(--font-family-base)] text-sp-text-high",
            styles.label
          )}
        >
          {label}
        </span>
      )}
    </label>
  );
}

Checkbox.displayName = "Checkbox";

export { Checkbox };
