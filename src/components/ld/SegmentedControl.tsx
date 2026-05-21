'use client';
// @refresh reset

/**
 * @module SegmentedControl
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
import {cx, applyCommonProps, type CommonProps, emit} from './common';
// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SegmentedControlItem {
  /** Unique value for this segment */
  value: string;
  /** Label displayed in the segment */
  label: React.ReactNode;
  /** Optional leading icon */
  icon?: React.ReactNode;
  /** Disable this individual segment */
  disabled?: boolean;
}

export interface SegmentedControlProps extends CommonProps {
  /**
   * The list of segment items (2-5 items).
   */
  items: SegmentedControlItem[];

  /**
   * The currently selected value (controlled).
   */
  value: string;

  /**
   * Called when the user selects a segment.
   */
  onChange: (value: string) => void;

  /**
   * Accessible label for the control group.
   */
  'aria-label'?: string;

  /**
   * Disable all segments.
   * @default false
   */
  disabled?: boolean;

  /**
   * If true the control stretches to fill its container width.
   * @default false
   */
  isFullWidth?: boolean;
}

// ---------------------------------------------------------------------------
// SegmentedControl
// ---------------------------------------------------------------------------

function getPosition(index: number, count: number): 'left' | 'center' | 'right' {
  if (index === 0) return 'left';
  if (index === count - 1) return 'right';
  return 'center';
}

export const SegmentedControl: React.FunctionComponent<SegmentedControlProps> = (props) => {
  const {
    className,
    items,
    value,
    onChange,
    'aria-label': ariaLabel,
    disabled = false,
    isFullWidth = false,
    ...rest
  } = applyCommonProps(props);

  const count = items.length;

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cx(
        'ld-segmented-control-root',
        isFullWidth && 'ld-segmented-control-root--full-width',
        className,
      )}
      {...rest}
    >
      {items.map((item, index) => {
        const isActive = item.value === value;
        const isDisabled = disabled || item.disabled;
        const position = getPosition(index, count);

        return (
          <button
            key={item.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            disabled={isDisabled}
            className={cx(
              'ld-segmented-control-segment',
              `ld-segmented-control-segment--${position}`,
              isActive && 'ld-segmented-control-segment--active',
              isDisabled && 'ld-segmented-control-segment--disabled',
            )}
            onClick={() => {
              if (!isDisabled) { emit('ui:segment:change', {value: item.value}); onChange(item.value); }
            }}
          >
            {item.icon && (
              <span className="ld-segmented-control-icon" aria-hidden="true">
                {item.icon}
              </span>
            )}
            <span className="ld-segmented-control-label">{item.label}</span>
          </button>
        );
      })}
    </div>
  );
};

SegmentedControl.displayName = 'SegmentedControl';
