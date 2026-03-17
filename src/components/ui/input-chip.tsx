"use client";

import { type KeyboardEvent, useState } from "react";
import { cn } from "@/lib/utils";

type InputChipSize = "md" | "lg";

const sizeStyles: Record<InputChipSize, { root: string; chip: string; input: string; closeIcon: string }> = {
  md: {
    root: "min-h-[40px]",
    chip: "px-[var(--sp-8)] py-[var(--sp-2)] text-[length:var(--font-size-sp-1)] leading-[var(--lh-1)]",
    input: "text-[length:var(--font-size-sp-2)] leading-[var(--lh-2)]",
    closeIcon: "text-[14px]",
  },
  lg: {
    root: "min-h-[48px]",
    chip: "px-[var(--sp-8)] py-[var(--sp-4)] text-[length:var(--font-size-sp-2)] leading-[var(--lh-2)]",
    input: "text-[length:var(--font-size-sp-3)] leading-[var(--lh-3)]",
    closeIcon: "text-[16px]",
  },
};

export interface InputChipProps {
  values: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  disabled?: boolean;
  isInvalid?: boolean;
  size?: InputChipSize;
  className?: string;
}

function InputChip({
  values,
  onChange,
  placeholder = "",
  disabled = false,
  isInvalid = false,
  size = "md",
  className,
}: InputChipProps) {
  const ss = sizeStyles[size];
  const [inputValue, setInputValue] = useState("");

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.nativeEvent.isComposing) return;
    if (e.key === "Enter" && inputValue.trim()) {
      e.preventDefault();
      if (!values.includes(inputValue.trim())) {
        onChange([...values, inputValue.trim()]);
      }
      setInputValue("");
    }
    if (e.key === "Backspace" && !inputValue && values.length > 0) {
      onChange(values.slice(0, -1));
    }
  }

  function handleRemove(index: number) {
    onChange(values.filter((_, i) => i !== index));
  }

  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-[var(--sp-4)]",
        "w-full", ss.root,
        "bg-sp-white border border-solid",
        isInvalid ? "border-sp-negative-500" : "border-sp-neutral-500",
        "rounded-sp-action",
        "px-[var(--sp-8)] py-[var(--sp-4)]",
        disabled && "opacity-40 cursor-not-allowed",
        className
      )}
    >
      {values.map((value, index) => (
        <span
          key={`${value}-${index}`}
          className={cn(
            "inline-flex items-center gap-[var(--sp-4)]",
            "bg-sp-neutral-100 rounded-full",
            ss.chip,
            "font-[family-name:var(--font-family-base)]",
            "text-sp-text-high"
          )}
        >
          {value}
          {!disabled && (
            <button
              type="button"
              onClick={() => handleRemove(index)}
              className={cn(
                "inline-flex items-center justify-center",
                "cursor-pointer text-sp-neutral-700",
                "hover:text-sp-text-high transition-colors"
              )}
              aria-label={`Remove ${value}`}
            >
              <span className={cn("font-[family-name:var(--font-family-icon)] leading-none select-none", ss.closeIcon)}>
                close
              </span>
            </button>
          )}
        </span>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder={values.length === 0 ? placeholder : ""}
        disabled={disabled}
        className={cn(
          "flex-1 min-w-[80px] border-none outline-none bg-transparent",
          ss.input,
          "font-[family-name:var(--font-family-base)]",
          "text-sp-text-high",
          "placeholder:text-sp-text-placeholder",
          "disabled:cursor-not-allowed"
        )}
      />
    </div>
  );
}

export { InputChip };
