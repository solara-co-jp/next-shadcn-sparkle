"use client";

import { forwardRef, type InputHTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils";
import type { SparkleSize } from "@/types/sparkle";

export interface InputPasswordProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type" | "size"> {
  isInvalid?: boolean;
  size?: SparkleSize;
}

/** IconButton size styles (fixed dimensions to prevent line-height inflation) */
const iconBtnSize: Record<SparkleSize, { btn: string; icon: string }> = {
  sm: { btn: "h-[24px] w-[24px] shrink-0", icon: "text-[16px]" },
  md: { btn: "h-[32px] w-[32px] shrink-0", icon: "text-[20px]" },
  lg: { btn: "h-[40px] w-[40px] shrink-0", icon: "text-[24px]" },
};

const sizeStyles: Record<SparkleSize, { root: string; text: string }> = {
  sm: { root: "min-h-[32px]", text: "text-[length:var(--font-size-sp-1)] leading-[var(--lh-1)]" },
  md: { root: "min-h-[40px]", text: "text-[length:var(--font-size-sp-2)] leading-[var(--lh-2)]" },
  lg: { root: "min-h-[48px]", text: "text-[length:var(--font-size-sp-3)] leading-[var(--lh-3)]" },
};

const InputPassword = forwardRef<
  HTMLInputElement,
  InputPasswordProps
>(({ className, isInvalid = false, disabled, size = "md", ...props }, ref) => {
  const [visible, setVisible] = useState(false);
  const ib = iconBtnSize[size];

  return (
    <div
      className={cn(
        "flex items-center w-full",
        sizeStyles[size].root,
        "font-[family-name:var(--font-family-base)]",
        "bg-sp-white border border-solid",
        isInvalid ? "border-sp-negative-500" : "border-sp-neutral-500",
        "rounded-sp-action",
        "pl-[var(--sp-12)] pr-[var(--sp-4)]",
        "focus-within:ring-2 focus-within:ring-sp-ring-normal focus-within:ring-offset-[-1px]",
        "has-[:disabled]:opacity-40 has-[:disabled]:cursor-not-allowed",
        className
      )}
    >
      <input
        ref={ref}
        type={visible ? "text" : "password"}
        className={cn(
          "flex-1 min-w-0 bg-transparent border-none outline-none",
          sizeStyles[size].text,
          "font-[family-name:var(--font-family-base)]",
          "text-sp-text-high",
          "placeholder:text-sp-text-placeholder",
          "disabled:cursor-not-allowed"
        )}
        disabled={disabled}
        {...props}
      />
      <button
        type="button"
        tabIndex={-1}
        onClick={() => setVisible((v) => !v)}
        disabled={disabled}
        className={cn(
          "inline-flex items-center justify-center",
          ib.btn,
          "rounded-sp-action",
          "text-sp-neutral-700",
          "hover:bg-sp-neutral-50",
          "cursor-pointer transition-colors",
          "sparkle-focus-ring",
          "disabled:opacity-40 disabled:cursor-not-allowed"
        )}
        aria-label={visible ? "パスワードを隠す" : "パスワードを表示"}
      >
        <span className={cn("font-[family-name:var(--font-family-icon)] leading-none select-none", ib.icon)}>
          {visible ? "visibility_off" : "visibility"}
        </span>
      </button>
    </div>
  );
});

InputPassword.displayName = "InputPassword";

export { InputPassword };
