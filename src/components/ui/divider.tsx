import { cn } from "@/lib/utils";

type DividerDirection = "horizontal" | "vertical";
type DividerEmphasis = "low" | "middle" | "high";
type DividerLineStyle = "solid" | "dashed";

export interface DividerProps {
  direction?: DividerDirection;
  emphasis?: DividerEmphasis;
  lineStyle?: DividerLineStyle;
  className?: string;
}

const emphasisColors: Record<DividerEmphasis, string> = {
  low: "var(--color-sp-divider-low)",
  middle: "var(--color-sp-divider-middle)",
  high: "var(--color-sp-divider-high)",
};

function Divider({
  direction = "horizontal",
  emphasis = "low",
  lineStyle = "solid",
  className,
}: DividerProps) {
  const color = emphasisColors[emphasis];
  const borderStyle = lineStyle === "dashed" ? "dashed" : "solid";

  if (direction === "vertical") {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={cn("self-stretch w-0", className)}
        style={{
          borderLeft: `1px ${borderStyle} ${color}`,
        }}
      />
    );
  }

  return (
    <hr
      role="separator"
      className={cn("w-full border-0 h-0", className)}
      style={{
        borderTop: `1px ${borderStyle} ${color}`,
      }}
    />
  );
}

Divider.displayName = "Divider";

export { Divider };
