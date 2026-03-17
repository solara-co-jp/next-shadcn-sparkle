"use client";

import * as React from "react";
import { type ReactNode } from "react";
import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { cn } from "@/lib/utils";

/* ── Primitive wrappers (kept for internal use) ── */

function DropdownMenu({ ...props }: MenuPrimitive.Root.Props) {
  return <MenuPrimitive.Root data-slot="dropdown-menu" {...props} />;
}

function DropdownMenuPortal({ ...props }: MenuPrimitive.Portal.Props) {
  return <MenuPrimitive.Portal data-slot="dropdown-menu-portal" {...props} />;
}

function DropdownMenuTrigger({ ...props }: MenuPrimitive.Trigger.Props) {
  return <MenuPrimitive.Trigger data-slot="dropdown-menu-trigger" {...props} />;
}

function DropdownMenuContent({
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  className,
  ...props
}: MenuPrimitive.Popup.Props &
  Pick<
    MenuPrimitive.Positioner.Props,
    "align" | "alignOffset" | "side" | "sideOffset"
  >) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        className="isolate z-50 outline-none"
        align={align}
        alignOffset={alignOffset}
        side={side}
        sideOffset={sideOffset}
      >
        <MenuPrimitive.Popup
          data-slot="dropdown-menu-content"
          className={cn(
            "z-50 max-h-(--available-height) w-(--anchor-width) min-w-32 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-lg bg-popover p-1 text-popover-foreground shadow-md ring-1 ring-foreground/10 duration-100 outline-none data-[side=bottom]:slide-in-from-top-2 data-[side=inline-end]:slide-in-from-left-2 data-[side=inline-start]:slide-in-from-right-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:overflow-hidden data-closed:fade-out-0 data-closed:zoom-out-95",
            className
          )}
          {...props}
        />
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}

function DropdownMenuGroup({ ...props }: MenuPrimitive.Group.Props) {
  return <MenuPrimitive.Group data-slot="dropdown-menu-group" {...props} />;
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: MenuPrimitive.GroupLabel.Props & {
  inset?: boolean;
}) {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="dropdown-menu-label"
      data-inset={inset}
      className={cn(
        "px-1.5 py-1 text-xs font-medium text-muted-foreground data-inset:pl-7",
        className
      )}
      {...props}
    />
  );
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: MenuPrimitive.Item.Props & {
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  return (
    <MenuPrimitive.Item
      data-slot="dropdown-menu-item"
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "group/dropdown-menu-item relative flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:focus:bg-destructive/10 data-[variant=destructive]:focus:text-destructive dark:data-[variant=destructive]:focus:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive",
        className
      )}
      {...props}
    />
  );
}

