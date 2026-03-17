"use client";

import { type ReactNode, useState } from "react";
import { cn } from "@/lib/utils";

/* ── Row types ── */

export interface InformationListItem {
  /** Small description text above the title */
  description?: string;
  /** Main title text (or use label for backward compat) */
  title?: string;
  /** Alias for title (backward compatibility) */
  label?: string;
  /** Trailing data text (descriptionType=label style) */
  value?: ReactNode;
  /** Leading slot (icon, avatar, etc.) */
  leadingSlot?: ReactNode;
  /** Trailing slot — replaces value (descriptionType=slot style) */
  trailingSlot?: ReactNode;
  /** Show expand chevron and enable accordion behaviour */
  isExpandTrigger?: boolean;
  /** Content revealed when expanded (accordion body) */
  expandContent?: ReactNode;
  /** Click handler for the row (non-accordion use) */
  onClick?: () => void;
}

export interface InformationListProps {
  items: InformationListItem[];
  className?: string;
}

/* ── Accordion row (client component) ── */

function AccordionRow({
  item,
  isLast,
}: {
  item: InformationListItem;
  isLast: boolean;
}) {
  const [open, setOpen] = useState(false);
  const titleText = item.title ?? item.label;

  return (
    <div
      className={cn(
        !isLast && "border-b border-sp-divider-low"
      )}
    >
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex items-center gap-[var(--sp-12)] w-full",
          "py-[var(--sp-12)] px-[var(--sp-4)]",
          "cursor-pointer transition-colors rounded-sp-minimum",
          "hover:bg-sp-neutral-50",
          "sparkle-focus-ring",
          "text-left"
        )}
        aria-expanded={open}
      >
        {/* Leading slot */}
        {item.leadingSlot && (
          <div className="shrink-0 flex items-center justify-center">
            {item.leadingSlot}
          </div>
        )}

        {/* Description + Title */}
        <div className="flex-1 min-w-0 flex flex-col">
          {item.description && (
            <span className="text-[length:var(--font-size-sp-1)] leading-[var(--lh-1)] text-sp-text-low font-[family-name:var(--font-family-base)]">
              {item.description}
            </span>
          )}
          {titleText && (
            <span className="text-[length:var(--font-size-sp-2)] leading-[var(--lh-2)] text-sp-text-high font-[family-name:var(--font-family-base)]">
              {titleText}
            </span>
          )}
        </div>

        {/* Trailing: value text or custom slot */}
        {(item.trailingSlot || item.value != null) && (
          <div className="shrink-0 flex items-center gap-[var(--sp-4)]">
            {item.trailingSlot ?? (
              <span className="text-[length:var(--font-size-sp-2)] leading-[var(--lh-2)] text-sp-text-middle font-[family-name:var(--font-family-base)]">
                {item.value}
              </span>
            )}
          </div>
        )}

        {/* Chevron */}
        <span
          className={cn(
            "shrink-0 font-[family-name:var(--font-family-icon)]",
            "text-[20px] leading-none select-none text-sp-text-low",
            "transition-transform duration-200",
            open && "rotate-180"
          )}
        >
          expand_more
        </span>
      </button>

      {/* Collapsible content */}
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-in-out",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        )}
      >
        <div className="overflow-hidden">
          <div className="px-[var(--sp-4)] pb-[var(--sp-12)]">
            {item.expandContent}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Static row ── */

function StaticRow({
  item,
  isLast,
}: {
  item: InformationListItem;
  isLast: boolean;
}) {
  const titleText = item.title ?? item.label;
  const isClickable = !!item.onClick;

  return (
    <div
      className={cn(
        "flex items-center gap-[var(--sp-12)]",
        "py-[var(--sp-12)] px-[var(--sp-4)]",
        !isLast && "border-b border-sp-divider-low",
        isClickable &&
          "cursor-pointer hover:bg-sp-neutral-50 transition-colors rounded-sp-minimum"
      )}
      onClick={item.onClick}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={
        isClickable
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                item.onClick?.();
              }
            }
          : undefined
      }
    >
      {/* Leading slot */}
      {item.leadingSlot && (
        <div className="shrink-0 flex items-center justify-center">
          {item.leadingSlot}
        </div>
      )}

      {/* Description + Title */}
      <div className="flex-1 min-w-0 flex flex-col">
        {item.description && (
          <span className="text-[length:var(--font-size-sp-1)] leading-[var(--lh-1)] text-sp-text-low font-[family-name:var(--font-family-base)]">
            {item.description}
          </span>
        )}
        {titleText && (
          <span className="text-[length:var(--font-size-sp-2)] leading-[var(--lh-2)] text-sp-text-high font-[family-name:var(--font-family-base)]">
            {titleText}
          </span>
        )}
      </div>

      {/* Trailing: value text or custom slot */}
      {(item.trailingSlot || item.value != null) && (
        <div className="shrink-0 flex items-center gap-[var(--sp-4)]">
          {item.trailingSlot ?? (
            <span className="text-[length:var(--font-size-sp-2)] leading-[var(--lh-2)] text-sp-text-middle font-[family-name:var(--font-family-base)]">
              {item.value}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

/* ── Main component ── */

function InformationList({ items, className }: InformationListProps) {
  return (
    <div
      className={cn(
        "flex flex-col",
        "font-[family-name:var(--font-family-base)]",
        className
      )}
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        if (item.isExpandTrigger) {
          return <AccordionRow key={index} item={item} isLast={isLast} />;
        }

        return <StaticRow key={index} item={item} isLast={isLast} />;
      })}
    </div>
  );
}

InformationList.displayName = "InformationList";

export { InformationList };
