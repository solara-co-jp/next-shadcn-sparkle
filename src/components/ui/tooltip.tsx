"use client";

import { type ReactNode } from "react";
import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { cn } from "@/lib/utils";

type TooltipPosition = "top" | "bottom" | "left" | "right";

export interface TooltipProps {
  content: string;
  children: ReactNode;
  position?: TooltipPosition;
  className?: string;
}

function Tooltip({
  content,
  children,
  position = "top",
  className,
}: TooltipProps) {
  return (
    <TooltipPrimitive.Provider delay={200}>
      <TooltipPrimitive.Root>
        <TooltipPrimitive.Trigger
          render={<span className="inline-flex" />}
        >
          {children}
        </TooltipPrimitive.Trigger>
        <TooltipPrimitive.Portal>
          <TooltipPrimitive.Positioner
            side={position}
            sideOffset={4}
            align="center"
            className="isolate z-50"
          >
            <TooltipPrimitive.Popup
              className={cn(
                "z-50 inline-flex w-fit max-w-xs items-center",
                "bg-sp-neutral-900 text-sp-white",
                "text-[length:var(--font-size-sp-1)] leading-[var(--lh-1)]",
                "font-[family-name:var(--font-family-base)]",
                "rounded-sp-notice",
                "px-[var(--sp-8)] py-[var(--sp-4)]",
                "origin-(--transform-origin)",
                "data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95",
                "data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95",
                "data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
                className
              )}
            >
              {content}
              <TooltipPrimitive.Arrow
                className="size-2.5 translate-y-[calc(-50%-2px)] rotate-45 rounded-[2px] bg-sp-neutral-900 fill-sp-neutral-900 data-[side=bottom]:top-1 data-[side=top]:-bottom-2.5 data-[side=left]:top-1/2! data-[side=left]:-right-1 data-[side=left]:-translate-y-1/2 data-[side=right]:top-1/2! data-[side=right]:-left-1 data-[side=right]:-translate-y-1/2"
              />
            </TooltipPrimitive.Popup>
          </TooltipPrimitive.Positioner>
        </TooltipPrimitive.Portal>
      </TooltipPrimitive.Root>
    </TooltipPrimitive.Provider>
  );
}

Tooltip.displayName = "Tooltip";

// Re-export primitives for backward compatibility with shadcn ui/* consumers (e.g., sidebar.tsx)
const TooltipProvider = TooltipPrimitive.Provider;
const TooltipRoot = TooltipPrimitive.Root;
const TooltipTrigger = TooltipPrimitive.Trigger;

/** Backward-compat TooltipContent that wraps Portal + Positioner + Popup */
function TooltipContent({
  side = "top",
  align = "center",
  sideOffset = 4,
  hidden,
  children,
  className,
  ...props
}: {
  side?: TooltipPosition;
  align?: "start" | "center" | "end";
  sideOffset?: number;
  hidden?: boolean;
  children?: ReactNode;
  className?: string;
} & Record<string, unknown>) {
  if (hidden) return null;
  return (
    <TooltipPrimitive.Portal>
      <TooltipPrimitive.Positioner side={side} sideOffset={sideOffset} align={align} className="isolate z-50">
        <TooltipPrimitive.Popup
          className={cn(
            "z-50 inline-flex w-fit max-w-xs items-center",
            "bg-sp-neutral-900 text-sp-white",
            "text-[length:var(--font-size-sp-1)] leading-[var(--lh-1)]",
            "font-[family-name:var(--font-family-base)]",
            "rounded-sp-notice",
            "px-[var(--sp-8)] py-[var(--sp-4)]",
            className
          )}
          {...props}
        >
          {children}
        </TooltipPrimitive.Popup>
      </TooltipPrimitive.Positioner>
    </TooltipPrimitive.Portal>
  );
}

export { Tooltip, TooltipProvider, TooltipRoot, TooltipTrigger, TooltipContent };
