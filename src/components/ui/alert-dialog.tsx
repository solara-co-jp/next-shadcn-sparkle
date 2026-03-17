"use client";

import * as React from "react";
import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

/* ── Primitive wrappers (kept for internal use) ── */

function AlertDialog({ ...props }: AlertDialogPrimitive.Root.Props) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

function AlertDialogTrigger({ ...props }: AlertDialogPrimitive.Trigger.Props) {
  return (
    <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
  );
}

function AlertDialogPortal({ ...props }: AlertDialogPrimitive.Portal.Props) {
  return (
    <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
  );
}

function AlertDialogOverlay({
  className,
  ...props
}: AlertDialogPrimitive.Backdrop.Props) {
  return (
    <AlertDialogPrimitive.Backdrop
      data-slot="alert-dialog-overlay"
      className={cn(
        "fixed inset-0 isolate z-50 bg-black/10 duration-100 supports-backdrop-filter:backdrop-blur-xs data-open:animate-in data-open:fade-in-0 data-closed:animate-out data-closed:fade-out-0",
        className
      )}
      {...props}
    />
  );
}

function AlertDialogContent({
  className,
  size = "default",
  ...props
}: AlertDialogPrimitive.Popup.Props & {
  size?: "default" | "sm";
}) {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Popup
        data-slot="alert-dialog-content"
        data-size={size}
        className={cn(
          "group/alert-dialog-content fixed top-1/2 left-1/2 z-50 grid w-full -translate-x-1/2 -translate-y-1/2 gap-4 rounded-xl bg-background p-4 ring-1 ring-foreground/10 duration-100 data-[size=default]:max-w-xs data-[size=sm]:max-w-xs data-[size=default]:sm:max-w-sm data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
          className
        )}
        {...props}
      />
    </AlertDialogPortal>
  );
}

function AlertDialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn(
        "grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-4 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]",
        className
      )}
      {...props}
    />
  );
}

function AlertDialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "-mx-4 -mb-4 flex flex-col-reverse gap-2 rounded-b-xl border-t bg-muted/50 p-4 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end",
        className
      )}
      {...props}
    />
  );
}

function AlertDialogMedia({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-media"
      className={cn(
        "mb-2 inline-flex size-10 items-center justify-center rounded-md bg-muted sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-6",
        className
      )}
      {...props}
    />
  );
}

function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={cn(
        "text-base font-medium sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2",
        className
      )}
      {...props}
    />
  );
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={cn(
        "text-sm text-balance text-muted-foreground md:text-pretty *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className
      )}
      {...props}
    />
  );
}

function AlertDialogAction({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return (
    <Button
      data-slot="alert-dialog-action"
      className={cn(className)}
      {...props}
    />
  );
}

function AlertDialogCancel({
  className,
  variant = "outline",
  size = "md",
  ...props
}: AlertDialogPrimitive.Close.Props &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
  return (
    <AlertDialogPrimitive.Close
      data-slot="alert-dialog-cancel"
      className={cn(className)}
      render={<Button variant={variant} size={size} />}
      {...props}
    />
  );
}

/* ── Sparkle Dialog (composite) ── */

type DialogStatus = "neutral" | "warning" | "negative";

const dialogStatusConfig: Record<
  DialogStatus,
  { icon?: string; iconColor?: string; actionColor: string }
> = {
  neutral: {
    actionColor:
      "bg-sp-primary-500 border-sp-primary-500 text-sp-white hover:bg-sp-primary-600",
  },
  warning: {
    icon: "warning",
    iconColor: "text-sp-warning-500",
    actionColor:
      "bg-sp-primary-500 border-sp-primary-500 text-sp-white hover:bg-sp-primary-600",
  },
  negative: {
    icon: "error",
    iconColor: "text-sp-negative-500",
    actionColor:
      "bg-sp-negative-500 border-sp-negative-500 text-sp-white hover:bg-sp-negative-600",
  },
};

export interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  status?: DialogStatus;
  className?: string;
}

function Dialog({
  open,
  onOpenChange,
  onConfirm,
  title,
  description,
  confirmLabel = "確認",
  cancelLabel = "キャンセル",
  status = "neutral",
  className,
}: DialogProps) {
  const config = dialogStatusConfig[status];

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        className={cn(
          "bg-sp-white border border-sp-divider-low",
          "rounded-sp-modal shadow-sp-pop-out",
          "p-0 w-full max-w-[420px]",
          className
        )}
      >
        {/* Content */}
        <AlertDialogHeader className="px-[var(--sp-24)] pt-[var(--sp-24)] pb-[var(--sp-8)] text-left">
          <AlertDialogTitle
            className={cn(
              "flex items-center gap-[var(--sp-8)]",
              "text-[length:var(--font-size-sp-4)] leading-[var(--lh-4)]",
              "font-bold font-[family-name:var(--font-family-base)]",
              "text-sp-text-high"
            )}
          >
            {config.icon && (
              <span
                className={cn(
                  "font-[family-name:var(--font-family-icon)]",
                  "text-[24px] leading-none select-none shrink-0",
                  config.iconColor
                )}
              >
                {config.icon}
              </span>
            )}
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription
            className={cn(
              "mt-[var(--sp-8)] text-[length:var(--font-size-sp-2)] leading-[var(--lh-2)]",
              "font-[family-name:var(--font-family-base)]",
              "text-sp-text-middle"
            )}
          >
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        {/* Actions */}
        <AlertDialogFooter
          className={cn(
            "flex-row items-center justify-end gap-[var(--sp-8)]",
            "px-[var(--sp-24)] py-[var(--sp-16)]",
            "border-t-0 bg-transparent rounded-b-sp-modal",
            "mx-0 mb-0"
          )}
        >
          <AlertDialogCancel
            className={cn(
              "rounded-sp-action",
              "border border-sp-neutral-200",
              "bg-sp-white text-sp-text-high",
              "hover:bg-sp-neutral-50",
              "sparkle-focus-ring",
              "font-bold font-[family-name:var(--font-family-base)]"
            )}
          >
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className={cn(
              "rounded-sp-action",
              "sparkle-focus-ring",
              "font-bold font-[family-name:var(--font-family-base)]",
              config.actionColor
            )}
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

Dialog.displayName = "Dialog";

export {
  Dialog,
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
};
export type { DialogStatus };
