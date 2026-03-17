"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { cn } from "@/lib/utils";
import type { SparkleSize } from "@/types/sparkle";

const sizeStyles: Record<SparkleSize, { track: string; thumb: string; label: string }> = {
  sm: {
    track: "w-[32px] h-[16px]",
    thumb: "h-[12px] w-[12px]",
    label: "text-[length:var(--font-size-sp-1)] leading-[var(--lh-1)]",
  },
  md: {
    track: "w-[40px] h-[20px]",
    thumb: "h-[16px] w-[16px]",
    label: "text-[length:var(--font-size-sp-2)] leading-[var(--lh-2)]",
  },
  lg: {
    track: "w-[48px] h-[24px]",
    thumb: "h-[20px] w-[20px]",
    label: "text-[length:var(--font-size-sp-3)] leading-[var(--lh-3)]",
  },
};

export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  size?: SparkleSize;
  disabled?: boolean;
  name?: string;
  className?: string;
}

function Switch({
  checked,
  defaultChecked = false,
  onCheckedChange,
  label,
  size = "md",
  disabled,
  name,
  className,
}: SwitchProps) {
  const styles = sizeStyles[size];

  return (
    <label
      className={cn(
        "inline-flex items-center gap-[var(--sp-8)] cursor-pointer",
        disabled && "opacity-40 cursor-not-allowed",
        className
      )}
    >
      <SwitchPrimitive.Root
        checked={checked}
        defaultChecked={defaultChecked}
        onCheckedChange={onCheckedChange}
        disabled={disabled}
        name={name}
        className={cn(
          "relative inline-flex items-center shrink-0",
          "rounded-full p-[2px]",
          "transition-colors cursor-pointer",
          "sparkle-focus-ring",
          "data-disabled:cursor-not-allowed",
          "bg-sp-neutral-300 data-checked:bg-sp-primary-500",
          styles.track
        )}
      >
        <SwitchPrimitive.Thumb
          className={cn(
            "bg-sp-white rounded-full shadow-sp-raise",
            "transition-transform",
            "translate-x-0",
            styles.thumb,
            size === "sm" && "data-checked:translate-x-[16px]",
            size === "md" && "data-checked:translate-x-[20px]",
            size === "lg" && "data-checked:translate-x-[24px]"
          )}
        />
      </SwitchPrimitive.Root>
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

Switch.displayName = "Switch";

export { Switch };
