"use client";

import { type ChangeEvent, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import type { SparkleSize } from "@/types/sparkle";

export interface InputFileProps {
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  onChange?: (files: FileList | null) => void;
  className?: string;
  isInvalid?: boolean;
  size?: SparkleSize;
  placeholder?: string;
}

const sizeStyles: Record<
  SparkleSize,
  { container: string; text: string; icon: string }
> = {
  sm: {
    container: "min-h-[32px]",
    text: "text-[length:var(--font-size-sp-1)] leading-[var(--lh-1)]",
    icon: "text-[16px]",
  },
  md: {
    container: "min-h-[40px]",
    text: "text-[length:var(--font-size-sp-2)] leading-[var(--lh-2)]",
    icon: "text-[20px]",
  },
  lg: {
    container: "min-h-[48px]",
    text: "text-[length:var(--font-size-sp-3)] leading-[var(--lh-3)]",
    icon: "text-[24px]",
  },
};

function InputFile({
  accept,
  multiple = false,
  disabled = false,
  onChange,
  className,
  isInvalid = false,
  size = "md",
  placeholder = "ファイル名",
}: InputFileProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileNames, setFileNames] = useState<string[]>([]);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFileNames(Array.from(files).map((f) => f.name));
    } else {
      setFileNames([]);
    }
    onChange?.(files);
  }

  function handleClick() {
    if (!disabled) {
      inputRef.current?.click();
    }
  }

  const hasFiles = fileNames.length > 0;
  const displayText = hasFiles ? fileNames.join(", ") : placeholder;
  const styles = sizeStyles[size];

  return (
    <div className={cn("w-full", className)}>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={handleChange}
        className="sr-only"
      />
      <button
        type="button"
        onClick={handleClick}
        disabled={disabled}
        className={cn(
          "inline-flex items-center w-full",
          styles.container,
          "bg-sp-white border border-solid",
          isInvalid ? "border-sp-negative-500" : "border-sp-neutral-500",
          "rounded-sp-action",
          "px-[var(--sp-12)] py-[var(--sp-4)]",
          styles.text,
          "font-[family-name:var(--font-family-base)]",
          "cursor-pointer transition-colors",
          "hover:bg-sp-neutral-50",
          "sparkle-focus-ring",
          "disabled:opacity-40 disabled:cursor-not-allowed"
        )}
      >
        <span
          className={cn(
            "flex-1 text-left truncate",
            hasFiles ? "text-sp-text-high" : "text-sp-text-low"
          )}
        >
          {displayText}
        </span>
        <span
          className={cn(
            "font-[family-name:var(--font-family-icon)]",
            styles.icon,
            "leading-none select-none shrink-0 ml-[var(--sp-8)]",
            "text-sp-neutral-700"
          )}
        >
          description
        </span>
      </button>
    </div>
  );
}

export { InputFile };
