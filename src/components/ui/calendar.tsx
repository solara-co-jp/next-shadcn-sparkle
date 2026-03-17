"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export interface CalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
  className?: string;
}

type ViewMode = "days" | "months" | "years";

const DAY_LABELS = ["日", "月", "火", "水", "木", "金", "土"];

const MONTH_LABELS = [
  "1月", "2月", "3月", "4月", "5月", "6月",
  "7月", "8月", "9月", "10月", "11月", "12月",
];

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function getDaysInMonth(year: number, month: number): number {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number): number {
  return new Date(year, month, 1).getDay();
}

/** Decade start: e.g. 2021 for 2024 */
function getDecadeStart(year: number): number {
  return Math.floor(year / 10) * 10 + 1;
}

/* -- Shared styles -- */

const cellBase = cn(
  "flex items-center justify-center",
  "rounded-sp-action p-[var(--sp-4)] min-w-[28px]",
  "font-[family-name:var(--font-family-base)]",
  "text-[length:var(--font-size-sp-1)] leading-[var(--lh-1)] tracking-[0.6px]",
  "cursor-pointer transition-colors",
  "sparkle-focus-ring"
);

const navButton = cn(
  "inline-flex items-center justify-center",
  "h-[32px] min-w-[32px] rounded-sp-action",
  "cursor-pointer transition-colors",
  "hover:bg-sp-neutral-50",
  "sparkle-focus-ring"
);

const navIcon = cn(
  "font-[family-name:var(--font-family-icon)]",
  "text-[20px] leading-none select-none",
  "text-sp-neutral-700"
);

const selectorButton = cn(
  "inline-flex items-center justify-center",
  "min-h-[32px] min-w-[80px] px-[var(--sp-12)] py-[var(--sp-4)]",
  "rounded-sp-action cursor-pointer transition-colors",
  "hover:bg-sp-neutral-50",
  "font-[family-name:var(--font-family-base)] font-bold",
  "text-[length:var(--font-size-sp-2)] leading-[var(--lh-2)] tracking-[0.7px]",
  "text-sp-neutral-700 whitespace-nowrap",
  "sparkle-focus-ring"
);

