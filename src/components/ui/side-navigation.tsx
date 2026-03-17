"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

/* --- SideNavigation (container) --- */

export interface SideNavigationProps {
  children: ReactNode;
  className?: string;
}

/**
 * Side navigation component for page navigation.
 *
 * Figma: w-288px, flex-col, gap-0, p-0, bg-white
 */
function SideNavigation({
  children,
  className,
}: SideNavigationProps) {
  return (
    <nav
      className={cn(
        "flex flex-col",
        "w-[288px]",
        "bg-sp-white",
        className
      )}
    >
      {children}
    </nav>
  );
}

/* --- SideNavItem --- */

export interface SideNavItemProps {
  label: string;
  href?: string;
  icon?: string;
  active?: boolean;
  disabled?: boolean;
  badge?: ReactNode;
  className?: string;
  onClick?: () => void;
}

function SideNavItem({
  label,
  href,
  icon,
  active = false,
  disabled = false,
  badge,
  className,
  onClick,
}: SideNavItemProps) {
  const Tag = href ? "a" : "button";

  return (
    <Tag
      {...(href ? { href } : { type: "button" as const })}
      onClick={disabled ? undefined : onClick}
      aria-current={active ? "page" : undefined}
      className={cn(
        "relative flex items-center overflow-clip",
        "px-[var(--sp-12)] py-[var(--sp-4)]",
        "bg-sp-white",
        "no-underline",
        disabled && "opacity-40 cursor-not-allowed pointer-events-none",
        className
      )}
    >
      {/* Active marker */}
      {active && (
        <span
          className="absolute left-0 top-[8px] bottom-[8px] w-[4px] bg-sp-primary-500 rounded-tr-sp-minimum rounded-br-sp-minimum"
          aria-hidden
        />
      )}

      {/* Body */}
      <span
        className={cn(
          "flex flex-1 items-center gap-[var(--sp-8)]",
          "px-[var(--sp-8)] py-[var(--sp-4)]",
          "rounded-sp-action",
          "transition-colors",
          !disabled && !active && "hover:bg-sp-neutral-50",
          !disabled && active && "hover:bg-sp-primary-50"
        )}
      >
        {icon && (
          <span
            className={cn(
              "font-[family-name:var(--font-family-icon)] text-[24px] leading-none select-none shrink-0",
              active ? "text-sp-primary-500" : "text-sp-text-high"
            )}
          >
            {icon}
          </span>
        )}
        <span
          className={cn(
            "flex-1 text-left",
            "text-[length:var(--font-size-sp-2)] leading-[var(--lh-2)]",
            "font-[family-name:var(--font-family-base)] font-bold",
            active ? "text-sp-primary-500" : "text-sp-text-middle"
          )}
        >
          {label}
        </span>
        {badge && <span className="shrink-0">{badge}</span>}
      </span>
    </Tag>
  );
}

/* --- SideNavGroup --- */

export interface SideNavGroupProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

function SideNavGroup({
  title,
  children,
  className,
}: SideNavGroupProps) {
  return (
    <div className={cn("flex flex-col", className)}>
      {title && (
        <div className="flex flex-col gap-[var(--sp-4)] py-[var(--sp-4)]">
          <div className="px-[var(--sp-12)]">
            <span
              className={cn(
                "text-[length:var(--font-size-sp-1)] leading-[var(--lh-1)]",
                "font-[family-name:var(--font-family-base)]",
                "text-sp-text-middle"
              )}
            >
              {title}
            </span>
          </div>
          <div className="h-px bg-sp-divider-low" />
        </div>
      )}
      <div className="flex flex-col">{children}</div>
    </div>
  );
}

SideNavigation.displayName = "SideNavigation";
SideNavItem.displayName = "SideNavItem";
SideNavGroup.displayName = "SideNavGroup";

export {
  SideNavigation,
  SideNavItem,
  SideNavGroup,
};
