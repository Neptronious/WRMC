// @refresh reset

/**
 * @module WCPHeartView
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
import {cx, applyCommonProps, emit} from './common';
// Inline Heart SVG (outline)
function HeartOutline({className}: {className?: string}) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={className}>
      <path fillRule="evenodd" clipRule="evenodd" d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35ZM16.5 5C15.12 5 13.84 5.67 13.04 6.78L12 8.18L10.96 6.78C10.16 5.67 8.88 5 7.5 5C5.52 5 4 6.52 4 8.5C4 11.29 7.13 14.13 11.57 18.11L12 18.49L12.43 18.11C16.87 14.13 20 11.29 20 8.5C20 6.52 18.48 5 16.5 5Z" fill="currentColor" />
    </svg>
  );
}

// Inline HeartFill SVG
function HeartFilled({className}: {className?: string}) {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className={className}>
      <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.27 2 8.5C2 5.41 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.08C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.41 22 8.5C22 12.27 18.6 15.36 13.45 20.03L12 21.35Z" fill="currentColor" />
    </svg>
  );
}

export interface WCPHeartViewProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style' | 'onChange'> {
  activated?: boolean;
  defaultActivated?: boolean;
  onChange?: (activated: boolean) => void;
  size?: 'small' | 'medium';
  listName?: string;
  onViewList?: () => void;
  /** Called when mobile snackbar should fire. Consumer provides snackbar implementation. */
  onSnackbar?: (message: string, actionLabel?: string, onAction?: () => void) => void;
  snackbarDuration?: number;
  disabled?: boolean;
  'aria-label'?: string;
  /** @default 'left' */
  calloutPosition?: 'left' | 'right' | 'bottom' | 'top';
  UNSAFE_className?: string;
  UNSAFE_style?: React.CSSProperties;
}

type CalloutType = 'add' | 'saved' | 'removed' | null;

const SIZE_CLASS: Record<string, string> = {
  small: 'ld-wcp-heartview-sizeSmall',
  medium: 'ld-wcp-heartview-sizeMedium',
};

const CALLOUT_POS_CLASS: Record<string, string> = {
  left: 'ld-wcp-heartview-calloutLeft',
  right: 'ld-wcp-heartview-calloutRight',
  bottom: 'ld-wcp-heartview-calloutBottom',
  top: 'ld-wcp-heartview-calloutTop',
};

export const WCPHeartView: React.FunctionComponent<WCPHeartViewProps> = (props) => {
  const {
    activated: controlledActivated, defaultActivated = false, onChange,
    size, listName = 'My List', onViewList, onSnackbar,
    snackbarDuration = 3500, disabled = false, 'aria-label': ariaLabel,
    calloutPosition = 'left', className, ...rest
  } = applyCommonProps(props);

  const isControlled = controlledActivated !== undefined;
  const [internalActivated, setInternalActivated] = React.useState(defaultActivated);
  const activated = isControlled ? controlledActivated : internalActivated;

  const [callout, setCallout] = React.useState<CalloutType>(null);
  const calloutTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const hoverTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const isHoveredRef = React.useRef(false);
  const justToggledRef = React.useRef(false);

  const toggle = () => {
    if (disabled) return;
    const nextActivated = !activated;
    if (!isControlled) setInternalActivated(nextActivated);
    emit('ui:heart:toggle', {activated: nextActivated, listName});
    onChange?.(nextActivated);
    justToggledRef.current = true;

    if (calloutTimerRef.current) clearTimeout(calloutTimerRef.current);
    setCallout(nextActivated ? 'saved' : 'removed');
    calloutTimerRef.current = setTimeout(() => {
      justToggledRef.current = false;
      setCallout(isHoveredRef.current ? (nextActivated ? 'saved' : 'add') : null);
    }, 2000);

    const msg = nextActivated ? `Saved to favorites: ${listName}` : `Removed from favorites: ${listName}`;
    onSnackbar?.(msg, nextActivated ? 'View' : undefined, nextActivated ? onViewList : undefined);
  };

  const handleMouseEnter = () => { isHoveredRef.current = true; if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current); if (!justToggledRef.current) setCallout(activated ? 'saved' : 'add'); };
  const handleMouseLeave = () => { isHoveredRef.current = false; hoverTimerRef.current = setTimeout(() => { if (!justToggledRef.current) setCallout(null); }, 100); };

  React.useEffect(() => () => {
    if (calloutTimerRef.current) clearTimeout(calloutTimerRef.current);
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
  }, []);

  const defaultAriaLabel = activated ? 'Remove from favorites' : 'Add to favorites';

  const calloutText = (() => {
    if (callout === 'add') return 'Add to favorites';
    if (callout === 'saved') return `Saved to favorites: ${listName}`;
    if (callout === 'removed') return `Removed from favorites: ${listName}`;
    return null;
  })();

  return (
    <div className={cx('ld-wcp-heartview-wrapper', className)} {...rest}>
      {callout && calloutText && (
        <div className={cx('ld-wcp-heartview-callout', CALLOUT_POS_CLASS[calloutPosition])} role="tooltip">
          <span className="ld-wcp-heartview-calloutText">{calloutText}</span>
          {callout === 'saved' && onViewList && (
            <button type="button" className="ld-wcp-heartview-calloutAction" onClick={(e) => { e.stopPropagation(); onViewList(); }}>View</button>
          )}
          <span className="ld-wcp-heartview-calloutArrow" aria-hidden="true" />
        </div>
      )}
      <button
        type="button"
        className={cx(
          'ld-wcp-heartview-heartButton',
          activated && 'ld-wcp-heartview-activated',
          size ? SIZE_CLASS[size] : 'ld-wcp-heartview-sizeResponsive',
          disabled && 'ld-wcp-heartview-disabled'
        )}
        onClick={toggle}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        aria-label={ariaLabel ?? defaultAriaLabel}
        aria-pressed={activated}
        disabled={disabled}
      >
        <span className="ld-wcp-heartview-iconWrap">
          {activated ? <HeartFilled className="ld-wcp-heartview-iconFill" /> : <HeartOutline className="ld-wcp-heartview-iconOutline" />}
        </span>
      </button>
    </div>
  );
};

WCPHeartView.displayName = 'WCPHeartView';
