"use client";

import { type ReactNode, createContext, useContext } from "react";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";

/* ── Size context ── */

type TableSize = "xs" | "sm" | "md";
const TableSizeContext = createContext<TableSize>("md");

/* ── Size token maps ── */

const headerCellSize: Record<TableSize, { cell: string; text: string }> = {
  xs: {
    cell: "px-[var(--sp-16)] py-[var(--sp-8)]",
    text: "text-[length:var(--font-size-sp-2)] leading-[var(--lh-2)]",
  },
  sm: {
    cell: "px-[var(--sp-16)] py-[var(--sp-8)]",
    text: "text-[length:var(--font-size-sp-2)] leading-[var(--lh-2)]",
  },
  md: {
    cell: "px-[var(--sp-16)] py-[var(--sp-8)]",
    text: "text-[length:var(--font-size-sp-2)] leading-[var(--lh-2)]",
  },
};

const dataCellSize: Record<TableSize, { cell: string; text: string }> = {
  xs: {
    cell: "h-[40px] px-[var(--sp-16)] py-[var(--sp-8)]",
    text: "text-[length:var(--font-size-sp-2)] leading-[var(--lh-2)]",
  },
  sm: {
    cell: "h-[56px] px-[var(--sp-16)] py-[var(--sp-8)]",
    text: "text-[length:var(--font-size-sp-2)] leading-[var(--lh-2)]",
  },
  md: {
    cell: "h-[80px] px-[var(--sp-16)] py-[var(--sp-12)]",
    text: "text-[length:var(--font-size-sp-3)] leading-[var(--lh-3)]",
  },
};

const checkboxCellSize: Record<TableSize, string> = {
  xs: "h-[40px]",
  sm: "h-[56px]",
  md: "h-[80px]",
};

/* ── Alignment helper ── */

const alignClass = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
} as const;

/* ── Table (root) ── */

export interface TableProps extends React.ComponentProps<"table"> {
  children: ReactNode;
  size?: TableSize;
}

function Table({ children, size = "md", className, ...props }: TableProps) {
  return (
    <TableSizeContext.Provider value={size}>
      <div data-slot="table-container" className="relative w-full overflow-x-auto">
        <table
          data-slot="table"
          className={cn(
            "w-full border-collapse",
            "font-[family-name:var(--font-family-base)]",
            className
          )}
          {...props}
        >
          {children}
        </table>
      </div>
    </TableSizeContext.Provider>
  );
}

/* ── TableHeader ── */

function TableHeader({ className, ...props }: React.ComponentProps<"thead">) {
  return <thead data-slot="table-header" className={className} {...props} />;
}

/* ── TableBody ── */

function TableBody({ className, ...props }: React.ComponentProps<"tbody">) {
  return <tbody data-slot="table-body" className={className} {...props} />;
}

/* ── TableFooter ── */

function TableFooter({ className, ...props }: React.ComponentProps<"tfoot">) {
  return (
    <tfoot
      data-slot="table-footer"
      className={cn("border-t border-sp-divider-middle", className)}
      {...props}
    />
  );
}

/* ── TableRow ── */

export interface TableRowProps extends React.ComponentProps<"tr"> {
  disabled?: boolean;
}

function TableRow({ disabled, className, ...props }: TableRowProps) {
  return (
    <tr
      data-slot="table-row"
      data-disabled={disabled || undefined}
      className={cn(
        "transition-colors",
        disabled
          ? "bg-sp-neutral-100 [&_td]:text-sp-text-low"
          : [
              "hover:bg-sp-primary-50",
              "focus-within:bg-sp-primary-100",
              "data-[state=selected]:bg-sp-primary-50",
            ],
        className
      )}
      {...props}
    />
  );
}

/* ── TableHeaderCell ── */

export interface TableHeaderCellProps extends React.ComponentProps<"th"> {
  align?: "left" | "center" | "right";
  children: ReactNode;
}

