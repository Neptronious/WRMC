'use client';
// @refresh reset

/**
 * @module Menubar
 *
 * # CRITICAL AGENT DIRECTIVE - HARD STOP
 * 
 * This file is read-only output. Treat it as immutable.
 * 
 * - NEVER edit this file directly.
 * - NEVER apply "quick fixes" in this file.
 * - NEVER reformat, refactor, or rewrite content in place.
 * - NEVER treat this file as the source of truth.
 * 
 * If behavior must change, modify the upstream source of this content (the canonical source), not this copy.
 * 
 * Any direct edits in this file are invalid and must be rejected.
 */
import * as React from 'react';
import {cx, applyCommonProps, mergeRefs} from './common';
import * as ReactDOM from 'react-dom';

import type {CommonProps} from './common';

// ---------------------------------------------------------------------------
// Inline SVG Icons
// ---------------------------------------------------------------------------

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

function CircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="8"
      height="8"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <circle cx="12" cy="12" r="12" />
    </svg>
  );
}

function ChevronRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Contexts
// ---------------------------------------------------------------------------

interface MenubarContextValue {
  activeMenu: string | null;
  setActiveMenu: (id: string | null) => void;
}

const MenubarCtx = React.createContext<MenubarContextValue>({
  activeMenu: null,
  setActiveMenu: () => {},
});

interface MenuContextValue {
  menuId: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
}

const MenuCtx = React.createContext<MenuContextValue | null>(null);

function useMenuCtx() {
  const ctx = React.useContext(MenuCtx);
  if (!ctx) throw new Error('Menubar menu components must be used within <MenubarMenu>');
  return ctx;
}

interface RadioGroupContextValue {
  value: string;
  onValueChange: (value: string) => void;
}

const RadioGroupCtx = React.createContext<RadioGroupContextValue | null>(null);

// ---------------------------------------------------------------------------
// Menubar (root)
// ---------------------------------------------------------------------------

export interface MenubarProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'>,
    CommonProps {
  children: React.ReactNode;
}

export const Menubar: React.FunctionComponent<MenubarProps> = (props) => {
  const {children, className, ...rest} = applyCommonProps(props);
  const [activeMenu, setActiveMenu] = React.useState<string | null>(null);

  return (
    <MenubarCtx.Provider value={{activeMenu, setActiveMenu}}>
      <div
        role="menubar"
        className={cx('ld-menubar-root', className)}
        {...rest}
      >
        {children}
      </div>
    </MenubarCtx.Provider>
  );
};

Menubar.displayName = 'Menubar';

// ---------------------------------------------------------------------------
// MenubarMenu
// ---------------------------------------------------------------------------

let _menuIdCounter = 0;

export interface MenubarMenuProps {
  children: React.ReactNode;
}

export const MenubarMenu: React.FunctionComponent<MenubarMenuProps> = ({children}) => {
  const [menuId] = React.useState(() => `ld-menubar-menu-${++_menuIdCounter}`);
  const {activeMenu, setActiveMenu} = React.useContext(MenubarCtx);
  const open = activeMenu === menuId;
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const onOpenChange = React.useCallback(
    (next: boolean) => setActiveMenu(next ? menuId : null),
    [menuId, setActiveMenu],
  );

  return (
    <MenuCtx.Provider value={{menuId, open, onOpenChange, triggerRef}}>
      {children}
    </MenuCtx.Provider>
  );
};

MenubarMenu.displayName = 'MenubarMenu';

// ---------------------------------------------------------------------------
// MenubarTrigger
// ---------------------------------------------------------------------------

export interface MenubarTriggerProps
  extends Omit<React.ComponentPropsWithoutRef<'button'>, 'className' | 'style'>,
    CommonProps {
  children: React.ReactNode;
}

export const MenubarTrigger = React.forwardRef<HTMLButtonElement, MenubarTriggerProps>(
  (props, ref) => {
    const {children, className, onClick, ...rest} = applyCommonProps(props);
    const {open, onOpenChange, triggerRef} = useMenuCtx();
    const {activeMenu} = React.useContext(MenubarCtx);

    return (
      <button
        ref={mergeRefs(triggerRef, ref)}
        type="button"
        role="menuitem"
        aria-expanded={open}
        aria-haspopup="menu"
        data-state={open ? 'open' : 'closed'}
        className={cx('ld-menubar-trigger', className)}
        onClick={(e) => {
          (onClick as React.MouseEventHandler<HTMLButtonElement> | undefined)?.(e);
          onOpenChange(!open);
        }}
        onMouseEnter={() => {
          if (activeMenu !== null) onOpenChange(true);
        }}
        {...rest}
      >
        {children}
      </button>
    );
  },
);

