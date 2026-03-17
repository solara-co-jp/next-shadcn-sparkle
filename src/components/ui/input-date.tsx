"use client";

import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import type { SparkleSize } from "@/types/sparkle";

/** IconButton size styles (fixed dimensions to prevent line-height inflation) */
const iconBtnSize: Record<SparkleSize, { btn: string; icon: string }> = {
  sm: { btn: "h-[24px] w-[24px] shrink-0", icon: "text-[16px]" },
  md: { btn: "h-[32px] w-[32px] shrink-0", icon: "text-[20px]" },
  lg: { btn: "h-[40px] w-[40px] shrink-0", icon: "text-[24px]" },
};

const sizeStyles: Record<SparkleSize, { root: string; text: string }> = {
  sm: { root: "min-h-[32px]", text: "text-[length:var(--font-size-sp-1)] leading-[var(--lh-1)]" },
  md: { root: "min-h-[40px]", text: "text-[length:var(--font-size-sp-2)] leading-[var(--lh-2)]" },
  lg: { root: "min-h-[48px]", text: "text-[length:var(--font-size-sp-3)] leading-[var(--lh-3)]" },
};

export interface InputDateProps {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  isInvalid?: boolean;
  disabled?: boolean;
  size?: SparkleSize;
  className?: string;
}

function formatDate(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}/${m}/${d}`;
}

/** Parse yyyy/mm/dd or yyyy-mm-dd */
function parseDate(str: string): Date | null {
  const match = str.match(/^(\d{4})[/-](\d{1,2})[/-](\d{1,2})$/);
  if (!match) return null;
  const [, ys, ms, ds] = match;
  const y = Number(ys);
  const m = Number(ms);
  const d = Number(ds);
  if (m < 1 || m > 12 || d < 1 || d > 31) return null;
  const date = new Date(y, m - 1, d);
  // Verify the date is valid (e.g. not Feb 30)
  if (
    date.getFullYear() !== y ||
    date.getMonth() !== m - 1 ||
    date.getDate() !== d
  )
    return null;
  return date;
}

function InputDate({
  value,
  onChange,
  placeholder = "年/月/日",
  isInvalid = false,
  disabled = false,
  size = "md",
  className,
}: InputDateProps) {
  const ss = sizeStyles[size];
  const [open, setOpen] = useState(false);
  const [inputText, setInputText] = useState(value ? formatDate(value) : "");
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync input text when value changes externally
  useEffect(() => {
    setInputText(value ? formatDate(value) : "");
  }, [value]);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  function handleCalendarSelect(date: Date) {
    onChange?.(date);
    setOpen(false);
    inputRef.current?.focus();
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const text = e.target.value;
    setInputText(text);

    if (text === "") {
      onChange?.(undefined);
      return;
    }

    const parsed = parseDate(text);
    if (parsed) {
      onChange?.(parsed);
    }
  }

  function handleInputBlur() {
    // On blur, re-sync the display text to the current value
    if (value) {
      setInputText(formatDate(value));
    } else {
      // If text wasn't valid, clear it
      const parsed = parseDate(inputText);
      if (!parsed) setInputText("");
    }
  }

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const parsed = parseDate(inputText);
      if (parsed) {
        onChange?.(parsed);
        setOpen(false);
      }
    }
    if (e.key === "ArrowDown" && !open) {
      e.preventDefault();
      setOpen(true);
    }
  }

  function handleClear() {
    onChange?.(undefined);
    setInputText("");
    inputRef.current?.focus();
  }

  function handleIconClick() {
    if (disabled) return;
    setOpen(!open);
  }

  const ib = iconBtnSize[size];

  return (
    <div ref={containerRef} className={cn("relative inline-block", className)}>
      <div
        className={cn(
          "w-full flex items-center",
          ss.root,
          "bg-sp-white border border-solid",
          isInvalid ? "border-sp-negative-500" : "border-sp-neutral-500",
          "rounded-sp-action",
          "pl-[var(--sp-12)] pr-[var(--sp-4)]",
          "font-[family-name:var(--font-family-base)]",
          "focus-within:ring-2 focus-within:ring-sp-ring-normal focus-within:ring-offset-[-1px]",
          disabled && "opacity-40 cursor-not-allowed"
        )}
      >
        <input
          ref={inputRef}
          type="text"
          value={inputText}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
          onKeyDown={handleInputKeyDown}
          onFocus={() => !disabled && setOpen(true)}
          placeholder={placeholder}
          disabled={disabled}
          className={cn(
            "flex-1 min-w-0 bg-transparent outline-none",
            ss.text,
            "font-[family-name:var(--font-family-base)]",
            "text-sp-text-high placeholder:text-sp-text-placeholder",
            "disabled:cursor-not-allowed"
          )}
        />
        <div className="flex items-center gap-[2px] shrink-0">
          {value && !disabled && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="日付をクリア"
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
              <span className={cn("font-[family-name:var(--font-family-icon)] leading-none select-none", ib.icon)}>
                close
              </span>
            </button>
          )}
          <button
            type="button"
            tabIndex={-1}
            onClick={handleIconClick}
            disabled={disabled}
            aria-label="カレンダーを開く"
            className={cn(
              "inline-flex items-center justify-center",
              ib.btn,
              "rounded-sp-action",
              "text-sp-neutral-700",
              "hover:bg-sp-neutral-50",
              "cursor-pointer transition-colors",
              "sparkle-focus-ring",
              "disabled:opacity-40 disabled:cursor-not-allowed"
            )}
          >
            <span className={cn("font-[family-name:var(--font-family-icon)] leading-none select-none", ib.icon)}>
              calendar_today
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div className="absolute z-50 mt-[var(--sp-4)] left-0">
          <Calendar value={value} onChange={handleCalendarSelect} />
        </div>
      )}
    </div>
  );
}

InputDate.displayName = "InputDate";

export { InputDate };
