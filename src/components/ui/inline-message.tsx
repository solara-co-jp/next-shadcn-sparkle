"use client";

import { type ReactNode } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { SparkleStatus } from "@/types/sparkle";

const inlineMessageVariants = cva(
  [
    "flex items-start gap-[var(--sp-8)]",
    "p-[var(--sp-12)]",
    "border border-solid rounded-sp-notice",
    "overflow-clip",
  ],
  {
    variants: {
      status: {
        info: "bg-sp-info-50 border-sp-info-300",
        success: "bg-sp-success-50 border-sp-success-300",
        warning: "bg-sp-warning-50 border-sp-warning-300",
        negative: "bg-sp-negative-50 border-sp-negative-300",
      },
    },
    defaultVariants: {
      status: "info",
    },
  }
);

const statusIconMap: Record<SparkleStatus, { name: string; color: string }> = {
  info: { name: "info", color: "text-sp-info-400" },
  success: { name: "check_circle", color: "text-sp-success-500" },
  warning: { name: "warning", color: "text-sp-warning-500" },
  negative: { name: "error", color: "text-sp-negative-500" },
};

export interface InlineMessageProps {
  status?: SparkleStatus;
  title?: string;
  children?: ReactNode;
  onClose?: () => void;
  className?: string;
}

function InlineMessage({
  status = "info",
  title,
  children,
  onClose,
  className,
}: InlineMessageProps) {
  const icon = statusIconMap[status];

  return (
    <div
      role="alert"
      className={cn(inlineMessageVariants({ status }), className)}
    >
      <div className="flex items-center p-[var(--sp-4)] shrink-0">
        <span
          className={cn(
            "font-[family-name:var(--font-family-icon)]",
            "text-[24px] leading-none select-none",
            icon.color
          )}
        >
          {icon.name}
        </span>
      </div>
      <div className="flex-1 min-w-0 min-h-[32px] flex flex-col justify-center tracking-[0.8px]">
        {title && (
          <div
            className={cn(
              "flex flex-col justify-center min-h-[32px] w-full",
              "text-[length:var(--font-size-sp-3)] leading-[var(--lh-3)]",
              "font-bold font-[family-name:var(--font-family-base)]",
              "text-sp-text-high"
            )}
          >
            <p>{title}</p>
          </div>
        )}
        {children && (
          <div
            className={cn(
              "flex flex-col justify-center min-h-[32px] w-full",
              "text-[length:var(--font-size-sp-3)] leading-[var(--lh-3)]",
              "font-normal font-[family-name:var(--font-family-base)]",
              "text-sp-text-middle"
            )}
          >
            <p>{children}</p>
          </div>
        )}
      </div>
      {onClose && (
        <button
          type="button"
          onClick={onClose}
          className={cn(
            "inline-flex items-center justify-center",
            "min-h-[32px] min-w-[32px] p-[var(--sp-6)]",
            "rounded-sp-action shrink-0",
            "text-sp-secondary-700",
            "hover:bg-black/5",
            "cursor-pointer transition-colors",
            "bg-transparent border-none"
          )}
          aria-label="閉じる"
        >
          <span className="font-[family-name:var(--font-family-icon)] text-[20px] leading-none select-none">
            close
          </span>
        </button>
      )}
    </div>
  );
}

InlineMessage.displayName = "InlineMessage";

export { InlineMessage, inlineMessageVariants };