MenubarTrigger.displayName = 'MenubarTrigger';

// ---------------------------------------------------------------------------
// Portal
// ---------------------------------------------------------------------------

function MenubarPortal({children}: {children: React.ReactNode}) {
  return ReactDOM.createPortal(children, document.body);
}

// ---------------------------------------------------------------------------
// MenubarContent
// ---------------------------------------------------------------------------

export interface MenubarContentProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'>,
    CommonProps {
  children: React.ReactNode;
  align?: 'start' | 'center' | 'end';
  alignOffset?: number;
  sideOffset?: number;
}

export const MenubarContent = React.forwardRef<HTMLDivElement, MenubarContentProps>(
  (props, ref) => {
    const {
      children,
      className,
      align = 'start',
      alignOffset = -4,
      sideOffset = 8,
      style,
      ...rest
    } = applyCommonProps(props) as MenubarContentProps & {className?: string; style?: React.CSSProperties};
    const {open, onOpenChange, triggerRef} = useMenuCtx();
    const contentRef = React.useRef<HTMLDivElement>(null);
    const [pos, setPos] = React.useState<{top: number; left: number}>({top: 0, left: 0});

    React.useEffect(() => {
      if (!open || !triggerRef.current) return;
      const rect = triggerRef.current.getBoundingClientRect();
      let left = rect.left + alignOffset;
      if (align === 'end') left = rect.right + alignOffset;
      if (align === 'center') left = rect.left + rect.width / 2 + alignOffset;
      setPos({top: rect.bottom + sideOffset, left});
    }, [open, align, alignOffset, sideOffset, triggerRef]);

    React.useEffect(() => {
      if (!open) return;

      const handleClickOutside = (e: MouseEvent) => {
        if (
          contentRef.current && !contentRef.current.contains(e.target as Node) &&
          triggerRef.current && !triggerRef.current.contains(e.target as Node)
        ) {
          onOpenChange(false);
        }
      };

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          onOpenChange(false);
          triggerRef.current?.focus();
        }

        if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
          e.preventDefault();
          const items = contentRef.current?.querySelectorAll<HTMLElement>(
            '[role="menuitem"]:not([data-disabled]), [role="menuitemcheckbox"]:not([data-disabled]), [role="menuitemradio"]:not([data-disabled])',
          );
          if (!items || items.length === 0) return;
          const current = Array.from(items).findIndex((el) => el === document.activeElement);
          let next: number;
          if (e.key === 'ArrowDown') {
            next = current < items.length - 1 ? current + 1 : 0;
          } else {
            next = current > 0 ? current - 1 : items.length - 1;
          }
          items[next].focus();
        }
      };

      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }, [open, onOpenChange, triggerRef]);

    if (!open) return null;

    return (
      <MenubarPortal>
        <div
          ref={mergeRefs(contentRef, ref)}
          role="menu"
          data-state="open"
          className={cx('ld-menubar-content', className)}
          style={{
            position: 'fixed',
            top: pos.top,
            left: pos.left,
            zIndex: 50,
            ...style,
          }}
          {...rest}
        >
          {children}
        </div>
      </MenubarPortal>
    );
  },
);

MenubarContent.displayName = 'MenubarContent';

// ---------------------------------------------------------------------------
// MenubarItem
// ---------------------------------------------------------------------------

export interface MenubarItemProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'>,
    CommonProps {
  children: React.ReactNode;
  inset?: boolean;
  disabled?: boolean;
  onSelect?: () => void;
}

export const MenubarItem = React.forwardRef<HTMLDivElement, MenubarItemProps>(
  (props, ref) => {
    const {children, className, inset, disabled, onSelect, onClick, ...rest} = applyCommonProps(props);
    const {onOpenChange} = useMenuCtx();

    return (
      <div
        ref={ref}
        role="menuitem"
        tabIndex={disabled ? undefined : -1}
        data-disabled={disabled || undefined}
        className={cx('ld-menubar-item', inset && 'ld-menubar-item--inset', className)}
        onClick={(e) => {
          if (disabled) return;
          (onClick as React.MouseEventHandler<HTMLDivElement> | undefined)?.(e);
          onSelect?.();
          onOpenChange(false);
        }}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (!disabled) {
              onSelect?.();
              onOpenChange(false);
            }
          }
        }}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