function DropdownMenuSub({ ...props }: MenuPrimitive.SubmenuRoot.Props) {
  return (
    <MenuPrimitive.SubmenuRoot data-slot="dropdown-menu-sub" {...props} />
  );
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: MenuPrimitive.SubmenuTrigger.Props & {
  inset?: boolean;
}) {
  return (
    <MenuPrimitive.SubmenuTrigger
      data-slot="dropdown-menu-sub-trigger"
      data-inset={inset}
      className={cn(
        "flex cursor-default items-center gap-1.5 rounded-md px-1.5 py-1 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground not-data-[variant=destructive]:focus:**:text-accent-foreground data-inset:pl-7 data-popup-open:bg-accent data-popup-open:text-accent-foreground data-open:bg-accent data-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      {children}
      <span className="ml-auto font-[family-name:var(--font-family-icon)] text-[16px] leading-none select-none">
        chevron_right
      </span>
    </MenuPrimitive.SubmenuTrigger>
  );
}

function DropdownMenuSubContent({
  align = "start",
  alignOffset = -3,
  side = "right",
  sideOffset = 0,
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
  return (
    <DropdownMenuContent
      data-slot="dropdown-menu-sub-content"
      className={cn(
        "w-auto min-w-[96px] rounded-lg bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/10 duration-100 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95",
        className
      )}
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      {...props}
    />
  );
}

function DropdownMenuCheckboxItem({
  className,
  children,
  checked,
  inset,
  ...props
}: MenuPrimitive.CheckboxItem.Props & {
  inset?: boolean;
}) {
  return (
    <MenuPrimitive.CheckboxItem
      data-slot="dropdown-menu-checkbox-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      checked={checked}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-checkbox-item-indicator"
      >
        <MenuPrimitive.CheckboxItemIndicator>
          <span className="font-[family-name:var(--font-family-icon)] text-[16px] leading-none select-none">
            check
          </span>
        </MenuPrimitive.CheckboxItemIndicator>
      </span>
      {children}
    </MenuPrimitive.CheckboxItem>
  );
}

function DropdownMenuRadioGroup({
  ...props
}: MenuPrimitive.RadioGroup.Props) {
  return (
    <MenuPrimitive.RadioGroup
      data-slot="dropdown-menu-radio-group"
      {...props}
    />
  );
}

function DropdownMenuRadioItem({
  className,
  children,
  inset,
  ...props
}: MenuPrimitive.RadioItem.Props & {
  inset?: boolean;
}) {
  return (
    <MenuPrimitive.RadioItem
      data-slot="dropdown-menu-radio-item"
      data-inset={inset}
      className={cn(
        "relative flex cursor-default items-center gap-1.5 rounded-md py-1 pr-8 pl-1.5 text-sm outline-hidden select-none focus:bg-accent focus:text-accent-foreground focus:**:text-accent-foreground data-inset:pl-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className
      )}
      {...props}
    >
      <span
        className="pointer-events-none absolute right-2 flex items-center justify-center"
        data-slot="dropdown-menu-radio-item-indicator"
      >
        <MenuPrimitive.RadioItemIndicator>
          <span className="font-[family-name:var(--font-family-icon)] text-[16px] leading-none select-none">
            check
          </span>
        </MenuPrimitive.RadioItemIndicator>
      </span>
      {children}
    </MenuPrimitive.RadioItem>
  );
}

function DropdownMenuSeparator({
  className,
  ...props
}: MenuPrimitive.Separator.Props) {
  return (
    <MenuPrimitive.Separator
      data-slot="dropdown-menu-separator"
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
}

function DropdownMenuShortcut({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="dropdown-menu-shortcut"
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground group-focus/dropdown-menu-item:text-accent-foreground",
        className
      )}
      {...props}
    />
  );
}

/* ── Sparkle Menu (composite) ── */

type MenuAlign = "start" | "end";

export interface MenuProps {
  trigger: ReactNode;
  children: ReactNode;
  align?: MenuAlign;
  className?: string;
}

function Menu({
  trigger,
  children,
  align = "start",
  className,
}: MenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={trigger as React.JSX.Element} />
      <DropdownMenuContent
        align={align}
        className={cn(
          "min-w-[180px] ring-0",
          "bg-sp-white border border-sp-divider-low",
          "rounded-sp-action shadow-sp-pop-out",
          "py-[var(--sp-4)]",
          className
        )}
      >
        {children}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export interface MenuItemProps {
  onClick?: () => void;
  label: string;
  icon?: string;
  disabled?: boolean;
  destructive?: boolean;
}

function MenuItem({
  onClick,
  label,
  icon,
  disabled = false,
  destructive = false,
}: MenuItemProps) {
  return (
    <DropdownMenuItem
      onClick={onClick}
      disabled={disabled}
      variant={destructive ? "destructive" : "default"}
      className={cn(
        "flex items-center gap-[var(--sp-8)]",
        "px-[var(--sp-16)] py-[var(--sp-8)]",
        "text-[length:var(--font-size-sp-2)] leading-[var(--lh-2)]",
        "font-[family-name:var(--font-family-base)]",
        "cursor-pointer transition-colors",
        "sparkle-focus-ring",
        destructive ? "text-sp-negative-500" : "text-sp-text-high",
        !disabled && "hover:bg-sp-neutral-50"
      )}
    >
      {icon && (
        <span
          className={cn(
            "font-[family-name:var(--font-family-icon)]",
            "text-[20px] leading-none select-none",
            destructive ? "text-sp-negative-500" : "text-sp-neutral-700"
          )}
        >
          {icon}
        </span>
      )}
      {label}
    </DropdownMenuItem>
  );
}

export interface MenuCheckboxItemProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label: string;
  disabled?: boolean;
}

function MenuCheckboxItem({
  checked = false,
  onCheckedChange,
  label,
  disabled = false,
}: MenuCheckboxItemProps) {
  return (
    <DropdownMenuCheckboxItem
      checked={checked}
      onCheckedChange={onCheckedChange}
      disabled={disabled}
      className={cn(
        "flex items-center gap-[var(--sp-8)]",
        "px-[var(--sp-16)] py-[var(--sp-8)]",
        "text-[length:var(--font-size-sp-2)] leading-[var(--lh-2)]",
        "font-[family-name:var(--font-family-base)]",
        "cursor-pointer transition-colors",
        "sparkle-focus-ring",
        "text-sp-text-high",
        !disabled && "hover:bg-sp-neutral-50"
      )}
    >
      {label}
    </DropdownMenuCheckboxItem>
  );
}

export interface MenuGroupProps {
  label?: string;
  children: ReactNode;
}

function MenuGroup({ label, children }: MenuGroupProps) {
  return (
    <DropdownMenuGroup>
      {label && (
        <DropdownMenuLabel
          className={cn(
            "px-[var(--sp-16)] py-[var(--sp-4)]",
            "text-[length:var(--font-size-sp-1)] leading-[var(--lh-1)]",
            "font-[family-name:var(--font-family-base)]",
            "font-bold text-sp-text-low"
          )}
        >
          {label}
        </DropdownMenuLabel>
      )}
      {children}
    </DropdownMenuGroup>
  );
}

function MenuSeparator() {
  return <DropdownMenuSeparator className="bg-sp-divider-low" />;
}

Menu.displayName = "Menu";
MenuItem.displayName = "MenuItem";
MenuCheckboxItem.displayName = "MenuCheckboxItem";
MenuGroup.displayName = "MenuGroup";
MenuSeparator.displayName = "MenuSeparator";

export {
  Menu,
  MenuItem,
  MenuCheckboxItem,
  MenuGroup,
  MenuSeparator,
  DropdownMenu,
  DropdownMenuPortal,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
};
