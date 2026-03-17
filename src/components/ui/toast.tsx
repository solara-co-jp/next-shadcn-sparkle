"use client";

import { useEffect } from "react";
import { toast as sonnerToast } from "sonner";
import { cn } from "@/lib/utils";

type ToastStatus = "neutral" | "success" | "negative";

const statusConfig: Record<
  ToastStatus,
  { icon?: string; bg: string }
> = {
  neutral: {
    bg: "bg-sp-neutral-700",
  },
  success: {
    icon: "check_circle",
    bg: "bg-sp-success-500",
  },
  negative: {
    icon: "error",
    bg: "bg-sp-negative-500",
  },
};

export interface ToastOptions {
  message: string;
  status?: ToastStatus;
  duration?: number;
  description?: string;
}

/**
 * Show a Sparkle-styled toast notification using Sonner.
 * Requires `<Toaster />` from `sonner` to be mounted in the layout.
 */
function showToast({
  message,
  status = "neutral",
  duration = 5000,
  description,
}: ToastOptions) {
  const config = statusConfig[status];

  return sonnerToast.custom(
    (t) => (
      <div
        className={cn(
          "flex items-start gap-[var(--sp-8)]",
          "px-[var(--sp-12)] py-[var(--sp-8)]",
          "rounded-sp-notice",
          "shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]",
          "w-[320px] min-w-[320px]",
          "overflow-clip",
          config.bg
        )}
      >
        {config.icon && (
          <div className="flex items-center p-[var(--sp-4)] shrink-0">
            <span
              className={cn(
                "font-[family-name:var(--font-family-icon)]",
                "text-[24px] leading-none select-none shrink-0",
                "text-sp-neutral-50"
              )}
            >
              {config.icon}
            </span>
          </div>
        )}
        <div className="flex-1 min-w-0 flex flex-col px-[var(--sp-4)] tracking-[0.8px]">
          <div
            className={cn(
              "flex flex-col justify-center min-h-[32px] w-full",
              "text-[length:var(--font-size-sp-3)] leading-[var(--lh-3)]",
              "font-bold font-[family-name:var(--font-family-base)]",
              "text-sp-neutral-50"
            )}
          >
            <p>{message}</p>
          </div>
          {description && (
            <div
              className={cn(
                "flex flex-col justify-center min-h-[32px] w-full",
                "text-[length:var(--font-size-sp-3)] leading-[var(--lh-3)]",
                "font-normal font-[family-name:var(--font-family-base)]",
                "text-sp-neutral-100"
              )}
            >
              <p>{description}</p>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={() => sonnerToast.dismiss(t)}
          aria-label="閉じる"
          className={cn(
            "inline-flex items-center justify-center",
            "min-h-[32px] min-w-[32px] p-[var(--sp-6)]",
            "rounded-sp-action shrink-0",
            "text-sp-neutral-50",
            "hover:bg-white/20",
            "cursor-pointer transition-colors"
          )}
        >
          <span className="font-[family-name:var(--font-family-icon)] text-[20px] leading-none select-none">
            close
          </span>
        </button>
      </div>
    ),
    { duration }
  );
}

/**
 * Standalone Toast component for custom rendering.
 */
export interface ToastProps {
  message: string;
  status?: ToastStatus;
  open: boolean;
  onClose: () => void;
  duration?: number;
  description?: string;
  className?: string;
}

function Toast({
  message,
  status = "neutral",
  open,
  onClose,
  duration = 5000,
  description,
  className,
}: ToastProps) {
  const config = statusConfig[status];

  // Auto-dismiss
  useEffect(() => {
    if (!open || duration <= 0) return;
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [open, duration, onClose]);

  if (!open) return null;

  return (
    <div
      role="alert"
      className={cn(
        "fixed bottom-[var(--sp-24)] left-1/2 -translate-x-1/2 z-50",
        "flex items-start gap-[var(--sp-8)]",
        "px-[var(--sp-12)] py-[var(--sp-8)]",
        "rounded-sp-notice",
        "shadow-[0px_4px_6px_-1px_rgba(0,0,0,0.1),0px_2px_4px_-2px_rgba(0,0,0,0.1)]",
        "w-[320px] min-w-[320px]",
        "overflow-clip",
        config.bg,
        className
      )}
    >
      {config.icon && (
        <div className="flex items-center p-[var(--sp-4)] shrink-0">
          <span
            className={cn(
              "font-[family-name:var(--font-family-icon)]",
              "text-[24px] leading-none select-none shrink-0",
              "text-sp-neutral-50"
            )}
          >
            {config.icon}
          </span>
        </div>
      )}
      <div className="flex-1 min-w-0 flex flex-col px-[var(--sp-4)] tracking-[0.8px]">
        <div
          className={cn(
            "flex flex-col justify-center min-h-[32px] w-full",
            "text-[length:var(--font-size-sp-3)] leading-[var(--lh-3)]",
            "font-bold font-[family-name:var(--font-family-base)]",
            "text-sp-neutral-50"
          )}
        >
          <p>{message}</p>
        </div>
        {description && (
          <div
            className={cn(
              "flex flex-col justify-center min-h-[32px] w-full",
              "text-[length:var(--font-size-sp-3)] leading-[var(--lh-3)]",
              "font-normal font-[family-name:var(--font-family-base)]",
              "text-sp-neutral-100"
            )}
          >
            <p>{description}</p>
          </div>
        )}
      </div>
      <button
        type="button"
        onClick={onClose}
        aria-label="閉じる"
        className={cn(
          "inline-flex items-center justify-center",
          "min-h-[32px] min-w-[32px] p-[var(--sp-6)]",
          "rounded-sp-action shrink-0",
          "text-sp-neutral-50",
          "hover:bg-white/20",
          "cursor-pointer transition-colors",
          "sparkle-focus-ring"
        )}
      >
        <span className="font-[family-name:var(--font-family-icon)] text-[20px] leading-none select-none">
          close
        </span>
      </button>
    </div>
  );
}

Toast.displayName = "Toast";

export { Toast, showToast };