MenubarItem.displayName = 'MenubarItem';

// ---------------------------------------------------------------------------
// MenubarSeparator
// ---------------------------------------------------------------------------

export interface MenubarSeparatorProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'>,
    CommonProps {}

export const MenubarSeparator = React.forwardRef<HTMLDivElement, MenubarSeparatorProps>(
  (props, ref) => {
    const {className, ...rest} = applyCommonProps(props);
    return (
      <div
        ref={ref}
        role="separator"
        className={cx('ld-menubar-separator', className)}
        {...rest}
      />
    );
  },
);

MenubarSeparator.displayName = 'MenubarSeparator';

// ---------------------------------------------------------------------------
// MenubarLabel
// ---------------------------------------------------------------------------

export interface MenubarLabelProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'>,
    CommonProps {
  children: React.ReactNode;
  inset?: boolean;
}

export const MenubarLabel = React.forwardRef<HTMLDivElement, MenubarLabelProps>(
  (props, ref) => {
    const {children, className, inset, ...rest} = applyCommonProps(props);
    return (
      <div
        ref={ref}
        className={cx('ld-menubar-label', inset && 'ld-menubar-label--inset', className)}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

MenubarLabel.displayName = 'MenubarLabel';

// ---------------------------------------------------------------------------
// MenubarCheckboxItem
// ---------------------------------------------------------------------------

export interface MenubarCheckboxItemProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'>,
    CommonProps {
  children: React.ReactNode;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
}

export const MenubarCheckboxItem = React.forwardRef<HTMLDivElement, MenubarCheckboxItemProps>(
  (props, ref) => {
    const {children, className, checked, onCheckedChange, disabled, onClick, ...rest} = applyCommonProps(props);
    const {onOpenChange} = useMenuCtx();

    return (
      <div
        ref={ref}
        role="menuitemcheckbox"
        aria-checked={checked}
        tabIndex={disabled ? undefined : -1}
        data-disabled={disabled || undefined}
        data-state={checked ? 'checked' : 'unchecked'}
        className={cx('ld-menubar-itemWithIndicator', className)}
        onClick={(e) => {
          if (disabled) return;
          (onClick as React.MouseEventHandler<HTMLDivElement> | undefined)?.(e);
          onCheckedChange?.(!checked);
          onOpenChange(false);
        }}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
            e.preventDefault();
            onCheckedChange?.(!checked);
            onOpenChange(false);
          }
        }}
        {...rest}
      >
        <span className="ld-menubar-indicator">
          {checked && <CheckIcon />}
        </span>
        {children}
      </div>
    );
  },
);

MenubarCheckboxItem.displayName = 'MenubarCheckboxItem';

// ---------------------------------------------------------------------------
// MenubarRadioGroup
// ---------------------------------------------------------------------------

export interface MenubarRadioGroupProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'>,
    CommonProps {
  children: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
}

export const MenubarRadioGroup = React.forwardRef<HTMLDivElement, MenubarRadioGroupProps>(
  (props, ref) => {
    const {children, className, value = '', onValueChange, ...rest} = applyCommonProps(props);
    return (
      <RadioGroupCtx.Provider value={{value, onValueChange: onValueChange || (() => {})}}>
        <div ref={ref} role="group" className={className} {...rest}>
          {children}
        </div>
      </RadioGroupCtx.Provider>
    );
  },
);

MenubarRadioGroup.displayName = 'MenubarRadioGroup';

// ---------------------------------------------------------------------------
// MenubarRadioItem
// ---------------------------------------------------------------------------

export interface MenubarRadioItemProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style' | 'value'>,
    CommonProps {
  children: React.ReactNode;
  value: string;
  disabled?: boolean;
}

