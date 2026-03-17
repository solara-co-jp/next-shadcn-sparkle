"use client";

import { forwardRef, useState, type InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";
import type { SparkleSize } from "@/types/sparkle";

export interface InputSearchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  size?: SparkleSize;
  isInvalid?: boolean;
  /** Show the condition trigger (tune icon) button on the right */
  showConditionTrigger?: boolean;
  /** Callback when the condition trigger button is clicked */
  onConditionTrigger?: () => void;
  /** Callback when the clear button is clicked */
  onClear?: () => void;
}

/** IconButton size styles (fixed dimensions to prevent line-height inflation) */
const iconBtnSize: Record<SparkleSize, { btn: string; icon: string }> = {
  sm: { btn: "h-[24px] w-[24px] shrink-0", icon: "text-[16px]" },
  md: { btn: "h-[32px] w-[32px] shrink-0", icon: "text-[20px]" },
  lg: { btn: "h-[40px] w-[40px] shrink-0", icon: "text-[24px]" },
};

const sizeConfig: Record<
  SparkleSize,
  { root: string; text: string; searchIcon: string }
> = {
  sm: {
    root: "min-h-[32px]",
    text: "text-[length:var(--font-size-sp-1)] leading-[var(--lh-1)]",
    searchIcon: "text-[16px]",
  },
  md: {
    root: "min-h-[40px]",
    text: "text-[length:var(--font-size-sp-3)] leading-[var(--lh-3)]",
    searchIcon: "text-[20px]",
  },
  lg: {
    root: "min-h-[48px]",
    text: "text-[length:var(--font-size-sp-3)] leading-[var(--lh-3)]",
    searchIcon: "text-[24px]",
  },
};

const InputSearch = forwardRef<HTMLInputElement, InputSearchProps>(
  (
    {
      className,
      size = "md",
      isInvalid = false,
      showConditionTrigger = true,
      onConditionTrigger,
      onClear,
      value,
      defaultValue,
      onChange,
      ...props
    },
    ref
  ) => {
    const config = sizeConfig[size];
    const ib = iconBtnSize[size];
    const [internalValue, setInternalValue] = useState(defaultValue ?? "");
    const isControlled = value !== undefined;
    const currentValue = isControlled ? value : internalValue;
    const hasValue = String(currentValue).length > 0;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!isControlled) {
        setInternalValue(e.target.value);
      }
      onChange?.(e);
    };

    const handleClear = () => {
      if (!isControlled) {
        setInternalValue("");
      }
      onClear?.();
    };

    return (
      <div
        className={cn(
          "flex items-center",
          "px-[var(--sp-4)]",
          "bg-sp-white border border-solid",
          isInvalid ? "border-sp-negative-500" : "border-sp-neutral-500",
          "rounded-sp-action",
          config.root,
          "focus-within:ring-2 focus-within:ring-sp-ring-normal focus-within:ring-offset-[-1px]",
          "has-[:disabled]:opacity-40 has-[:disabled]:cursor-not-allowed",
          className
        )}
      >
        {/* Field area */}
        <div className="flex flex-1 items-center gap-[var(--sp-6)] pl-[var(--sp-6)] pr-[var(--sp-8)] min-w-0">
          <span
            className={cn(
              "font-[family-name:var(--font-family-icon)]",
              config.searchIcon,
              "leading-none select-none shrink-0",
              "text-sp-neutral-500"
            )}
          >
            search
          </span>
          <input
            ref={ref}
            type="search"
            value={currentValue}
            onChange={handleChange}
            className={cn(
              "flex-1 min-w-0",
              "bg-transparent border-none outline-none",
              config.text,
              "font-[family-name:var(--font-family-base)]",
              "text-sp-text-high tracking-[0.8px]",
              "placeholder:text-sp-text-placeholder",
              "disabled:cursor-not-allowed",
              "[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
            )}
            {...props}
          />
        </div>
        {/* Controller area */}
        <div className="flex items-center gap-[2px] shrink-0">
          {hasValue && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="クリア"
              className={cn(
                "inline-flex items-center justify-center",
                ib.btn,
                "rounded-sp-action",
                "text-sp-neutral-700",
                "hover:bg-sp-neutral-50",
                "cursor-pointer transition-colors",
                "sparkle-focus-ring"
              )}
            >
              <span
                className={cn(
                  "font-[family-name:var(--font-family-icon)]",
                  ib.icon,
                  "leading-none select-none"
                )}
              >
                cancel
              </span>
            </button>
          )}
          {showConditionTrigger && (
            <button
              type="button"
              onClick={onConditionTrigger}
              aria-label="検索条件"
              className={cn(
                "inline-flex items-center justify-center",
                ib.btn,
                "rounded-sp-action",
                "text-sp-neutral-700",
                "hover:bg-sp-neutral-50",
                "cursor-pointer transition-colors",
                "sparkle-focus-ring"
              )}
            >
              <span
                className={cn(
                  "font-[family-name:var(--font-family-icon)]",
                  ib.icon,
                  "leading-none select-none"
                )}
              >
                tune
              </span>
            </button>
          )}
        </div>
      </div>
    );
  }
);

InputSearch.displayName = "InputSearch";

export { InputSearch };
