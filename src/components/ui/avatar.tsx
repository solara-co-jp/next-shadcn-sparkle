import { cn } from "@/lib/utils";

type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";

export interface AvatarProps {
  src?: string;
  alt?: string;
  name?: string;
  size?: AvatarSize;
  className?: string;
}

const sizeStyles: Record<
  AvatarSize,
  { container: string; text: string; icon: string }
> = {
  xs: { container: "w-[24px] h-[24px]", text: "text-[length:10px]", icon: "text-[12px]" },
  sm: { container: "w-[32px] h-[32px]", text: "text-[length:var(--font-size-sp-1)]", icon: "text-[16px]" },
  md: { container: "w-[40px] h-[40px]", text: "text-[length:var(--font-size-sp-2)]", icon: "text-[20px]" },
  lg: { container: "w-[48px] h-[48px]", text: "text-[length:var(--font-size-sp-3)]", icon: "text-[24px]" },
  xl: { container: "w-[64px] h-[64px]", text: "text-[length:var(--font-size-sp-4)]", icon: "text-[32px]" },
  "2xl": { container: "w-[80px] h-[80px]", text: "text-[length:var(--font-size-sp-5)]", icon: "text-[40px]" },
  "3xl": { container: "w-[120px] h-[120px]", text: "text-[length:var(--font-size-sp-8)]", icon: "text-[60px]" },
};

function getInitials(name: string): string {
  return name.slice(0, 2);
}

function Avatar({
  src,
  alt,
  name,
  size = "md",
  className,
}: AvatarProps) {
  const styles = sizeStyles[size];

  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        className={cn(
          "rounded-full object-cover shrink-0",
          styles.container,
          className
        )}
      />
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center",
        "rounded-full shrink-0",
        "bg-[#E07C3E] text-sp-white",
        "font-bold font-[family-name:var(--font-family-base)]",
        styles.container,
        styles.text,
        className
      )}
      aria-label={alt}
    >
      {name ? (
        getInitials(name)
      ) : (
        <span
          className={cn(
            "font-[family-name:var(--font-family-icon)]",
            "leading-none select-none",
            styles.icon
          )}
        >
          person
        </span>
      )}
    </span>
  );
}

export { Avatar };
