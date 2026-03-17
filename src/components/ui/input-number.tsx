"use client";

import {
  forwardRef,
  useCallback,
  useRef,
  useState,
  type InputHTMLAttributes,
  type MouseEvent,
} from "react";
import { cn } from "@/lib/utils";
import type { SparkleSize } from "@/types/sparkle";

const sizeStyles: Record<SparkleSize, { root: string; text: string; icon: string }> = {
  sm: { root: "h-[32px]", text: "text-[length:var(--font-size-sp-1)] leading-[var(--lh-1)]", icon: "text-[14px]" },
  md: { root: "h-[40px]", text: "text-[length:var(--font-size-sp-2)] leading-[var(--lh-2)]", icon: "text-[16px]" },
  lg: { root: "h-[48px]", text: "text-[length:var(--font-size-sp-3)] leading-[var(--lh-3)]", icon: "text-[20px]" },
};

export interface InputNumberProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  size?: SparkleSize;
  isInvalid?: boolean;
  min?: number;
  max?: number;
  step?: number;
}

const InputNumber = forwardRef<HTMLInputElement, InputNumberProps>(
  (
    {
      className,
      size = "md",
      isInvalid = false,
      min,
      max,
      step = 1,
      value,
      defaultValue,
      onChange,
      disabled,
      ...props
    },
    ref
  ) => {
    const isControlled = value !== undefined;
    const [internalValue, setInternalValue] = useState<string>(
      defaultValue !== undefined ? String(defaultValue) : ""
    );

    const inputRef = useRef<HTMLInputElement | null>(null);

    const setRefs = useCallback(
      (node: HTMLInputElement | null) => {
        inputRef.current = node;
        if (typeof ref === "function") {
          ref(node);
        } else if (ref) {
          (ref as React.MutableRefObject<HTMLInputElement | null>).current =
            node;
        }
      },
      [ref]
    );

    const currentValue = isControlled ? String(value) : internalValue;

    const triggerChange = useCallback(
      (newValue: string) => {
        if (!isControlled) {
          setInternalValue(newValue);
        }
        if (onChange) {
          const nativeEvent = new Event("input", { bubbles: true });
          const input = inputRef.current;
          if (input) {
            const nativeSetter = Object.getOwnPropertyDescriptor(
              HTMLInputElement.prototype,
              "value"
            )?.set;
            nativeSetter?.call(input, newValue);
            input.dispatchEvent(nativeEvent);
          }
        }
      },
      [isControlled, onChange]
    );

    const stepValue = useCallback(
      (direction: 1 | -1, e: MouseEvent) => {
        e.preventDefault();
        if (disabled) return;

        const current = currentValue === "" ? 0 : parseFloat(currentValue);
        if (isNaN(current)) return;

        let next = current + direction * step;

        if (min !== undefined && next < min) next = min;
        if (max !== undefined && next > max) next = max;

        triggerChange(String(next));
      },
      [currentValue, step, min, max, disabled, triggerChange]
    );

    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!isControlled) {
          setInternalValue(e.target.value);
        }
        onChange?.(e);
      },
      [isControlled, onChange]
    );

    return (
      <div
        className={cn(
          "relative inline-flex w-full overflow-hidden",
          "bg-sp-white border border-solid",
          isInvalid ? "border-sp-negative-500" : "border-sp-neutral-500",
          "rounded-sp-action",
          "sparkle-focus-within-ring",
          disabled && "opacity-40 cursor-not-allowed",
          sizeStyles[size].root,
          className
        )}
      >
        <input
          ref={setRefs}
          type="number"
          aria-invalid={isInvalid || undefined}
          value={isControlled ? value : internalValue}
          onChange={handleInputChange}
          disabled={disabled}
          min={min}
          max={max}
          step={step}
          className={cn(
            "flex-1 min-w-0 bg-transparent border-none outline-none",
            "px-[var(--sp-12)] py-[var(--sp-4)]",
            "font-[family-name:var(--font-family-base)]",
            "text-sp-text-high",
            "placeholder:text-sp-text-placeholder",
            "disabled:cursor-not-allowed",
            sizeStyles[size].text,
            "[&::-webkit-inner-spin-button]:appearance-none",
            "[&::-webkit-outer-spin-button]:appearance-none",
            "[appearance:textfield]"
          )}
          {...props}
        />
        <div
          className={cn(
            "flex flex-col self-stretch overflow-hidden border-l border-solid",
            isInvalid ? "border-sp-negative-500" : "border-sp-neutral-500"
          )}
        >
          <button
            type="button"
            tabIndex={-1}
            aria-label="Increment"
            disabled={disabled}
            onMouseDown={(e) => stepValue(1, e)}
            className={cn(
              "flex flex-1 min-h-0 items-center justify-center",
              "px-[var(--sp-4)]",
              "text-sp-text-medium",
              "hover:bg-sp-neutral-100 active:bg-sp-neutral-200",
              "disabled:pointer-events-none",
              "rounded-tr-sp-action",
              "cursor-pointer select-none",
              "border-b border-solid",
              isInvalid ? "border-sp-negative-500" : "border-sp-neutral-500"
            )}
          >
            <span
              className={cn(
                "font-[family-name:var(--font-family-icon)]",
                "leading-none",
                sizeStyles[size].icon
              )}
            >
              expand_less
            </span>
          </button>
          <button
            type="button"
            tabIndex={-1}
            aria-label="Decrement"
            disabled={disabled}
            onMouseDown={(e) => stepValue(-1, e)}
            className={cn(
              "flex flex-1 min-h-0 items-center justify-center",
              "px-[var(--sp-4)]",
              "text-sp-text-medium",
              "hover:bg-sp-neutral-100 active:bg-sp-neutral-200",
              "disabled:pointer-events-none",
              "rounded-br-sp-action",
              "cursor-pointer select-none"
            )}
          >
            <span
              className={cn(
                "font-[family-name:var(--font-family-icon)]",
                "leading-none",
                sizeStyles[size].icon
              )}
            >
              expand_more
            </span>
          </button>
        </div>
      </div>
    );
  }
);

InputNumber.displayName = "InputNumber";

export { InputNumber };
