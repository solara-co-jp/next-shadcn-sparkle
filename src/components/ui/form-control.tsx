import { type ReactNode, useId } from "react";
import { cn } from "@/lib/utils";
import { Tag } from "@/components/ui/tag";

export interface FormControlProps {
  label: string;
  htmlFor?: string;
  required?: boolean;
  helperText?: string;
  error?: boolean;
  errorText?: string;
  tooltip?: string;
  children: ReactNode;
  className?: string;
}

function FormControl({
  label,
  htmlFor,
  required = false,
  helperText,
  error = false,
  errorText,
  tooltip,
  children,
  className,
}: FormControlProps) {
  const generatedId = useId();
  const controlId = htmlFor ?? generatedId;

  return (
    <div
      className={cn(
        "flex flex-col gap-[var(--sp-4)] w-full",
        className
      )}
    >
      <div className="flex items-center gap-[var(--sp-8)]">
        <label
          htmlFor={controlId}
          className={cn(
            "text-[length:var(--font-size-sp-2)] leading-[var(--lh-2)]",
            "font-[family-name:var(--font-family-base)]",
            "text-sp-text-high"
          )}
        >
          {label}
        </label>
        {required && (
          <Tag status="negative" size="sm" variant="subtle">
            必須
          </Tag>
        )}
        {tooltip && (
          <span
            className={cn(
              "font-[family-name:var(--font-family-icon)]",
              "text-[16px] leading-none select-none",
              "text-sp-neutral-500 cursor-help"
            )}
            title={tooltip}
          >
            help
          </span>
        )}
      </div>
      {children}
      {error && errorText && (
        <p
          className={cn(
            "flex items-center gap-[var(--sp-4)]",
            "text-[length:var(--font-size-sp-1)] leading-[var(--lh-1)]",
            "font-[family-name:var(--font-family-base)]",
            "text-sp-negative-500"
          )}
        >
          <span
            className={cn(
              "font-[family-name:var(--font-family-icon)]",
              "text-[16px] leading-none select-none",
              "text-sp-negative-500"
            )}
          >
            error
          </span>
          {errorText}
        </p>
      )}
      {!error && helperText && (
        <p
          className={cn(
            "text-[length:var(--font-size-sp-1)] leading-[var(--lh-1)]",
            "font-[family-name:var(--font-family-base)]",
            "text-sp-text-low"
          )}
        >
          {helperText}
        </p>
      )}
    </div>
  );
}

FormControl.displayName = "FormControl";

export { FormControl };
