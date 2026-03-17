import * as React from "react";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "@/lib/utils";

/* ── Primitive wrappers (kept for internal use) ── */

function BreadcrumbNav({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      aria-label="breadcrumb"
      data-slot="breadcrumb"
      className={cn(className)}
      {...props}
    />
  );
}

function BreadcrumbList({ className, ...props }: React.ComponentProps<"ol">) {
  return (
    <ol
      data-slot="breadcrumb-list"
      className={cn(
        "flex flex-wrap items-center gap-1.5 text-sm wrap-break-word text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}

function BreadcrumbItem({ className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-item"
      className={cn("inline-flex items-center gap-1", className)}
      {...props}
    />
  );
}

function BreadcrumbLink({
  className,
  render,
  ...props
}: useRender.ComponentProps<"a">) {
  return useRender({
    defaultTagName: "a",
    props: mergeProps<"a">(
      {
        className: cn("transition-colors hover:text-foreground", className),
      },
      props
    ),
    render,
    state: {
      slot: "breadcrumb-link",
    },
  });
}

function BreadcrumbPage({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={cn("font-normal text-foreground", className)}
      {...props}
    />
  );
}

function BreadcrumbSeparator({
  children,
  className,
  ...props
}: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? (
        <span className="font-[family-name:var(--font-family-icon)] text-[16px] leading-none select-none">
          chevron_right
        </span>
      )}
    </li>
  );
}

function BreadcrumbEllipsis({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn(
        "flex size-5 items-center justify-center [&>svg]:size-4",
        className
      )}
      {...props}
    >
      <span className="font-[family-name:var(--font-family-icon)] text-[20px] leading-none select-none">
        more_horiz
      </span>
      <span className="sr-only">More</span>
    </span>
  );
}

/* ── Sparkle Breadcrumb (composite) ── */

export interface BreadcrumbItemData {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItemData[];
  className?: string;
}

function Breadcrumb({ items, className }: BreadcrumbProps) {
  return (
    <BreadcrumbNav
      className={cn(
        "text-[length:var(--font-size-sp-2)] leading-[var(--lh-2)]",
        "font-[family-name:var(--font-family-base)]",
        className
      )}
    >
      <BreadcrumbList className="gap-[var(--sp-4)]">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;

          return (
            <React.Fragment key={index}>
              {index > 0 && (
                <BreadcrumbSeparator className="text-sp-text-low">
                  /
                </BreadcrumbSeparator>
              )}
              <BreadcrumbItem className="gap-[var(--sp-4)]">
                {isLast || !item.href ? (
                  <BreadcrumbPage className="text-sp-text-high">
                    {item.label}
                  </BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    href={item.href}
                    className={cn(
                      "text-sp-primary-500",
                      "hover:underline underline-offset-2",
                      "sparkle-focus-ring rounded-sp-notice",
                      "cursor-pointer"
                    )}
                  >
                    {item.label}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </BreadcrumbNav>
  );
}

Breadcrumb.displayName = "Breadcrumb";

export {
  Breadcrumb,
  BreadcrumbNav,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};
