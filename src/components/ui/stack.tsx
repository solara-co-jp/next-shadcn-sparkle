import { type ReactNode, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

export interface StackProps {
  direction?: "horizontal" | "vertical";
  gap?: string;
  align?: CSSProperties["alignItems"];
  justify?: CSSProperties["justifyContent"];
  wrap?: boolean;
  children: ReactNode;
  className?: string;
}

function Stack({
  direction = "vertical",
  gap = "var(--sp-8)",
  align,
  justify,
  wrap = false,
  children,
  className,
}: StackProps) {
  const style: CSSProperties = {
    gap,
    ...(align && { alignItems: align }),
    ...(justify && { justifyContent: justify }),
  };

  return (
    <div
      className={cn(
        "flex",
        direction === "horizontal" ? "flex-row" : "flex-col",
        wrap && "flex-wrap",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}

export { Stack };
