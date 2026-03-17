import { cn } from "@/lib/utils";
import type { SparkleSize } from "@/types/sparkle";

export interface ProgressIndicatorProps {
  value: number;
  max?: number;
  size?: SparkleSize;
  variant?: "bar" | "circle";
  label?: string;
  showValue?: boolean;
  className?: string;
}

const barSizeStyles: Record<SparkleSize, string> = {
  sm: "h-[4px]",
  md: "h-[8px]",
  lg: "h-[12px]",
};

const circleSizeMap: Record<SparkleSize, { size: number; strokeWidth: number }> = {
  sm: { size: 32, strokeWidth: 3 },
  md: { size: 48, strokeWidth: 4 },
  lg: { size: 64, strokeWidth: 5 },
};

function ProgressIndicator({
  value,
  max = 100,
  size = "md",
  variant = "bar",
  label,
  showValue = false,
  className,
}: ProgressIndicatorProps) {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const isComplete = percentage >= 100;

  if (variant === "circle") {
    const { size: svgSize, strokeWidth } = circleSizeMap[size];
    const radius = (svgSize - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference - (percentage / 100) * circumference;
    const strokeColor = isComplete
      ? "var(--color-sp-success-500)"
      : "var(--color-sp-primary-500)";

    return (
      <div
        className={cn(
          "inline-flex flex-col items-center gap-[var(--sp-4)]",
          "font-[family-name:var(--font-family-base)]",
          className
        )}
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={label}
      >
        <svg
          width={svgSize}
          height={svgSize}
          viewBox={`0 0 ${svgSize} ${svgSize}`}
          style={{ transform: "rotate(-90deg)" }}
        >
          {/* Track */}
          <circle
            cx={svgSize / 2}
            cy={svgSize / 2}
            r={radius}
            fill="none"
            stroke="var(--color-sp-neutral-100)"
            strokeWidth={strokeWidth}
          />
          {/* Fill */}
          {percentage > 0 && (
            <circle
              cx={svgSize / 2}
              cy={svgSize / 2}
              r={radius}
              fill="none"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              strokeLinecap="round"
              className="transition-all duration-300 ease-in-out"
            />
          )}
        </svg>
        {label && (
          <span className="text-[length:var(--font-size-sp-2)] leading-[var(--lh-2)] text-sp-text-middle">
            {label}
          </span>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex flex-col gap-[var(--sp-4)]",
        "font-[family-name:var(--font-family-base)]",
        className
      )}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={label}
    >
      {(label || showValue) && (
        <div className="flex items-center justify-between">
          {label && (
            <span className="text-[length:var(--font-size-sp-2)] leading-[var(--lh-2)] text-sp-text-middle">
              {label}
            </span>
          )}
          {showValue && (
            <span className="text-[length:var(--font-size-sp-1)] leading-[var(--lh-1)] text-sp-text-low">
              {Math.round(percentage)}%
            </span>
          )}
        </div>
      )}
      <div
        className={cn(
          "w-full bg-sp-neutral-100 rounded-full overflow-hidden",
          barSizeStyles[size]
        )}
      >
        <div
          className={cn(
            "h-full rounded-full",
            "transition-all duration-300 ease-in-out",
            isComplete ? "bg-sp-success-500" : "bg-sp-primary-500"
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}

export { ProgressIndicator };
