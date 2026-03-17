"use client";

import { type ReactNode, type HTMLAttributes, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

/* -- Card (Static) -- */

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

function Card({ children, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "bg-sp-white",
        "border border-sp-divider-middle",
        "rounded-sp-action",
        "py-[var(--sp-16)]",
        "flex flex-col",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

/* -- Clickable Card -- */

export interface ClickableCardProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

function ClickableCard({
  children,
  className,
  disabled,
  ...props
}: ClickableCardProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      className={cn(
        "bg-sp-white text-left",
        "border border-sp-divider-middle",
        "rounded-sp-action",
        "py-[var(--sp-16)]",
        "flex flex-col",
        "cursor-pointer transition-all",
        "sparkle-focus-ring",
        "shadow-sp-raise",
        "hover:shadow-sp-pop-out",
        "active:bg-sp-neutral-50 active:border-sp-primary-400 active:shadow-sp-pop-out",
        "disabled:cursor-not-allowed disabled:border-sp-divider-low disabled:shadow-[0px_1px_0px_0px_rgba(0,0,0,0.05)]",
        "disabled:text-sp-neutral-200",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

/* -- Card Header -- */

export interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-[var(--sp-8)]",
        "px-[var(--sp-24)] py-[var(--sp-8)]",
        "overflow-clip w-full",
        className
      )}
    >
      {children}
    </div>
  );
}

/* -- Card Title -- */

export interface CardTitleProps {
  children: ReactNode;
  className?: string;
}

function CardTitle({ children, className }: CardTitleProps) {
  return (
    <div className={cn("flex flex-1 items-center gap-[var(--sp-8)] min-w-0", className)}>
      <h3
        className={cn(
          "text-[length:var(--font-size-sp-4)] leading-[var(--lh-4)] tracking-[0.9px]",
          "font-bold font-[family-name:var(--font-family-base)]",
          "text-sp-text-middle",
          "whitespace-nowrap"
        )}
      >
        {children}
      </h3>
    </div>
  );
}

/* -- Card Content (Body) -- */

export interface CardContentProps {
  children: ReactNode;
  className?: string;
}

function CardContent({
  children,
  className,
}: CardContentProps) {
  return (
    <div
      className={cn(
        "px-[var(--sp-24)] py-[var(--sp-8)]",
        "overflow-clip w-full",
        className
      )}
    >
      {children}
    </div>
  );
}

/* -- Card Footer -- */

export interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

function CardFooter({
  children,
  className,
}: CardFooterProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-[var(--sp-8)]",
        "px-[var(--sp-24)] py-[var(--sp-8)]",
        "w-full",
        className
      )}
    >
      {children}
    </div>
  );
}

Card.displayName = "Card";
ClickableCard.displayName = "ClickableCard";
CardHeader.displayName = "CardHeader";
CardTitle.displayName = "CardTitle";
CardContent.displayName = "CardContent";
CardFooter.displayName = "CardFooter";

export {
  Card,
  ClickableCard,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
};
