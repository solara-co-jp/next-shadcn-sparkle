import NextLink from "next/link";
import { type ReactNode, type AnchorHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface LinkProps
  extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href"> {
  href: string;
  children: ReactNode;
  isOpenInNew?: boolean;
}

function Link({
  href,
  children,
  isOpenInNew = false,
  className,
  ...props
}: LinkProps) {
  const isExternal =
    isOpenInNew || href.startsWith("http") || href.startsWith("//");

  const sharedClassName = cn(
    "inline-flex items-center gap-[var(--sp-4)]",
    "text-sp-primary-500",
    "underline underline-offset-2",
    "hover:text-sp-primary-600",
    "sparkle-focus-ring rounded-sp-notice",
    "font-[family-name:var(--font-family-base)]",
    "cursor-pointer",
    className
  );

  if (isExternal) {
    return (
      <a
        href={href}
        className={sharedClassName}
        target="_blank"
        rel="noopener noreferrer"
        {...props}
      >
        {children}
        <span className="font-[family-name:var(--font-family-icon)] text-[16px] leading-none select-none">
          open_in_new
        </span>
      </a>
    );
  }

  return (
    <NextLink href={href} className={sharedClassName} {...props}>
      {children}
    </NextLink>
  );
}

export { Link };