export const MenubarRadioItem = React.forwardRef<HTMLDivElement, MenubarRadioItemProps>(
  (props, ref) => {
    const {children, className, value, disabled, onClick, ...rest} = applyCommonProps(props);
    const {onOpenChange} = useMenuCtx();
    const radioGroup = React.useContext(RadioGroupCtx);
    const checked = radioGroup?.value === value;

    return (
      <div
        ref={ref}
        role="menuitemradio"
        aria-checked={checked}
        tabIndex={disabled ? undefined : -1}
        data-disabled={disabled || undefined}
        data-state={checked ? 'checked' : 'unchecked'}
        className={cx('ld-menubar-itemWithIndicator', className)}
        onClick={(e) => {
          if (disabled) return;
          (onClick as React.MouseEventHandler<HTMLDivElement> | undefined)?.(e);
          radioGroup?.onValueChange(value);
          onOpenChange(false);
        }}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && !disabled) {
            e.preventDefault();
            radioGroup?.onValueChange(value);
            onOpenChange(false);
          }
        }}
        {...rest}
      >
        <span className="ld-menubar-indicator">
          {checked && <CircleIcon className="ld-menubar-radioDot" />}
        </span>
        {children}
      </div>
    );
  },
);

MenubarRadioItem.displayName = 'MenubarRadioItem';

// ---------------------------------------------------------------------------
// MenubarSub
// ---------------------------------------------------------------------------

interface SubContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SubCtx = React.createContext<SubContextValue | null>(null);

export interface MenubarSubProps {
  children: React.ReactNode;
}

export const MenubarSub: React.FunctionComponent<MenubarSubProps> = ({children}) => {
  const [open, setOpen] = React.useState(false);
  return (
    <SubCtx.Provider value={{open, onOpenChange: setOpen}}>
      {children}
    </SubCtx.Provider>
  );
};

MenubarSub.displayName = 'MenubarSub';

// ---------------------------------------------------------------------------
// MenubarSubTrigger
// ---------------------------------------------------------------------------

export interface MenubarSubTriggerProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'>,
    CommonProps {
  children: React.ReactNode;
  inset?: boolean;
}

export const MenubarSubTrigger = React.forwardRef<HTMLDivElement, MenubarSubTriggerProps>(
  (props, ref) => {
    const {children, className, inset, onMouseEnter, onMouseLeave, ...rest} = applyCommonProps(props);
    const sub = React.useContext(SubCtx);

    return (
      <div
        ref={ref}
        role="menuitem"
        aria-haspopup="menu"
        data-state={sub?.open ? 'open' : 'closed'}
        className={cx(
          'ld-menubar-subTrigger',
          inset && 'ld-menubar-item--inset',
          className,
        )}
        onMouseEnter={(e) => {
          sub?.onOpenChange(true);
          (onMouseEnter as React.MouseEventHandler<HTMLDivElement> | undefined)?.(e);
        }}
        onMouseLeave={(e) => {
          sub?.onOpenChange(false);
          (onMouseLeave as React.MouseEventHandler<HTMLDivElement> | undefined)?.(e);
        }}
        {...rest}
      >
        {children}
        <ChevronRightIcon className="ld-menubar-chevron" />
      </div>
    );
  },
);

MenubarSubTrigger.displayName = 'MenubarSubTrigger';

// ---------------------------------------------------------------------------
// MenubarSubContent
// ---------------------------------------------------------------------------

export interface MenubarSubContentProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'>,
    CommonProps {
  children: React.ReactNode;
}

export const MenubarSubContent = React.forwardRef<HTMLDivElement, MenubarSubContentProps>(
  (props, ref) => {
    const {children, className, ...rest} = applyCommonProps(props);
    const sub = React.useContext(SubCtx);
    if (!sub?.open) return null;

    return (
      <div
        ref={ref}
        role="menu"
        data-state="open"
        className={cx('ld-menubar-content', className)}
        style={{position: 'absolute', left: '100%', top: 0}}
        {...rest}
      >
        {children}
      </div>
    );
  },
);

MenubarSubContent.displayName = 'MenubarSubContent';

// ---------------------------------------------------------------------------
// MenubarShortcut
// ---------------------------------------------------------------------------

export interface MenubarShortcutProps
  extends Omit<React.ComponentPropsWithoutRef<'span'>, 'className' | 'style'>,
    CommonProps {
  children: React.ReactNode;
}

export const MenubarShortcut: React.FunctionComponent<MenubarShortcutProps> = (props) => {
  const {children, className, ...rest} = applyCommonProps(props);
  return (
    <span className={cx('ld-menubar-shortcut', className)} {...rest}>
      {children}
    </span>
  );
};

MenubarShortcut.displayName = 'MenubarShortcut';
