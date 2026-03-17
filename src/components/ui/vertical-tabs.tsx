"use client";

import { type ReactNode } from "react";
import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";
import { cn } from "@/lib/utils";

/* ─── VerticalTabs (root) ─── */

export interface VerticalTabsProps {
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  children: ReactNode;
  className?: string;
}

function VerticalTabs({
  defaultValue = "",
  value,
  onChange,
  children,
  className,
}: VerticalTabsProps) {
  return (
    <TabsPrimitive.Root
      defaultValue={defaultValue}
      value={value}
      onValueChange={onChange as ((value: unknown) => void) | undefined}
      orientation="vertical"
      className={cn("flex", className)}
    >
      {children}
    </TabsPrimitive.Root>
  );
}

/* ─── VerticalTabList ─── */

export interface VerticalTabListProps {
  children: ReactNode;
  className?: string;
}

function VerticalTabList({
  children,
  className,
}: VerticalTabListProps) {
  return (
    <TabsPrimitive.List
      className={cn(
        "flex flex-col gap-[var(--sp-4)]",
        className
      )}
    >
      {children}
    </TabsPrimitive.List>
  );
}

/* ─── VerticalTab ─── */

export interface VerticalTabProps {
  value: string;
  children: ReactNode;
  className?: string;
}

function VerticalTab({
  value,
  children,
  className,
}: VerticalTabProps) {
  return (
    <TabsPrimitive.Tab
      value={value}
      className={cn(
        "px-[var(--sp-16)] py-[var(--sp-8)]",
        "flex items-center gap-[var(--sp-4)]",
        "text-[length:var(--font-size-sp-3)] leading-[var(--lh-3)] tracking-[0.8px]",
        "font-[family-name:var(--font-family-base)]",
        "cursor-pointer transition-colors",
        "sparkle-focus-ring",
        "text-left whitespace-nowrap overflow-hidden text-ellipsis",
        "rounded-sp-action",
        "font-normal text-sp-text-middle hover:bg-sp-neutral-50",
        "data-active:font-bold data-active:bg-sp-primary-50 data-active:text-sp-primary-500 data-active:hover:bg-sp-primary-50",
        className
      )}
    >
      {children}
    </TabsPrimitive.Tab>
  );
}

/* ─── VerticalTabPanel ─── */

export interface VerticalTabPanelProps {
  value: string;
  children: ReactNode;
  className?: string;
}

function VerticalTabPanel({
  value,
  children,
  className,
}: VerticalTabPanelProps) {
  return (
    <TabsPrimitive.Panel
      value={value}
      className={cn("flex-1 px-[var(--sp-16)]", className)}
    >
      {children}
    </TabsPrimitive.Panel>
  );
}

VerticalTabs.displayName = "VerticalTabs";
VerticalTabList.displayName = "VerticalTabList";
VerticalTab.displayName = "VerticalTab";
VerticalTabPanel.displayName = "VerticalTabPanel";

export {
  VerticalTabs,
  VerticalTabList,
  VerticalTab,
  VerticalTabPanel,
};
