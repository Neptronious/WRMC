'use client';
// @refresh reset

/**
 * @module NavigationMenu
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
import {cx, applyCommonProps, useStableId, type CommonProps} from './common';
// ---------------------------------------------------------------------------
// Inline SVG Icon
// ---------------------------------------------------------------------------

const ChevronDown: React.FunctionComponent<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M6 9l6 6 6-6" />
  </svg>
);

// ---------------------------------------------------------------------------
// NavMenu Context
// ---------------------------------------------------------------------------

interface NavMenuContextValue {
  activeItem: string | null;
  setActiveItem: (id: string | null) => void;
}

const NavMenuCtx = React.createContext<NavMenuContextValue>({
  activeItem: null,
  setActiveItem: () => {},
});

// ---------------------------------------------------------------------------
// Item Context
// ---------------------------------------------------------------------------

interface ItemContextValue {
  itemId: string;
}

const ItemCtx = React.createContext<ItemContextValue>({itemId: ''});

// ---------------------------------------------------------------------------
// NavigationMenu (Root)
// ---------------------------------------------------------------------------

export interface NavigationMenuProps extends CommonProps {
  children?: React.ReactNode;
}

export const NavigationMenu: React.FunctionComponent<NavigationMenuProps> = (props) => {
  const {className, children, ...rest} = applyCommonProps(props);
  const [activeItem, setActiveItem] = React.useState<string | null>(null);

  const ctxValue = React.useMemo(
    () => ({activeItem, setActiveItem}),
    [activeItem],
  );

  return (
    <NavMenuCtx.Provider value={ctxValue}>
      <nav
        className={cx('ld-nav-menu-root', className)}
        {...rest}
      >
        {children}
        <NavigationMenuViewport />
      </nav>
    </NavMenuCtx.Provider>
  );
};

NavigationMenu.displayName = 'NavigationMenu';

// ---------------------------------------------------------------------------
// NavigationMenuList
// ---------------------------------------------------------------------------

export interface NavigationMenuListProps extends CommonProps {
  children?: React.ReactNode;
}

export const NavigationMenuList: React.FunctionComponent<NavigationMenuListProps> = (props) => {
  const {className, children, ...rest} = applyCommonProps(props);

  return (
    <ul className={cx('ld-nav-menu-list', className)} {...rest}>
      {children}
    </ul>
  );
};

NavigationMenuList.displayName = 'NavigationMenuList';

// ---------------------------------------------------------------------------
// NavigationMenuItem
// ---------------------------------------------------------------------------

export interface NavigationMenuItemProps extends CommonProps {
  children?: React.ReactNode;
}

export const NavigationMenuItem: React.FunctionComponent<NavigationMenuItemProps> = (props) => {
  const {className, children, ...rest} = applyCommonProps(props);
  const itemId = useStableId();

  const ctxValue = React.useMemo(() => ({itemId}), [itemId]);

  return (
    <ItemCtx.Provider value={ctxValue}>
      <li
        className={cx('ld-nav-menu-item', className)}
        {...rest}
      >
        {children}
      </li>
    </ItemCtx.Provider>
  );
};

NavigationMenuItem.displayName = 'NavigationMenuItem';

// ---------------------------------------------------------------------------
// NavigationMenuTrigger
// ---------------------------------------------------------------------------

export interface NavigationMenuTriggerProps extends CommonProps {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const NavigationMenuTrigger: React.FunctionComponent<NavigationMenuTriggerProps> = (props) => {
  const {className, children, onClick, ...rest} = applyCommonProps(props);
  const {activeItem, setActiveItem} = React.useContext(NavMenuCtx);
  const {itemId} = React.useContext(ItemCtx);
  const isOpen = activeItem === itemId;

  return (
    <button
      type="button"
      className={cx('ld-nav-menu-trigger', className)}
      data-state={isOpen ? 'open' : 'closed'}
      aria-expanded={isOpen}
      onClick={(e) => {
        onClick?.(e);
        setActiveItem(isOpen ? null : itemId);
      }}
      onMouseEnter={() => setActiveItem(itemId)}
      {...rest}
    >
      {children}{' '}
      <ChevronDown
        className={cx('ld-nav-menu-chevron')}
        aria-hidden="true"
      />
    </button>
  );
};

NavigationMenuTrigger.displayName = 'NavigationMenuTrigger';

// ---------------------------------------------------------------------------
// NavigationMenuContent
// ---------------------------------------------------------------------------

export interface NavigationMenuContentProps extends CommonProps {
  children?: React.ReactNode;
}

export const NavigationMenuContent: React.FunctionComponent<NavigationMenuContentProps> = (props) => {
  const {className, children, ...rest} = applyCommonProps(props);
  const {activeItem} = React.useContext(NavMenuCtx);
  const {itemId} = React.useContext(ItemCtx);
  const isOpen = activeItem === itemId;

  if (!isOpen) return null;

  return (
    <div
      data-state="open"
      className={cx('ld-nav-menu-content', className)}
      {...rest}
    >
      {children}
    </div>
  );
};

NavigationMenuContent.displayName = 'NavigationMenuContent';

// ---------------------------------------------------------------------------
// NavigationMenuLink
// ---------------------------------------------------------------------------

export interface NavigationMenuLinkProps extends CommonProps {
  active?: boolean;
  onSelect?: () => void;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
  children?: React.ReactNode;
}

export const NavigationMenuLink: React.FunctionComponent<NavigationMenuLinkProps> = (props) => {
  const {className, active, onSelect, onClick, children, ...rest} = applyCommonProps(props);
  const {setActiveItem} = React.useContext(NavMenuCtx);

  return (
    <a
      data-active={active || undefined}
      className={cx('ld-nav-menu-link', className)}
      onClick={(e) => {
        onClick?.(e);
        onSelect?.();
        setActiveItem(null);
      }}
      {...rest}
    >
      {children}
    </a>
  );
};

NavigationMenuLink.displayName = 'NavigationMenuLink';

// ---------------------------------------------------------------------------
// NavigationMenuViewport
// ---------------------------------------------------------------------------

export interface NavigationMenuViewportProps extends CommonProps {
  children?: React.ReactNode;
}

export const NavigationMenuViewport: React.FunctionComponent<NavigationMenuViewportProps> = (props) => {
  const {className, ...rest} = applyCommonProps(props);
  const {activeItem, setActiveItem} = React.useContext(NavMenuCtx);

  React.useEffect(() => {
    if (!activeItem) return;

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('nav')) {
        setActiveItem(null);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActiveItem(null);
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [activeItem, setActiveItem]);

  return (
    <div className="ld-nav-menu-viewport-wrapper">
      <div
        data-state={activeItem ? 'open' : 'closed'}
        className={cx('ld-nav-menu-viewport', className)}
        style={{
          display: activeItem ? undefined : 'none',
        }}
        {...rest}
      />
    </div>
  );
};

NavigationMenuViewport.displayName = 'NavigationMenuViewport';

// ---------------------------------------------------------------------------
// NavigationMenuIndicator
// ---------------------------------------------------------------------------

export interface NavigationMenuIndicatorProps extends CommonProps {
  children?: React.ReactNode;
}

export const NavigationMenuIndicator: React.FunctionComponent<NavigationMenuIndicatorProps> = (props) => {
  const {className, ...rest} = applyCommonProps(props);
  const {activeItem} = React.useContext(NavMenuCtx);

  return (
    <div
      data-state={activeItem ? 'visible' : 'hidden'}
      className={cx('ld-nav-menu-indicator', className)}
      style={{display: activeItem ? undefined : 'none'}}
      {...rest}
    >
      <div className="ld-nav-menu-indicator-arrow" />
    </div>
  );
};

NavigationMenuIndicator.displayName = 'NavigationMenuIndicator';
