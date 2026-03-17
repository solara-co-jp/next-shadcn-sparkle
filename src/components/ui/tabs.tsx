"use client";

import { createContext, useContext, type ReactNode } from "react";
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cn } from "@/lib/utils";

/* ─── Types ─── */

type TabsVariant = "solid" | "line" | "ghost";

/* ─── Variant Context ─── */

const VariantContext = createContext<TabsVariant>("line");

/* ─── Tabs (root) ─── */

export interface TabsProps {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  variant?: TabsVariant;
  children: ReactNode;
  className?: string;
}

function Tabs({
  defaultValue = "",
  value,
  onValueChange,
  variant = "line",
  children,
  className,
}: TabsProps) {
  return (
    <VariantContext.Provider value={variant}>
      <TabsPrimitive.Root
        defaultValue={defaultValue}
        value={value}
        onValueChange={onValueChange as (value: unknown) => void}
        className={cn(className)}
      >
        {children}
      </TabsPrimitive.Root>
    </VariantContext.Provider>
  );
}

/* ─── TabList ─── */

export interface TabListProps {
  children: ReactNode;
  className?: string;
}

function TabList({ children, className }: TabListProps) {
  const variant = useContext(VariantContext);

  return (
    <TabsPrimitive.List
      className={cn(
        "flex",
        variant === "line" && "border-b-2 border-sp-divider-low gap-0",
        variant === "solid" && "border-b-2 border-sp-primary-500 gap-0",
        variant === "ghost" && "border-b border-sp-divider-middle gap-0",
        className
      )}
    >
      {children}
    </TabsPrimitive.List>
  );
}

/* ─── Tab ─── */

export interface TabProps {
  value: string;
  children: ReactNode;
  disabled?: boolean;
  className?: string;
}

function Tab({ value, children, disabled, className }: TabProps) {
  const variant = useContext(VariantContext);

  return (
    <TabsPrimitive.Tab
      value={value}
      disabled={disabled}
      className={cn(
        "min-w-[64px] px-[var(--sp-12)] py-[var(--sp-8)]",
        "inline-flex items-center justify-center gap-[var(--sp-4)]",
        "text-[length:var(--font-size-sp-3)] leading-[var(--lh-3)]",
        "font-[family-name:var(--font-family-base)]",
        "cursor-pointer transition-colors",
        "sparkle-focus-ring",
        "whitespace-nowrap",
        "font-bold",
        "data-disabled:text-sp-text-disabled data-disabled:cursor-not-allowed data-disabled:pointer-events-none",
        variant === "solid" && [
          "rounded-tl-sp-action rounded-tr-sp-action",
          "bg-sp-white text-sp-text-middle",
          "hover:bg-sp-neutral-50",
          "data-active:-mb-[2px] data-active:bg-sp-primary-500 data-active:text-sp-white data-active:border-b-2 data-active:border-sp-primary-500",
          "data-active:hover:bg-sp-primary-500",
        ],
        variant === "line" && [
          "border-b-2 -mb-[2px]",
          "text-sp-text-middle border-transparent",
          "hover:text-sp-text-high",
          "data-active:text-sp-primary-500 data-active:border-sp-primary-500",
          "data-active:hover:text-sp-primary-500",
        ],
        variant === "ghost" && [
          "rounded-tl-sp-action rounded-tr-sp-action -mb-px",
          "border border-transparent",
          "text-sp-text-middle",
          "hover:text-sp-text-high",
          "data-active:bg-sp-white data-active:border-sp-divider-middle data-active:border-b-transparent",
        ],
        className
      )}
    >
      {children}
    </TabsPrimitive.Tab>
  );
}

/* ─── TabPanel ─── */

export interface TabPanelProps {
  value: string;
  children: ReactNode;
  className?: string;
}

function TabPanel({ value, children, className }: TabPanelProps) {
  return (
    <TabsPrimitive.Panel
      value={value}
      className={cn("py-[var(--sp-16)]", className)}
    >
      {children}
    </TabsPrimitive.Panel>
  );
}

Tabs.displayName = "Tabs";
TabList.displayName = "TabList";
Tab.displayName = "Tab";
TabPanel.displayName = "TabPanel";

export { Tabs, TabList, Tab, TabPanel };
