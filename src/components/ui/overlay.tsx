"use client";

import { type ReactNode, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

export interface OverlayProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

function Overlay({
  open,
  onClose,
  children,
  className,
}: OverlayProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted || !open) return null;

  return createPortal(
    <div
      className={cn(
        "fixed inset-0 z-50",
        "bg-black/40",
        "flex items-center justify-center",
        className
      )}
      onClick={onClose}
    >
      <div onClick={(e) => e.stopPropagation()}>{children}</div>
    </div>,
    document.body
  );
}

export { Overlay };