function TableHeaderCell({
  align = "left",
  children,
  className,
  ...props
}: TableHeaderCellProps) {
  const size = useContext(TableSizeContext);
  const s = headerCellSize[size];
  return (
    <th
      data-slot="table-head"
      className={cn(
        s.cell,
        "bg-sp-neutral-50",
        "border-b border-sp-divider-middle",
        "font-bold",
        s.text,
        "text-sp-text-middle",
        alignClass[align],
        "font-[family-name:var(--font-family-base)]",
        className
      )}
      {...props}
    >
      {children}
    </th>
  );
}

/* ── TableHeaderCheckboxCell ── */

export interface TableHeaderCheckboxCellProps extends Omit<React.ComponentProps<"th">, "children"> {
  checked?: boolean;
  indeterminate?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

function TableHeaderCheckboxCell({
  checked,
  indeterminate,
  onCheckedChange,
  className,
  ...props
}: TableHeaderCheckboxCellProps) {
  return (
    <th
      data-slot="table-head"
      className={cn(
        "w-[48px] px-[var(--sp-8)] py-[var(--sp-4)]",
        "bg-sp-neutral-50",
        "border-b border-sp-divider-middle",
        "text-center",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-center">
        <Checkbox
          checked={checked}
          indeterminate={indeterminate}
          onCheckedChange={onCheckedChange}
          size="sm"
        />
      </div>
    </th>
  );
}

/* ── TableCheckboxCell ── */

export interface TableCheckboxCellProps extends Omit<React.ComponentProps<"td">, "children"> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

function TableCheckboxCell({
  checked,
  onCheckedChange,
  disabled,
  className,
  ...props
}: TableCheckboxCellProps) {
  const size = useContext(TableSizeContext);
  return (
    <td
      data-slot="table-cell"
      className={cn(
        "w-[48px] px-[var(--sp-8)]",
        checkboxCellSize[size],
        "border-b border-sp-divider-low",
        "text-center",
        className
      )}
      {...props}
    >
      <div className="flex items-center justify-center">
        <Checkbox
          checked={checked}
          onCheckedChange={onCheckedChange}
          disabled={disabled}
          size="sm"
        />
      </div>
    </td>
  );
}

/* ── TableDataCell ── */

export interface TableDataCellProps extends React.ComponentProps<"td"> {
  align?: "left" | "center" | "right";
  children: ReactNode;
}

function TableDataCell({
  align = "left",
  children,
  className,
  ...props
}: TableDataCellProps) {
  const size = useContext(TableSizeContext);
  const s = dataCellSize[size];
  return (
    <td
      data-slot="table-cell"
      className={cn(
        s.cell,
        "border-b border-sp-divider-low",
        s.text,
        "text-sp-text-high",
        "font-[family-name:var(--font-family-base)]",
        alignClass[align],
        className
      )}
      {...props}
    >
      {children}
    </td>
  );
}

/* ── TableCaption ── */

function TableCaption({ className, ...props }: React.ComponentProps<"caption">) {
  return (
    <caption
      data-slot="table-caption"
      className={cn(
        "mt-[var(--sp-16)] text-[length:var(--font-size-sp-2)] leading-[var(--lh-2)] text-sp-text-low",
        className
      )}
      {...props}
    />
  );
}

/* ── Display names ── */

Table.displayName = "Table";
TableHeader.displayName = "TableHeader";
TableBody.displayName = "TableBody";
TableFooter.displayName = "TableFooter";
TableRow.displayName = "TableRow";
TableHeaderCell.displayName = "TableHeaderCell";
TableHeaderCheckboxCell.displayName = "TableHeaderCheckboxCell";
TableCheckboxCell.displayName = "TableCheckboxCell";
TableDataCell.displayName = "TableDataCell";
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHeaderCell,
  TableHeaderCheckboxCell,
  TableCheckboxCell,
  TableDataCell,
  TableCaption,
};