function Calendar({
  value,
  onChange,
  className,
}: CalendarProps) {
  const today = new Date();
  const [viewYear, setViewYear] = useState(
    value?.getFullYear() ?? today.getFullYear()
  );
  const [viewMonth, setViewMonth] = useState(
    value?.getMonth() ?? today.getMonth()
  );
  const [viewMode, setViewMode] = useState<ViewMode>("days");

  /* -- Navigation handlers -- */

  function handlePrev() {
    if (viewMode === "days") {
      if (viewMonth === 0) {
        setViewMonth(11);
        setViewYear((y) => y - 1);
      } else {
        setViewMonth((m) => m - 1);
      }
    } else if (viewMode === "months") {
      setViewYear((y) => y - 1);
    } else {
      setViewYear((y) => y - 10);
    }
  }

  function handleNext() {
    if (viewMode === "days") {
      if (viewMonth === 11) {
        setViewMonth(0);
        setViewYear((y) => y + 1);
      } else {
        setViewMonth((m) => m + 1);
      }
    } else if (viewMode === "months") {
      setViewYear((y) => y + 1);
    } else {
      setViewYear((y) => y + 10);
    }
  }

  function handleSelectDay(year: number, month: number, day: number) {
    const date = new Date(year, month, day);
    if (month !== viewMonth) {
      setViewYear(year);
      setViewMonth(month);
    }
    onChange?.(date);
  }

  function handleSelectMonth(month: number) {
    setViewMonth(month);
    setViewMode("days");
  }

  function handleSelectYear(year: number) {
    setViewYear(year);
    setViewMode("months");
  }

  /* -- Header -- */

  function renderHeader() {
    const decadeStart = getDecadeStart(viewYear);
    const decadeEnd = decadeStart + 9;

    return (
      <div className="flex items-center justify-between w-full">
        <button
          type="button"
          onClick={handlePrev}
          className={navButton}
          aria-label="前へ"
        >
          <span className={navIcon}>chevron_left</span>
        </button>

        <div className="flex items-center self-stretch">
          <div className="flex items-center justify-center h-full px-[var(--sp-8)] gap-[var(--sp-4)]">
            {viewMode === "days" && (
              <>
                <button
                  type="button"
                  onClick={() => setViewMode("years")}
                  className={selectorButton}
                >
                  {viewYear}年
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode("months")}
                  className={cn(selectorButton, "min-w-[48px]")}
                >
                  {viewMonth + 1}月
                </button>
              </>
            )}
            {viewMode === "months" && (
              <button
                type="button"
                onClick={() => setViewMode("years")}
                className={selectorButton}
              >
                {viewYear}年
              </button>
            )}
            {viewMode === "years" && (
              <>
                <button
                  type="button"
                  onClick={() => {}}
                  className={selectorButton}
                >
                  {decadeStart}年
                </button>
                <span className="font-[family-name:var(--font-family-base)] font-bold text-[length:var(--font-size-sp-1)] leading-[var(--lh-1)] tracking-[0.6px] text-sp-neutral-700">
                  -
                </span>
                <button
                  type="button"
                  onClick={() => {}}
                  className={selectorButton}
                >
                  {decadeEnd}年
                </button>
              </>
            )}
          </div>
        </div>

        <button
          type="button"
          onClick={handleNext}
          className={navButton}
          aria-label="次へ"
        >
          <span className={navIcon}>chevron_right</span>
        </button>
      </div>
    );
  }

  /* -- Days view -- */

  function renderDays() {
    const daysInMonth = getDaysInMonth(viewYear, viewMonth);
    const firstDay = getFirstDayOfWeek(viewYear, viewMonth);

    // Previous month trailing days
    const prevMonth = viewMonth === 0 ? 11 : viewMonth - 1;
    const prevYear = viewMonth === 0 ? viewYear - 1 : viewYear;
    const prevDaysInMonth = getDaysInMonth(prevYear, prevMonth);

    // Build rows of 7
    type CellData = { day: number; month: number; year: number; isOutside: boolean };
    const cells: CellData[] = [];

    // Previous month days
    for (let i = firstDay - 1; i >= 0; i--) {
      cells.push({ day: prevDaysInMonth - i, month: prevMonth, year: prevYear, isOutside: true });
    }
    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push({ day: d, month: viewMonth, year: viewYear, isOutside: false });
    }
    // Next month days to fill remaining row
    const nextMonth = viewMonth === 11 ? 0 : viewMonth + 1;
    const nextYear = viewMonth === 11 ? viewYear + 1 : viewYear;
    let nextDay = 1;
    while (cells.length % 7 !== 0) {
      cells.push({ day: nextDay++, month: nextMonth, year: nextYear, isOutside: true });
    }

    // Split into rows of 7
    const rows: CellData[][] = [];
    for (let i = 0; i < cells.length; i += 7) {
      rows.push(cells.slice(i, i + 7));
    }

    return (
      <div className="flex flex-col gap-[var(--sp-8)] w-full">
        {/* Day labels */}
        <div className="flex gap-[var(--sp-8)] items-start px-[var(--sp-6)] w-full">
          {DAY_LABELS.map((day) => (
            <span
              key={day}
              className={cn(
                "flex-1 text-center min-w-0",
                "font-[family-name:var(--font-family-base)] font-bold",
                "text-[length:var(--font-size-sp-1)] leading-[var(--lh-1)] tracking-[0.6px]",
                "text-sp-text-low"
              )}
            >
              {day}
            </span>
          ))}
        </div>

        {/* Day grid */}
        <div className="flex flex-col gap-[var(--sp-8)] items-start px-[var(--sp-6)] w-full">
          {rows.map((row, ri) => (
            <div key={ri} className="flex gap-[var(--sp-8)] items-center w-full">
              {row.map((cell, ci) => {
                const date = new Date(cell.year, cell.month, cell.day);
                const isToday = isSameDay(date, today);
                const isSelected = value ? isSameDay(date, value) : false;

                return (
                  <button
                    key={`${ri}-${ci}`}
                    type="button"
                    onClick={() => handleSelectDay(cell.year, cell.month, cell.day)}
                    className={cn(
                      cellBase,
                      "flex-1",
                      isSelected
                        ? "bg-sp-primary-500 text-sp-white"
                        : isToday
                          ? "border border-sp-neutral-200 text-sp-text-high hover:bg-sp-neutral-50"
                          : cell.isOutside
                            ? "text-sp-neutral-200 hover:bg-sp-neutral-50"
                            : "text-sp-text-high hover:bg-sp-neutral-50"
                    )}
                  >
                    {cell.day}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  }

  /* -- Months view -- */

  function renderMonths() {
    const rows: number[][] = [];
    for (let i = 0; i < 12; i += 3) {
      rows.push([i, i + 1, i + 2]);
    }

    return (
      <div className="flex flex-col gap-[var(--sp-8)] items-start w-full">
        {rows.map((row, ri) => (
          <div key={ri} className="flex gap-[var(--sp-8)] items-center w-full">
            {row.map((monthIdx) => {
              const isSelected =
                value &&
                viewYear === value.getFullYear() &&
                monthIdx === value.getMonth();

              return (
                <button
                  key={monthIdx}
                  type="button"
                  onClick={() => handleSelectMonth(monthIdx)}
                  className={cn(
                    cellBase,
                    "flex-1",
                    isSelected
                      ? "bg-sp-primary-500 text-sp-white"
                      : "text-sp-text-high hover:bg-sp-neutral-50"
                  )}
                >
                  {MONTH_LABELS[monthIdx]}
                </button>
              );
            })}
          </div>
        ))}
      </div>
    );
  }

  /* -- Years view -- */

  function renderYears() {
    const decadeStart = getDecadeStart(viewYear);
    const years: (number | null)[] = [];
    for (let y = decadeStart; y <= decadeStart + 9; y++) {
      years.push(y);
    }
    // Pad to fill 3-column rows
    while (years.length % 3 !== 0) {
      years.push(null);
    }

    const rows: (number | null)[][] = [];
    for (let i = 0; i < years.length; i += 3) {
      rows.push(years.slice(i, i + 3));
    }

    return (
      <div className="flex flex-col gap-[var(--sp-8)] items-start w-full">
        {rows.map((row, ri) => (
          <div key={ri} className="flex gap-[var(--sp-8)] items-start w-full">
            {row.map((year, ci) => {
              if (year === null) {
                return <div key={`empty-${ci}`} className="flex-1 min-w-0" />;
              }

              const isSelected = value && year === value.getFullYear();

              return (
                <button
                  key={year}
                  type="button"
                  onClick={() => handleSelectYear(year)}
                  className={cn(
                    cellBase,
                    "flex-1",
                    isSelected
                      ? "bg-sp-primary-500 text-sp-white"
                      : "text-sp-text-high hover:bg-sp-neutral-50"
                  )}
                >
                  {year}年
                </button>
              );
            })}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "inline-flex flex-col gap-[var(--sp-8)] items-center",
        "w-[280px] min-w-[280px]",
        "bg-sp-white border border-sp-divider-low",
        "rounded-sp-halfModal",
        "p-[var(--sp-12)]",
        "shadow-sp-pop-out",
        className
      )}
    >
      {renderHeader()}

      {/* Divider */}
      <div className="w-full h-px bg-sp-divider-low" />

      {/* Content */}
      {viewMode === "days" && renderDays()}
      {viewMode === "months" && renderMonths()}
      {viewMode === "years" && renderYears()}
    </div>
  );
}

export { Calendar };
