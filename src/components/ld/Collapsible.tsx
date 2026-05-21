'use client';
// @refresh reset

/**
 * @module Collapsible
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
import {cx, applyCommonProps, type CommonProps} from './common';
// ---------------------------------------------------------------------------
// Collapsible Context
// ---------------------------------------------------------------------------

interface CollapsibleContextValue {
  open: boolean;
  toggle: () => void;
  disabled: boolean;
}

const CollapsibleCtx = React.createContext<CollapsibleContextValue | null>(null);

function useCollapsible(): CollapsibleContextValue {
  const ctx = React.useContext(CollapsibleCtx);
  if (!ctx) throw new Error('Collapsible.* must be used within <Collapsible>');
  return ctx;
}

// ---------------------------------------------------------------------------
// Collapsible (Root)
// ---------------------------------------------------------------------------

export interface CollapsibleProps extends CommonProps {
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  disabled?: boolean;
  children?: React.ReactNode;
}

export const Collapsible: React.FunctionComponent<CollapsibleProps> = (props) => {
  const {
    className,
    open: controlledOpen,
    defaultOpen = false,
    onOpenChange,
    disabled = false,
    children,
    ...rest
  } = applyCommonProps(props);

  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const toggle = React.useCallback(() => {
    if (disabled) return;
    const next = !isOpen;
    if (!isControlled) setInternalOpen(next);
    onOpenChange?.(next);
  }, [disabled, isOpen, isControlled, onOpenChange]);

  const ctxValue = React.useMemo(
    () => ({open: isOpen, toggle, disabled}),
    [isOpen, toggle, disabled],
  );

  return (
    <CollapsibleCtx.Provider value={ctxValue}>
      <div
        className={cx('ld-collapsible-root', className)}
        data-state={isOpen ? 'open' : 'closed'}
        data-disabled={disabled || undefined}
        {...rest}
      >
        {children}
      </div>
    </CollapsibleCtx.Provider>
  );
};

Collapsible.displayName = 'Collapsible';

// ---------------------------------------------------------------------------
// CollapsibleTrigger
// ---------------------------------------------------------------------------

export interface CollapsibleTriggerProps extends CommonProps {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export const CollapsibleTrigger: React.FunctionComponent<CollapsibleTriggerProps> = (props) => {
  const {className, onClick, children, ...rest} = applyCommonProps(props);
  const {open, toggle, disabled} = useCollapsible();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    toggle();
    onClick?.(e);
  };

  return (
    <button
      type="button"
      aria-expanded={open}
      disabled={disabled}
      data-state={open ? 'open' : 'closed'}
      data-disabled={disabled || undefined}
      className={cx('ld-collapsible-trigger', className)}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </button>
  );
};

CollapsibleTrigger.displayName = 'CollapsibleTrigger';

// ---------------------------------------------------------------------------
// CollapsibleContent
// ---------------------------------------------------------------------------

export interface CollapsibleContentProps extends CommonProps {
  children?: React.ReactNode;
}

export const CollapsibleContent: React.FunctionComponent<CollapsibleContentProps> = (props) => {
  const {className, children, ...rest} = applyCommonProps(props);
  const {open} = useCollapsible();

  if (!open) return null;

  return (
    <div
      data-state={open ? 'open' : 'closed'}
      className={cx('ld-collapsible-content', className)}
      {...rest}
    >
      {children}
    </div>
  );
};

CollapsibleContent.displayName = 'CollapsibleContent';
