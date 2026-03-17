import { cn } from "@/lib/utils";

export interface StepItem {
  label: string;
  description?: string;
}

export interface StepperProps {
  steps: StepItem[];
  currentStep: number;
  className?: string;
}

function Stepper({
  steps,
  currentStep,
  className,
}: StepperProps) {
  return (
    <div className={cn("flex items-start w-full", className)}>
      {steps.map((step, index) => {
        const isCompleted = index < currentStep;
        const isCurrent = index === currentStep;

        return (
          <div key={index} className="flex flex-1 items-start">
            {/* Step indicator + label */}
            <div className="flex flex-col items-center gap-[var(--sp-4)]">
              {/* Circle */}
              <div
                className={cn(
                  "flex items-center justify-center",
                  "w-[32px] h-[32px] rounded-full shrink-0",
                  "text-[length:var(--font-size-sp-2)] leading-[var(--lh-2)]",
                  "font-[family-name:var(--font-family-base)]",
                  isCompleted || isCurrent
                    ? "bg-sp-primary-500 text-sp-white"
                    : "bg-sp-white border border-sp-divider-low text-sp-text-low"
                )}
              >
                {isCompleted ? (
                  <span className="font-[family-name:var(--font-family-icon)] text-[20px] leading-none select-none">
                    check
                  </span>
                ) : (
                  index + 1
                )}
              </div>

              {/* Label */}
              <span
                className={cn(
                  "text-[length:var(--font-size-sp-2)] leading-[var(--lh-2)]",
                  "font-[family-name:var(--font-family-base)]",
                  "text-center",
                  isCompleted
                    ? "text-sp-primary-500"
                    : isCurrent
                      ? "text-sp-text-middle"
                      : "text-sp-text-low"
                )}
              >
                {step.label}
              </span>

              {/* Description */}
              {step.description && (
                <span
                  className={cn(
                    "text-[length:var(--font-size-sp-1)] leading-[var(--lh-1)]",
                    "font-[family-name:var(--font-family-base)]",
                    "text-center text-sp-text-low"
                  )}
                >
                  {step.description}
                </span>
              )}
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  "flex-1 h-px mt-[15px] mx-[var(--sp-8)]",
                  isCompleted ? "bg-sp-primary-500" : "bg-sp-divider-middle"
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

export { Stepper };
