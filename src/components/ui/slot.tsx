import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface SlotProps {
  children?: ReactNode;
  className?: string;
}

function Slot({ children, className }: SlotProps) {
  return (
    <div
      className={cn("flex items-center gap-[var(--sp-8)]", className)}
    >
      {children}
    </div>
  );
}

export { Slot };
