"use client";

import * as React from "react";
import { useMemo } from "react";
import { cn } from "@/lib/utils";

/* ── Primitive wrappers (kept for internal use) ── */

function PaginationNav({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}

function PaginationContent({
  className,
  ...props
}: React.ComponentProps<"ul">) {
  return (
    <ul
      data-slot="pagination-content"
      className={cn("flex items-center gap-0.5", className)}
      {...props}
    />
  );
}

function PaginationItem({ ...props }: React.ComponentProps<"li">) {
  return <li data-slot="pagination-item" {...props} />;
}

/* ── Sparkle Pagination (composite) ── */

function buildPageRange(
  currentPage: number,
  totalPages: number,
  siblingCount: number
): (number | "ellipsis")[] {
  const totalSlots = siblingCount * 2 + 5;

  if (totalPages <= totalSlots) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  const leftSibling = Math.max(currentPage - siblingCount, 1);
  const rightSibling = Math.min(currentPage + siblingCount, totalPages);

  const showLeftEllipsis = leftSibling > 2;
  const showRightEllipsis = rightSibling < totalPages - 1;

  const items: (number | "ellipsis")[] = [];

  items.push(1);

  if (showLeftEllipsis) {
    items.push("ellipsis");
  } else {
    for (let i = 2; i < leftSibling; i++) {
      items.push(i);
    }
  }

  for (let i = leftSibling; i <= rightSibling; i++) {
    if (i !== 1 && i !== totalPages) {
      items.push(i);
    }
  }

  if (showRightEllipsis) {
    items.push("ellipsis");
  } else {
    for (let i = rightSibling + 1; i < totalPages; i++) {
      items.push(i);
    }
  }

  if (totalPages > 1) {
    items.push(totalPages);
  }

  return items;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
  siblingCount?: number;
  className?: string;
}

const pageButtonClass = cn(
  "inline-flex items-center justify-center",
  "min-w-[32px] min-h-[32px]",
  "rounded-sp-action",
  "text-[length:var(--font-size-sp-2)] leading-[var(--lh-2)]",
  "font-[family-name:var(--font-family-base)] font-bold",
  "cursor-pointer transition-colors",
  "sparkle-focus-ring"
);

function Pagination({
  currentPage,
  totalPages,
  onChange,
  siblingCount = 1,
  className,
}: PaginationProps) {
  const pages = useMemo(
    () => buildPageRange(currentPage, totalPages, siblingCount),
    [currentPage, totalPages, siblingCount]
  );

  return (
    <PaginationNav
      className={cn(
        "flex items-center gap-[var(--sp-4)]",
        className
      )}
    >
      <PaginationContent className="gap-[var(--sp-4)]">
        {/* First */}
        <PaginationItem>
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => onChange(1)}
            aria-label="最初のページ"
            className={cn(
              pageButtonClass,
              "bg-sp-white border border-sp-neutral-200",
              "hover:bg-sp-neutral-50",
              "disabled:opacity-40 disabled:cursor-not-allowed"
            )}
          >
            <span className="font-[family-name:var(--font-family-icon)] text-[20px] leading-none select-none">
              first_page
            </span>
          </button>
        </PaginationItem>

        {/* Previous */}
        <PaginationItem>
          <button
            type="button"
            disabled={currentPage <= 1}
            onClick={() => onChange(currentPage - 1)}
            aria-label="前のページ"
            className={cn(
              pageButtonClass,
              "bg-sp-white border border-sp-neutral-200",
              "hover:bg-sp-neutral-50",
              "disabled:opacity-40 disabled:cursor-not-allowed"
            )}
          >
            <span className="font-[family-name:var(--font-family-icon)] text-[20px] leading-none select-none">
              chevron_left
            </span>
          </button>
        </PaginationItem>

        {/* Page numbers */}
        {pages.map((item, index) => {
          if (item === "ellipsis") {
            return (
              <PaginationItem key={`ellipsis-${index}`}>
                <span
                  aria-hidden
                  data-slot="pagination-ellipsis"
                  className="flex min-w-[32px] min-h-[32px] items-center justify-center text-sp-text-low"
                >
                  <span className="font-[family-name:var(--font-family-icon)] text-[20px] leading-none select-none">
                    more_horiz
                  </span>
                  <span className="sr-only">More pages</span>
                </span>
              </PaginationItem>
            );
          }

          const isActive = item === currentPage;

          return (
            <PaginationItem key={item}>
              <button
                type="button"
                aria-current={isActive ? "page" : undefined}
                onClick={() => onChange(item)}
                className={cn(
                  pageButtonClass,
                  isActive
                    ? "bg-sp-primary-500 text-sp-white border border-sp-primary-500"
                    : "bg-sp-white border border-sp-neutral-200 text-sp-text-high hover:bg-sp-neutral-50"
                )}
              >
                {item}
              </button>
            </PaginationItem>
          );
        })}

        {/* Next */}
        <PaginationItem>
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => onChange(currentPage + 1)}
            aria-label="次のページ"
            className={cn(
              pageButtonClass,
              "bg-sp-white border border-sp-neutral-200",
              "hover:bg-sp-neutral-50",
              "disabled:opacity-40 disabled:cursor-not-allowed"
            )}
          >
            <span className="font-[family-name:var(--font-family-icon)] text-[20px] leading-none select-none">
              chevron_right
            </span>
          </button>
        </PaginationItem>

        {/* Last */}
        <PaginationItem>
          <button
            type="button"
            disabled={currentPage >= totalPages}
            onClick={() => onChange(totalPages)}
            aria-label="最後のページ"
            className={cn(
              pageButtonClass,
              "bg-sp-white border border-sp-neutral-200",
              "hover:bg-sp-neutral-50",
              "disabled:opacity-40 disabled:cursor-not-allowed"
            )}
          >
            <span className="font-[family-name:var(--font-family-icon)] text-[20px] leading-none select-none">
              last_page
            </span>
          </button>
        </PaginationItem>
      </PaginationContent>
    </PaginationNav>
  );
}

Pagination.displayName = "Pagination";

export {
  Pagination,
  PaginationNav,
  PaginationContent,
  PaginationItem,
};
