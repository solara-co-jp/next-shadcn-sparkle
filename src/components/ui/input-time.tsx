"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";
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

export interface InputTimeProps {
  value?: { hour: number; minute: number };
  onChange?: (time: { hour: number; minute: number } | undefined) => void;
  placeholder?: string;
  isInvalid?: boolean;
  disabled?: boolean;
  minuteStep?: number;
  size?: SparkleSize;
  className?: string;
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

function formatTime(time: { hour: number; minute: number }): string {
  return `${pad(time.hour)}:${pad(time.minute)}`;
}

/** Parse hh:mm */
function parseTime(str: string): { hour: number; minute: number } | null {
  const match = str.match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return null;
  const hour = Number(match[1]);
  const minute = Number(match[2]);
  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) return null;
  return { hour, minute };
}

const HOURS = Array.from({ length: 24 }, (_, i) => i);

const cellBase = cn(
  "flex items-center justify-center",
  "h-[36px] w-full rounded-sp-action",
  "text-[length:var(--font-size-sp-2)] leading-[var(--lh-2)]",
  "font-[family-name:var(--font-family-base)]",
  "cursor-pointer transition-colors",
  "sparkle-focus-ring"
);

function InputTime({
  value: valueProp,
  onChange,
  placeholder = "--:--",
  isInvalid = false,
  disabled = false,
  minuteStep = 1,
  size = "md",
  className,
}: InputTimeProps) {
  const ss = sizeStyles[size];
  const ib = iconBtnSize[size];
  const [open, setOpen] = useState(false);
  const [internalValue, setInternalValue] = useState<{ hour: number; minute: number } | undefined>(valueProp);
  const isControlled = valueProp !== undefined;
  const value = isControlled ? valueProp : internalValue;
  const [inputText, setInputText] = useState(value ? formatTime(value) : "");
  const [selectedHour, setSelectedHour] = useState<number>(value?.hour ?? 0);
  const [selectedMinute, setSelectedMinute] = useState<number>(value?.minute ?? 0);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const hourListRef = useRef<HTMLDivElement>(null);
  const minuteListRef = useRef<HTMLDivElement>(null);
  // Track latest value for blur handler (avoids stale closure)
  const valueRef = useRef(value);
  valueRef.current = value;

  const setValue = useCallback((time: { hour: number; minute: number } | undefined) => {
    if (!isControlled) setInternalValue(time);
    setInputText(time ? formatTime(time) : "");
    if (time) {
      setSelectedHour(time.hour);
      setSelectedMinute(time.minute);
    }
    onChange?.(time);
  }, [isControlled, onChange]);

  const minutes = Array.from(
    { length: Math.ceil(60 / minuteStep) },
    (_, i) => i * minuteStep
  );

  // Sync when controlled value changes externally
  useEffect(() => {
    if (isControlled) {
      setInputText(valueProp ? formatTime(valueProp) : "");
      if (valueProp) {
        setSelectedHour(valueProp.hour);
        setSelectedMinute(valueProp.minute);
      }
    }
  }, [valueProp, isControlled]);

  // Scroll to selected values when opening
  useEffect(() => {
    if (!open) return;
    requestAnimationFrame(() => {
      const hourEl = hourListRef.current?.querySelector(
        `[data-hour="${selectedHour}"]`
      );
      hourEl?.scrollIntoView({ block: "center", behavior: "instant" });
      const minEl = minuteListRef.current?.querySelector(
        `[data-minute="${selectedMinute}"]`
      );
      minEl?.scrollIntoView({ block: "center", behavior: "instant" });
    });
  }, [open, selectedHour, selectedMinute]);

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

  function handleSelectHour(hour: number) {
    setSelectedHour(hour);
    const time = { hour, minute: selectedMinute };
    if (!isControlled) setInternalValue(time);
    setInputText(formatTime(time));
    onChange?.(time);
  }

  function handleSelectMinute(minute: number) {
    setSelectedMinute(minute);
    const time = { hour: selectedHour, minute };
    if (!isControlled) setInternalValue(time);
    setInputText(formatTime(time));
    onChange?.(time);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const text = e.target.value;
    setInputText(text);

    if (text === "") {
      setValue(undefined);
      return;
    }

    const parsed = parseTime(text);
    if (parsed) {
      setValue(parsed);
    }
  }

  function handleInputBlur() {
    const current = valueRef.current;
    if (current) {
      setInputText(formatTime(current));
    } else {
      const parsed = parseTime(inputText);
      if (!parsed) setInputText("");
    }
  }

  function handleInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      const parsed = parseTime(inputText);
      if (parsed) {
        setValue(parsed);
        setOpen(false);
      }
    }
    if (e.key === "ArrowDown" && !open) {
      e.preventDefault();
      setOpen(true);
    }
  }

  function handleClear() {
    setValue(undefined);
    inputRef.current?.focus();
  }

  function handleIconClick() {
    if (disabled) return;
    setOpen(!open);
  }

  const showClear = !!value && !disabled;

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
          <button
            type="button"
            onClick={handleClear}
            aria-label="時刻をクリア"
            className={cn(
              "inline-flex items-center justify-center",
              ib.btn,
              "rounded-sp-action",
              "text-sp-neutral-700",
              "hover:bg-sp-neutral-50",
              "cursor-pointer transition-colors",
              "sparkle-focus-ring",
              !showClear && "opacity-0 pointer-events-none"
            )}
            tabIndex={showClear ? 0 : -1}
          >
            <span className={cn("font-[family-name:var(--font-family-icon)] leading-none select-none", ib.icon)}>
              cancel
            </span>
          </button>
          <button
            type="button"
            tabIndex={-1}
            onClick={handleIconClick}
            disabled={disabled}
            aria-label="時刻を選択"
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
              schedule
            </span>
          </button>
        </div>
      </div>

      {open && (
        <div
          className={cn(
            "absolute z-50 mt-[var(--sp-4)] left-0",
            "flex",
            "bg-sp-white border border-sp-divider-low",
            "rounded-sp-halfModal shadow-sp-pop-out",
            "overflow-hidden"
          )}
        >
          {/* Hour column */}
          <div className="flex flex-col">
            <div className="px-[var(--sp-12)] py-[var(--sp-8)] text-[length:var(--font-size-sp-1)] font-bold text-sp-text-low font-[family-name:var(--font-family-base)] text-center border-b border-sp-divider-low">
              時
            </div>
            <div
              ref={hourListRef}
              className="overflow-y-auto h-[252px] w-[64px] px-[var(--sp-4)] py-[var(--sp-4)]"
            >
              {HOURS.map((h) => {
                const isSelected = selectedHour === h;
                return (
                  <button
                    key={h}
                    type="button"
                    data-hour={h}
                    onClick={() => handleSelectHour(h)}
                    className={cn(
                      cellBase,
                      isSelected
                        ? "bg-sp-primary-500 text-sp-white"
                        : "text-sp-text-high hover:bg-sp-neutral-50"
                    )}
                  >
                    {pad(h)}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Divider */}
          <div className="w-px bg-sp-divider-low" />

          {/* Minute column */}
          <div className="flex flex-col">
            <div className="px-[var(--sp-12)] py-[var(--sp-8)] text-[length:var(--font-size-sp-1)] font-bold text-sp-text-low font-[family-name:var(--font-family-base)] text-center border-b border-sp-divider-low">
              分
            </div>
            <div
              ref={minuteListRef}
              className="overflow-y-auto h-[252px] w-[64px] px-[var(--sp-4)] py-[var(--sp-4)]"
            >
              {minutes.map((m) => {
                const isSelected = selectedMinute === m;
                return (
                  <button
                    key={m}
                    type="button"
                    data-minute={m}
                    onClick={() => handleSelectMinute(m)}
                    className={cn(
                      cellBase,
                      isSelected
                        ? "bg-sp-primary-500 text-sp-white"
                        : "text-sp-text-high hover:bg-sp-neutral-50"
                    )}
                  >
                    {pad(m)}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

InputTime.displayName = "InputTime";

export { InputTime };
