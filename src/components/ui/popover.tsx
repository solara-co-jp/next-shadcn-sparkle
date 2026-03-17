"use client";

import * as React from "react";
import { useState, type ReactNode } from "react";
import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { cn } from "@/lib/utils";

/* ── Primitive wrappers (kept for internal use) ── */

function PopoverRoot({ ...props }: PopoverPrimitive.Root.Props) {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />;
}

function PopoverTrigger({ ...props }: PopoverPrimitive.Trigger.Props) {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />;
}

function PopoverContent({
  className,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  ...props
}: PopoverPrimitive.Popup.Props &
  Pick<
    PopoverPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
        className="isolate z-50"
      >
        <PopoverPrimitive.Popup
          data-slot="popover-content"
          className={cn(
            "z-50 flex w-72 origin-(--transform-origin) flex-col gap-2.5 rounded-lg bg-popover p-2.5 text-sm text-popover-foreground shadow-md ring-1 ring-foreground/10 outline-hidden duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          )}
          {...props}
        />
      </PopoverPrimitive.Positioner>
    </PopoverPrimitive.Portal>
  );
}

function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-header"
      className={cn("flex flex-col gap-0.5 text-sm", className)}
      {...props}
    />
  );
}

function PopoverTitle({ className, ...props }: PopoverPrimitive.Title.Props) {
  return (
    <PopoverPrimitive.Title
      data-slot="popover-title"
      className={cn("font-medium", className)}
      {...props}
    />
  );
}

function PopoverDescription({
  className,
  ...props
}: PopoverPrimitive.Description.Props) {
  return (
    <PopoverPrimitive.Description
      data-slot="popover-description"
      className={cn("text-muted-foreground", className)}
      {...props}
    />
  );
}

/* ── Sparkle Popover (composite) ── */

type PopoverAlign = "start" | "center" | "end";
type PopoverSize = "sm" | "md" | "lg" | "xl" | "full";

const sizeClasses: Record<PopoverSize, string> = {
  sm: "w-[280px]",
  md: "w-[360px]",
  lg: "w-[480px]",
  xl: "w-[600px]",
  full: "w-[calc(100vw-var(--sp-48))]",
};

export interface PopoverProps {
  trigger: ReactNode;
  children: ReactNode;
  title?: string;
  align?: PopoverAlign;
  side?: "top" | "bottom" | "left" | "right";
  size?: PopoverSize;
  onCancel?: () => void;
  onSave?: () => void;
  cancelLabel?: string;
  saveLabel?: string;
  showFooter?: boolean;
  className?: string;
}

function Popover({
  trigger,
  children,
  title,
  align = "start",
  side = "bottom",
  size = "md",
  onCancel,
  onSave,
  cancelLabel = "キャンセル",
  saveLabel = "保存",
  showFooter = true,
  className,
}: PopoverProps) {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);

  const handleCancel = () => {
    onCancel?.();
    handleClose();
  };

  const handleSave = () => {
    onSave?.();
    handleClose();
  };

  return (
    <PopoverRoot open={open} onOpenChange={setOpen}>
      <PopoverTrigger render={trigger as React.JSX.Element} />
      <PopoverContent
        align={align}
        side={side}
        className={cn(
          "ring-0 p-0",
          "bg-sp-white border border-sp-divider-low",
          "rounded-sp-action shadow-sp-pop-out",
          sizeClasses[size],
          className
        )}
      >
        {/* Header: title + close button */}
        {title && (
          <div
            className={cn(
              "flex items-center justify-between",
              "px-[var(--sp-16)] pt-[var(--sp-16)] pb-[var(--sp-8)]"
            )}
          >
            <span
              className={cn(
                "text-[length:var(--font-size-sp-3)] leading-[var(--lh-3)]",
                "font-bold font-[family-name:var(--font-family-base)]",
                "text-sp-text-high"
              )}
            >
              {title}
            </span>
            <button
              type="button"
              aria-label="閉じる"
              onClick={handleClose}
              className={cn(
                "inline-flex items-center justify-center",
                "min-h-[24px] min-w-[24px] p-[var(--sp-4)]",
                "rounded-sp-action",
                "text-sp-neutral-700",
                "hover:bg-sp-neutral-100",
                "cursor-pointer transition-colors",
                "sparkle-focus-ring"
              )}
            >
              <span className="font-[family-name:var(--font-family-icon)] text-[16px] leading-none select-none">
                close
              </span>
            </button>
          </div>
        )}

        {/* Content slot */}
        <div className="px-[var(--sp-16)] py-[var(--sp-8)]">{children}</div>

        {/* Footer: cancel + save */}
        {showFooter && (
          <div
            className={cn(
              "flex items-center justify-end gap-[var(--sp-8)]",
              "px-[var(--sp-16)] pb-[var(--sp-16)] pt-[var(--sp-8)]"
            )}
          >
            <button
              type="button"
              onClick={handleCancel}
              className={cn(
                "inline-flex items-center justify-center",
                "px-[var(--sp-16)] py-[var(--sp-8)]",
                "rounded-sp-action",
                "bg-transparent text-sp-text-high",
                "hover:bg-sp-neutral-50",
                "font-bold font-[family-name:var(--font-family-base)]",
                "text-[length:var(--font-size-sp-2)] leading-[var(--lh-2)]",
                "cursor-pointer transition-colors",
                "sparkle-focus-ring"
              )}
            >
              {cancelLabel}
            </button>
            <button
              type="button"
              onClick={handleSave}
              className={cn(
                "inline-flex items-center justify-center",
                "px-[var(--sp-16)] py-[var(--sp-8)]",
                "rounded-sp-action",
                "bg-sp-primary-500 text-sp-white",
                "hover:bg-sp-primary-600",
                "font-bold font-[family-name:var(--font-family-base)]",
                "text-[length:var(--font-size-sp-2)] leading-[var(--lh-2)]",
                "cursor-pointer transition-colors",
                "sparkle-focus-ring"
              )}
            >
              {saveLabel}
            </button>
          </div>
        )}
      </PopoverContent>
    </PopoverRoot>
  );
}

Popover.displayName = "Popover";

export {
  Popover,
  PopoverRoot,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
};
