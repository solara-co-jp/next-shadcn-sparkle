"use client";

import { Slider as SliderPrimitive } from "@base-ui/react/slider";
import { cn } from "@/lib/utils";
import type { SparkleSize } from "@/types/sparkle";

const sizeStyles: Record<SparkleSize, { control: string; track: string; thumb: string }> = {
  sm: {
    control: "h-[16px]",
    track: "h-[4px]",
    thumb: "h-[16px] w-[16px]",
  },
  md: {
    control: "h-[20px]",
    track: "h-[6px]",
    thumb: "h-[20px] w-[20px]",
  },
  lg: {
    control: "h-[24px]",
    track: "h-[8px]",
    thumb: "h-[24px] w-[24px]",
  },
};

export interface SliderProps {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  size?: SparkleSize;
  disabled?: boolean;
  className?: string;
  "aria-label"?: string;
}

function Slider({
  value,
  defaultValue = 0,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  size = "md",
  disabled,
  className,
  "aria-label": ariaLabel,
}: SliderProps) {
  const styles = sizeStyles[size];

  return (
    <SliderPrimitive.Root
      value={value !== undefined ? [value] : undefined}
      defaultValue={[defaultValue]}
      onValueChange={(val) => {
        const v = Array.isArray(val) ? val[0] : val;
        onChange?.(v);
      }}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      aria-label={ariaLabel}
      className={cn("w-full", className)}
    >
      <SliderPrimitive.Control
        className={cn(
          "relative flex w-full touch-none items-center select-none",
          styles.control,
          disabled && "opacity-40 cursor-not-allowed"
        )}
      >
        <SliderPrimitive.Track className={cn("relative grow overflow-hidden rounded-full bg-sp-neutral-100", styles.track)}>
          <SliderPrimitive.Indicator className="bg-sp-primary-500 h-full" />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          className={cn(
            "block shrink-0 rounded-full",
            "bg-sp-white border-2 border-solid border-sp-primary-500",
            "shadow-sp-raise cursor-pointer",
            "sparkle-focus-ring",
            "data-disabled:cursor-not-allowed",
            styles.thumb
          )}
        />
      </SliderPrimitive.Control>
    </SliderPrimitive.Root>
  );
}

Slider.displayName = "Slider";

export { Slider };
