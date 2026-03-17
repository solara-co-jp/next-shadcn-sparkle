"use client";

import * as React from "react";
import { type ReactNode } from "react";
import { Dialog as SheetPrimitive } from "@base-ui/react/dialog";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/* ── Primitive wrappers (kept for internal use) ── */

function Sheet({ ...props }: SheetPrimitive.Root.Props) {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />;
}

function SheetTrigger({ ...props }: SheetPrimitive.Trigger.Props) {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />;
}

function SheetClose({ ...props }: SheetPrimitive.Close.Props) {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />;
}

function SheetPortal({ ...props }: SheetPrimitive.Portal.Props) {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />;
}

function SheetOverlay({ className, ...props }: SheetPrimitive.Backdrop.Props) {
  return (
    <SheetPrimitive.Backdrop
      data-slot="sheet-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-black/10 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-xs",
        className
      )}
      {...props}
    />
  );
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: SheetPrimitive.Popup.Props & {
  side?: "top" | "right" | "bottom" | "left";
  showCloseButton?: boolean;
}) {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Popup
        data-slot="sheet-content"
        data-side={side}
        className={cn(
          "fixed z-50 flex flex-col gap-4 bg-background bg-clip-padding text-sm shadow-lg transition duration-200 ease-in-out data-ending-style:opacity-0 data-starting-style:opacity-0 data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=bottom]:data-ending-style:translate-y-[2.5rem] data-[side=bottom]:data-starting-style:translate-y-[2.5rem] data-[side=left]:inset-y-0 data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=left]:data-ending-style:translate-x-[-2.5rem] data-[side=left]:data-starting-style:translate-x-[-2.5rem] data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=right]:data-ending-style:translate-x-[2.5rem] data-[side=right]:data-starting-style:translate-x-[2.5rem] data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:h-auto data-[side=top]:border-b data-[side=top]:data-ending-style:translate-y-[-2.5rem] data-[side=top]:data-starting-style:translate-y-[-2.5rem] data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm",
          className
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetPrimitive.Close
            data-slot="sheet-close"
            render={
              <Button
                variant="ghost"
                className="absolute top-3 right-3"
                size="icon-sm"
              />
            }
          >
            <span className="font-[family-name:var(--font-family-icon)] text-[16px] leading-none select-none">
              close
            </span>
            <span className="sr-only">Close</span>
          </SheetPrimitive.Close>
        )}
      </SheetPrimitive.Popup>
    </SheetPortal>
  );
}

function SheetHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-header"
      className={cn("flex flex-col gap-0.5 p-4", className)}
      {...props}
    />
  );
}

function SheetFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="sheet-footer"
      className={cn("mt-auto flex flex-col gap-2 p-4", className)}
      {...props}
    />
  );
}

function SheetTitle({ className, ...props }: SheetPrimitive.Title.Props) {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={cn("text-base font-medium text-foreground", className)}
      {...props}
    />
  );
}

function SheetDescription({
  className,
  ...props
}: SheetPrimitive.Description.Props) {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
}

/* ── Sparkle Drawer (composite) ── */

type DrawerPosition = "left" | "right";
type DrawerSize = "sm" | "md" | "lg";

const drawerSizeMap: Record<DrawerSize, string> = {
  sm: "320px",
  md: "400px",
  lg: "560px",
};

export interface DrawerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: ReactNode;
  statusBadge?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  position?: DrawerPosition;
  size?: DrawerSize;
  width?: string;
  className?: string;
}

function Drawer({
  open,
  onOpenChange,
  title,
  description,
  statusBadge,
  children,
  footer,
  position = "right",
  size = "md",
  width,
  className,
}: DrawerProps) {
  const resolvedWidth = width ?? drawerSizeMap[size];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side={position}
        className={cn(
          "bg-sp-white shadow-sp-pop-out",
          "flex flex-col p-0",
          className
        )}
        style={{ width: resolvedWidth, maxWidth: resolvedWidth }}
      >
        {/* Header */}
        <SheetHeader
          className={cn(
            "flex-row items-center gap-[var(--sp-8)]",
            "px-[var(--sp-24)] py-[var(--sp-8)] shrink-0"
          )}
        >
          <div className="flex-1 flex flex-col gap-[var(--sp-4)]">
            <div className="flex items-center gap-[var(--sp-8)]">
              {statusBadge && <span>{statusBadge}</span>}
              <SheetTitle
                className={cn(
                  "flex-1 text-[length:var(--font-size-sp-4)] leading-[var(--lh-4)]",
                  "font-bold font-[family-name:var(--font-family-base)]",
                  "text-sp-text-high"
                )}
              >
                {title}
              </SheetTitle>
            </div>
            {description && (
              <div
                className={cn(
                  "text-[length:var(--font-size-sp-2)] leading-[var(--lh-2)]",
                  "font-[family-name:var(--font-family-base)]",
                  "text-sp-text-low"
                )}
              >
                {description}
              </div>
            )}
          </div>
        </SheetHeader>

        {/* Body */}
        <div className="flex-1 overflow-auto px-[var(--sp-24)] py-[var(--sp-8)]">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div
            className={cn(
              "shrink-0 flex items-center justify-end gap-[var(--sp-8)]",
              "px-[var(--sp-24)] py-[var(--sp-16)]",
              "border-t border-sp-divider-low"
            )}
          >
            {footer}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

Drawer.displayName = "Drawer";

export {
  Drawer,
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
};
