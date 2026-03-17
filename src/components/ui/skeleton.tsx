import * as React from "react";
import { cn } from "@/lib/utils";

type SkeletonVariant = "text" | "circular" | "rectangular";

export interface SkeletonProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: SkeletonVariant;
  width?: string;
  height?: string;
}

const variantStyles: Record<SkeletonVariant, string> = {
  text: "rounded-sp-notice",
  circular: "rounded-full",
  rectangular: "rounded-sp-action",
};

function Skeleton({
  variant = "text",
  width,
  height,
  className,
  style,
  ...props
}: SkeletonProps) {
  const defaultHeight = variant === "text" ? "1em" : undefined;

  return (
    <span
      data-slot="skeleton"
      className={cn(
        "block bg-sp-skeleton-fill animate-pulse",
        variantStyles[variant],
        className
      )}
      style={{
        width,
        height: height ?? defaultHeight,
        ...style,
      }}
      aria-hidden="true"
      {...props}
    />
  );
}

Skeleton.displayName = "Skeleton";

export { Skeleton };
