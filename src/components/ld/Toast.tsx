'use client';
// @refresh reset

/**
 * @module Toast
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
import {cx, useStableId, CSSTransition, CloseIcon, InfoCircleIcon, CheckCircleIcon, WarningIcon, ExclamationCircleIcon} from './common';
import * as ReactDOM from 'react-dom';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type ToastIntent = 'info' | 'success' | 'warning' | 'error';

export interface ToastOptions {
  title: string;
  body?: string;
  intent?: ToastIntent;
  timeout?: number;
  action?: {label: string; onClick: () => void};
}

interface InternalToast extends ToastOptions {
  id: string;
}

// ---------------------------------------------------------------------------
// Toast Context
// ---------------------------------------------------------------------------

interface ToastContextValue {
  dispatchToast: (options: ToastOptions) => void;
  dismissToast: (id: string) => void;
}

const ToastContext = React.createContext<ToastContextValue>({
  dispatchToast: () => {},
  dismissToast: () => {},
});

// ---------------------------------------------------------------------------
// useToastController
// ---------------------------------------------------------------------------

export function useToastController(): ToastContextValue {
  return React.useContext(ToastContext);
}

// ---------------------------------------------------------------------------
// Portal helper
// ---------------------------------------------------------------------------

function useToastPortal() {
  const [container] = React.useState(() => {
    if (typeof document === 'undefined') return null;
    const el = document.createElement('div');
    el.setAttribute('data-ld-toast-portal', '');
    return el;
  });

  React.useEffect(() => {
    if (!container) return;
    document.body.appendChild(container);
    return () => { document.body.removeChild(container); };
  }, [container]);

  return container;
}

// ---------------------------------------------------------------------------
// Auto-dismiss duration
// ---------------------------------------------------------------------------

function getAutoDismissDuration(toast: ToastOptions): number {
  if (toast.timeout !== undefined) return toast.timeout;
  const textLength = toast.title.length + (toast.body?.length || 0);
  return textLength > 120 ? 3500 + (textLength - 120) * 60 : 3500;
}

// ---------------------------------------------------------------------------
// Intent icon
// ---------------------------------------------------------------------------

function IntentIcon({intent}: {intent: ToastIntent}) {
  const iconMap: Record<ToastIntent, React.ElementType> = {
    info: InfoCircleIcon,
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ExclamationCircleIcon,
  };
  const Icon = iconMap[intent];
  return <span className="ld-toast-intentIcon"><Icon size="small" /></span>;
}

// ---------------------------------------------------------------------------
// Single Toast item
// ---------------------------------------------------------------------------

interface ToastItemProps {
  toast: InternalToast;
  onDismiss: (id: string) => void;
}

const ToastItem: React.FunctionComponent<ToastItemProps> = ({toast, onDismiss}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [visible, setVisible] = React.useState(false);
  const [paused, setPaused] = React.useState(false);
  const timerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const intent = toast.intent || 'info';
  const duration = getAutoDismissDuration(toast);

  // Animate in
  React.useEffect(() => {
    setVisible(true);
  }, []);

  // Auto-dismiss timer with pause-on-hover
  React.useEffect(() => {
    if (paused || duration <= 0) return;
    timerRef.current = setTimeout(() => setVisible(false), duration);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [paused, duration, toast.id]);

  const handleDismiss = () => setVisible(false);

  return (
    <CSSTransition
      classNames={{
        enter: 'ld-toast-itemEnter',
        enterActive: 'ld-toast-itemEnterActive',
        exit: 'ld-toast-itemExit',
        exitActive: 'ld-toast-itemExitActive',
      }}
      in={visible}
      mountOnEnter
      nodeRef={ref}
      onExited={() => onDismiss(toast.id)}
      timeout={{enter: 300, exit: 200}}
      unmountOnExit
    >
      <div
        className={cx('ld-toast-item', `ld-toast-${intent}`)}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        ref={ref}
        role="status"
        aria-live="polite"
      >
        <IntentIcon intent={intent} />
        <div className="ld-toast-content">
          <div className="ld-toast-title">{toast.title}</div>
          {toast.body && <div className="ld-toast-body">{toast.body}</div>}
          {toast.action && (
            <button
              className="ld-toast-action"
              onClick={() => {
                toast.action!.onClick();
                handleDismiss();
              }}
              type="button"
            >
              {toast.action.label}
            </button>
          )}
        </div>
        <button
          aria-label="Dismiss"
          className="ld-toast-close"
          onClick={handleDismiss}
          type="button"
        >
          <CloseIcon size="small" />
        </button>
      </div>
    </CSSTransition>
  );
};

// ---------------------------------------------------------------------------
// Toaster (provider)
// ---------------------------------------------------------------------------

export interface ToasterProps {
  children: React.ReactNode;
}

let _toastCounter = 0;

export const Toaster: React.FunctionComponent<ToasterProps> = ({children}) => {
  const [toasts, setToasts] = React.useState<InternalToast[]>([]);
  const portalContainer = useToastPortal();

  const dispatchToast = React.useCallback((options: ToastOptions) => {
    const id = `ld-toast-${++_toastCounter}`;
    setToasts((prev) => [...prev, {...options, id}]);
  }, []);

  const dismissToast = React.useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const ctxValue = React.useMemo(
    () => ({dispatchToast, dismissToast}),
    [dispatchToast, dismissToast]
  );

  return (
    <ToastContext.Provider value={ctxValue}>
      {children}
      {portalContainer &&
        ReactDOM.createPortal(
          <div className="ld-toast-container">
            {toasts.map((toast) => (
              <ToastItem key={toast.id} toast={toast} onDismiss={dismissToast} />
            ))}
          </div>,
          portalContainer
        )}
    </ToastContext.Provider>
  );
};

Toaster.displayName = 'Toaster';
