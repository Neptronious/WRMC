'use client';
// @refresh reset

/**
 * @module Chart
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
import {cx, applyCommonProps} from './common';
import type {CommonProps} from './common';

// ---------------------------------------------------------------------------
// Config types
// ---------------------------------------------------------------------------

export type ChartConfig = {
  [key: string]: {
    label?: React.ReactNode;
    color?: string;
  };
};

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

interface ChartContextValue {
  config: ChartConfig;
  width: number;
  height: number;
}

const ChartCtx = React.createContext<ChartContextValue>({
  config: {},
  width: 0,
  height: 0,
});

function useChart() {
  const ctx = React.useContext(ChartCtx);
  if (!ctx) throw new Error('useChart must be used within a <ChartContainer />');
  return ctx;
}

// ---------------------------------------------------------------------------
// Internal helpers
// ---------------------------------------------------------------------------

const PADDING = {top: 20, right: 20, bottom: 40, left: 50};

function getColor(config: ChartConfig, key: string, fallback: string): string {
  return config[key]?.color || fallback;
}

function niceScale(minVal: number, maxVal: number, ticks: number): number[] {
  if (maxVal === minVal) {
    return [minVal - 1, minVal, minVal + 1];
  }
  const range = maxVal - minVal;
  const roughStep = range / (ticks - 1);
  const magnitude = Math.pow(10, Math.floor(Math.log10(roughStep)));
  const residual = roughStep / magnitude;
  let niceStep: number;
  if (residual <= 1.5) niceStep = 1 * magnitude;
  else if (residual <= 3) niceStep = 2 * magnitude;
  else if (residual <= 7) niceStep = 5 * magnitude;
  else niceStep = 10 * magnitude;

  const niceMin = Math.floor(minVal / niceStep) * niceStep;
  const niceMax = Math.ceil(maxVal / niceStep) * niceStep;

  const result: number[] = [];
  for (let v = niceMin; v <= niceMax + niceStep * 0.001; v += niceStep) {
    result.push(Math.round(v * 1000) / 1000);
  }
  return result;
}

// ---------------------------------------------------------------------------
// ChartContainer
// ---------------------------------------------------------------------------

export interface ChartContainerProps
  extends Omit<React.ComponentPropsWithoutRef<'div'>, 'className' | 'style'>,
    CommonProps {
  children: React.ReactNode;
  config: ChartConfig;
}

export const ChartContainer = React.forwardRef<HTMLDivElement, ChartContainerProps>(
  (props, ref) => {
    const {children, className, config, ...rest} = applyCommonProps(props);
    const containerRef = React.useRef<HTMLDivElement>(null);
    const [dims, setDims] = React.useState({width: 600, height: 300});

    React.useEffect(() => {
      const el = containerRef.current;
      if (!el) return;

      const observer = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const {width, height} = entry.contentRect;
          if (width > 0 && height > 0) {
            setDims({width, height});
          }
        }
      });

      observer.observe(el);
      return () => observer.disconnect();
    }, []);

    const mergedRef = React.useCallback(
      (node: HTMLDivElement | null) => {
        (containerRef as React.MutableRefObject<HTMLDivElement | null>).current = node;
        if (typeof ref === 'function') ref(node);
        else if (ref) (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
      },
      [ref],
    );

    return (
      <ChartCtx.Provider value={{config, width: dims.width, height: dims.height}}>
        <div
          ref={mergedRef}
          className={cx('ld-chart-container', className)}
          {...rest}
        >
          {children}
        </div>
      </ChartCtx.Provider>
    );
  },
);

ChartContainer.displayName = 'ChartContainer';

// ---------------------------------------------------------------------------
// ChartBar
// ---------------------------------------------------------------------------

export interface ChartBarProps extends CommonProps {
  data: Record<string, unknown>[];
  dataKeys: string[];
  xKey: string;
}

export const ChartBar: React.FunctionComponent<ChartBarProps> = (props) => {
  const {data, dataKeys, xKey, className} = applyCommonProps(props) as ChartBarProps & {className?: string};
  const {config, width, height} = useChart();
  const [tooltip, setTooltip] = React.useState<{
    x: number;
    y: number;
    items: {key: string; value: number; color: string}[];
    label: string;
  } | null>(null);

  if (!data.length || width === 0 || height === 0) return null;

  const plotLeft = PADDING.left;
  const plotRight = width - PADDING.right;
  const plotTop = PADDING.top;
  const plotBottom = height - PADDING.bottom;
  const plotW = plotRight - plotLeft;
  const plotH = plotBottom - plotTop;

  // Compute max value
  let maxVal = 0;
  for (const row of data) {
    for (const key of dataKeys) {
      const v = Number(row[key]) || 0;
      if (v > maxVal) maxVal = v;
    }
  }

  const yTicks = niceScale(0, maxVal, 5);
  const yMax = yTicks[yTicks.length - 1];

  const groupWidth = plotW / data.length;
  const barPadding = groupWidth * 0.2;
  const totalBarWidth = groupWidth - barPadding * 2;
  const barWidth = totalBarWidth / dataKeys.length;

  const defaultColors = ['#0071DC', '#993EF4', '#4DBDF5', '#2E2F32', '#74767C'];

  return (
    <svg
      className={cx('ld-chart-svg', className)}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
    >
      {/* Grid lines */}
      {yTicks.map((tick) => {
        const y = plotBottom - (tick / yMax) * plotH;
        return (
          <g key={tick}>
            <line
              x1={plotLeft}
              y1={y}
              x2={plotRight}
              y2={y}
              stroke="#cccccc"
              strokeOpacity={0.5}
              strokeDasharray="3 3"
            />
            <text
              x={plotLeft - 8}
              y={y + 4}
              textAnchor="end"
              className="ld-chart-axisLabel"
            >
              {tick}
            </text>
          </g>
        );
      })}

      {/* Bars + x-axis labels */}
      {data.map((row, i) => {
        const groupX = plotLeft + i * groupWidth;
        const labelX = groupX + groupWidth / 2;

        return (
          <g key={i}>
            {/* X-axis label */}
            <text
              x={labelX}
              y={plotBottom + 20}
              textAnchor="middle"
              className="ld-chart-axisLabel"
            >
              {String(row[xKey] || '')}
            </text>

            {/* Bars for each data key */}
            {dataKeys.map((key, ki) => {
              const v = Number(row[key]) || 0;
              const barH = (v / yMax) * plotH;
              const barX = groupX + barPadding + ki * barWidth;
              const barY = plotBottom - barH;
              const color = getColor(config, key, defaultColors[ki % defaultColors.length]);

              return (
                <rect
                  key={key}
                  x={barX}
                  y={barY}
                  width={Math.max(barWidth - 2, 1)}
                  height={barH}
                  rx={3}
                  fill={color}
                  className="ld-chart-bar"
                  onMouseEnter={(e) => {
                    const svgEl = (e.target as SVGElement).closest('svg');
                    if (!svgEl) return;
                    const pt = svgEl.getBoundingClientRect();
                    setTooltip({
                      x: e.clientX - pt.left,
                      y: e.clientY - pt.top - 10,
                      items: dataKeys.map((dk, dki) => ({
                        key: dk,
                        value: Number(row[dk]) || 0,
                        color: getColor(config, dk, defaultColors[dki % defaultColors.length]),
                      })),
                      label: String(row[xKey] || ''),
                    });
                  }}
                  onMouseLeave={() => setTooltip(null)}
                />
              );
            })}
          </g>
        );
      })}

      {/* Axes */}
      <line
        x1={plotLeft}
        y1={plotBottom}
        x2={plotRight}
        y2={plotBottom}
        stroke="var(--ld-semantic-color-border-subtlest, #e3e4e5)"
        strokeOpacity={0.6}
      />

      {/* Tooltip */}
      {tooltip && (
        <foreignObject x={0} y={0} width={width} height={height} style={{pointerEvents: 'none', overflow: 'visible'}}>
          <div
            className="ld-chart-tooltip"
            style={{
              position: 'absolute',
              left: tooltip.x,
              top: tooltip.y,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <div className="ld-chart-tooltip-label">{tooltip.label}</div>
            {tooltip.items.map((item) => (
              <div key={item.key} className="ld-chart-tooltip-row">
                <span className="ld-chart-tooltip-swatch" style={{backgroundColor: item.color}} />
                <span className="ld-chart-tooltip-key">
                  {(config[item.key]?.label as string) || item.key}
                </span>
                <span className="ld-chart-tooltip-value">{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </foreignObject>
      )}
    </svg>
  );
};

ChartBar.displayName = 'ChartBar';

// ---------------------------------------------------------------------------
// ChartLine
// ---------------------------------------------------------------------------

export interface ChartLineProps extends CommonProps {
  data: Record<string, unknown>[];
  dataKeys: string[];
  xKey: string;
}

export const ChartLine: React.FunctionComponent<ChartLineProps> = (props) => {
  const {data, dataKeys, xKey, className} = applyCommonProps(props) as ChartLineProps & {className?: string};
  const {config, width, height} = useChart();
  const [tooltip, setTooltip] = React.useState<{
    x: number;
    y: number;
    items: {key: string; value: number; color: string}[];
    label: string;
  } | null>(null);

  if (!data.length || width === 0 || height === 0) return null;

  const plotLeft = PADDING.left;
  const plotRight = width - PADDING.right;
  const plotTop = PADDING.top;
  const plotBottom = height - PADDING.bottom;
  const plotW = plotRight - plotLeft;
  const plotH = plotBottom - plotTop;

  // Compute value range
  let minVal = Infinity;
  let maxVal = -Infinity;
  for (const row of data) {
    for (const key of dataKeys) {
      const v = Number(row[key]) || 0;
      if (v < minVal) minVal = v;
      if (v > maxVal) maxVal = v;
    }
  }

  const yTicks = niceScale(Math.min(0, minVal), maxVal, 5);
  const yMin = yTicks[0];
  const yMax = yTicks[yTicks.length - 1];
  const yRange = yMax - yMin || 1;

  const defaultColors = ['#993EF4', '#4DBDF5', '#0071DC', '#2E2F32', '#74767C'];

  // Build paths
  const lines = dataKeys.map((key, ki) => {
    const color = getColor(config, key, defaultColors[ki % defaultColors.length]);
    const points = data.map((row, i) => {
      const x = plotLeft + (i / (data.length - 1)) * plotW;
      const v = Number(row[key]) || 0;
      const y = plotBottom - ((v - yMin) / yRange) * plotH;
      return {x, y, value: v};
    });

    // Build smooth path using Catmull-Rom to Bezier approximation
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[Math.max(0, i - 1)];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[Math.min(points.length - 1, i + 2)];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }

    return {key, color, d, points};
  });

  return (
    <svg
      className={cx('ld-chart-svg', className)}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
    >
      {/* Grid lines */}
      {yTicks.map((tick) => {
        const y = plotBottom - ((tick - yMin) / yRange) * plotH;
        return (
          <g key={tick}>
            <line
              x1={plotLeft}
              y1={y}
              x2={plotRight}
              y2={y}
              stroke="#cccccc"
              strokeOpacity={0.5}
              strokeDasharray="3 3"
            />
            <text
              x={plotLeft - 8}
              y={y + 4}
              textAnchor="end"
              className="ld-chart-axisLabel"
            >
              {tick}
            </text>
          </g>
        );
      })}

      {/* X-axis labels (thinned to avoid overlap) */}
      {(() => {
        const maxLabels = Math.max(2, Math.floor(plotW / 60));
        const step = data.length <= maxLabels ? 1 : Math.ceil(data.length / maxLabels);
        return data.map((row, i) => {
          if (i > 0 && i < data.length - 1 && i % step !== 0) return null;
          const x = plotLeft + (i / (data.length - 1)) * plotW;
          return (
            <text
              key={i}
              x={x}
              y={plotBottom + 20}
              textAnchor="middle"
              className="ld-chart-axisLabel"
            >
              {String(row[xKey] || '')}
            </text>
          );
        });
      })()}

      {/* Line paths */}
      {lines.map(({key, color, d}) => (
        <path
          key={key}
          d={d}
          fill="none"
          stroke={color}
          strokeWidth={2}
          className="ld-chart-line"
        />
      ))}

      {/* Invisible hover rects for tooltips */}
      {data.map((row, i) => {
        const x = plotLeft + (i / (data.length - 1)) * plotW;
        const halfStep = i < data.length - 1 ? (plotW / (data.length - 1)) / 2 : (plotW / (data.length - 1)) / 2;
        return (
          <rect
            key={i}
            x={x - halfStep}
            y={plotTop}
            width={halfStep * 2}
            height={plotH}
            fill="transparent"
            onMouseEnter={(e) => {
              const svgEl = (e.target as SVGElement).closest('svg');
              if (!svgEl) return;
              const pt = svgEl.getBoundingClientRect();
              setTooltip({
                x: e.clientX - pt.left,
                y: e.clientY - pt.top - 10,
                items: dataKeys.map((dk, dki) => ({
                  key: dk,
                  value: Number(row[dk]) || 0,
                  color: getColor(config, dk, defaultColors[dki % defaultColors.length]),
                })),
                label: String(row[xKey] || ''),
              });
            }}
            onMouseLeave={() => setTooltip(null)}
          />
        );
      })}

      {/* Axes */}
      <line
        x1={plotLeft}
        y1={plotBottom}
        x2={plotRight}
        y2={plotBottom}
        stroke="var(--ld-semantic-color-border-subtlest, #e3e4e5)"
        strokeOpacity={0.6}
      />

      {/* Tooltip */}
      {tooltip && (
        <foreignObject x={0} y={0} width={width} height={height} style={{pointerEvents: 'none', overflow: 'visible'}}>
          <div
            className="ld-chart-tooltip"
            style={{
              position: 'absolute',
              left: tooltip.x,
              top: tooltip.y,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <div className="ld-chart-tooltip-label">{tooltip.label}</div>
            {tooltip.items.map((item) => (
              <div key={item.key} className="ld-chart-tooltip-row">
                <span className="ld-chart-tooltip-swatch" style={{backgroundColor: item.color}} />
                <span className="ld-chart-tooltip-key">
                  {(config[item.key]?.label as string) || item.key}
                </span>
                <span className="ld-chart-tooltip-value">{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </foreignObject>
      )}
    </svg>
  );
};

ChartLine.displayName = 'ChartLine';

// ---------------------------------------------------------------------------
// ChartArea
// ---------------------------------------------------------------------------

export interface ChartAreaProps extends CommonProps {
  data: Record<string, unknown>[];
  dataKeys: string[];
  xKey: string;
}

export const ChartArea: React.FunctionComponent<ChartAreaProps> = (props) => {
  const {data, dataKeys, xKey, className} = applyCommonProps(props) as ChartAreaProps & {className?: string};
  const {config, width, height} = useChart();
  const [tooltip, setTooltip] = React.useState<{
    x: number;
    y: number;
    items: {key: string; value: number; color: string}[];
    label: string;
  } | null>(null);

  if (!data.length || width === 0 || height === 0) return null;

  const plotLeft = PADDING.left;
  const plotRight = width - PADDING.right;
  const plotTop = PADDING.top;
  const plotBottom = height - PADDING.bottom;
  const plotW = plotRight - plotLeft;
  const plotH = plotBottom - plotTop;

  let minVal = Infinity;
  let maxVal = -Infinity;
  for (const row of data) {
    for (const key of dataKeys) {
      const v = Number(row[key]) || 0;
      if (v < minVal) minVal = v;
      if (v > maxVal) maxVal = v;
    }
  }

  const yTicks = niceScale(Math.min(0, minVal), maxVal, 5);
  const yMin = yTicks[0];
  const yMax = yTicks[yTicks.length - 1];
  const yRange = yMax - yMin || 1;

  const defaultColors = ['#0071DC', '#993EF4', '#4DBDF5', '#2E2F32', '#74767C'];
  const idSuffix = React.useId().replace(/:/g, '');

  const areas = dataKeys.map((key, ki) => {
    const color = getColor(config, key, defaultColors[ki % defaultColors.length]);
    const points = data.map((row, i) => {
      const x = plotLeft + (i / (data.length - 1)) * plotW;
      const v = Number(row[key]) || 0;
      const y = plotBottom - ((v - yMin) / yRange) * plotH;
      return {x, y};
    });

    // Line path
    let linePath = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[Math.max(0, i - 1)];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[Math.min(points.length - 1, i + 2)];

      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;

      linePath += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }

    // Area path (close to bottom)
    const areaPath = linePath + ` L ${points[points.length - 1].x} ${plotBottom} L ${points[0].x} ${plotBottom} Z`;

    const gradId = `ld-chart-areaGrad-${key}-${idSuffix}`;

    return {key, color, linePath, areaPath, gradId};
  });

  return (
    <svg
      className={cx('ld-chart-svg', className)}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
    >
      <defs>
        {areas.map(({key, color, gradId}) => (
          <linearGradient key={key} id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.3} />
            <stop offset="95%" stopColor={color} stopOpacity={0.05} />
          </linearGradient>
        ))}
      </defs>

      {/* Grid lines */}
      {yTicks.map((tick) => {
        const y = plotBottom - ((tick - yMin) / yRange) * plotH;
        return (
          <g key={tick}>
            <line
              x1={plotLeft}
              y1={y}
              x2={plotRight}
              y2={y}
              stroke="#cccccc"
              strokeOpacity={0.5}
              strokeDasharray="3 3"
            />
            <text
              x={plotLeft - 8}
              y={y + 4}
              textAnchor="end"
              className="ld-chart-axisLabel"
            >
              {tick}
            </text>
          </g>
        );
      })}

      {/* X-axis labels (thinned to avoid overlap) */}
      {(() => {
        const maxLabels = Math.max(2, Math.floor(plotW / 60));
        const step = data.length <= maxLabels ? 1 : Math.ceil(data.length / maxLabels);
        return data.map((row, i) => {
          if (i > 0 && i < data.length - 1 && i % step !== 0) return null;
          const x = plotLeft + (i / (data.length - 1)) * plotW;
          return (
            <text
              key={i}
              x={x}
              y={plotBottom + 20}
              textAnchor="middle"
              className="ld-chart-axisLabel"
            >
              {String(row[xKey] || '')}
            </text>
          );
        });
      })()}

      {/* Area fills */}
      {areas.map(({key, areaPath, gradId}) => (
        <path key={`area-${key}`} d={areaPath} fill={`url(#${gradId})`} />
      ))}

      {/* Line strokes */}
      {areas.map(({key, color, linePath}) => (
        <path key={`line-${key}`} d={linePath} fill="none" stroke={color} strokeWidth={2} />
      ))}

      {/* Invisible hover rects */}
      {data.map((row, i) => {
        const x = plotLeft + (i / (data.length - 1)) * plotW;
        const halfStep = (plotW / (data.length - 1)) / 2;
        return (
          <rect
            key={i}
            x={x - halfStep}
            y={plotTop}
            width={halfStep * 2}
            height={plotH}
            fill="transparent"
            onMouseEnter={(e) => {
              const svgEl = (e.target as SVGElement).closest('svg');
              if (!svgEl) return;
              const pt = svgEl.getBoundingClientRect();
              setTooltip({
                x: e.clientX - pt.left,
                y: e.clientY - pt.top - 10,
                items: dataKeys.map((dk, dki) => ({
                  key: dk,
                  value: Number(row[dk]) || 0,
                  color: getColor(config, dk, defaultColors[dki % defaultColors.length]),
                })),
                label: String(row[xKey] || ''),
              });
            }}
            onMouseLeave={() => setTooltip(null)}
          />
        );
      })}

      {/* Axes */}
      <line
        x1={plotLeft}
        y1={plotBottom}
        x2={plotRight}
        y2={plotBottom}
        stroke="var(--ld-semantic-color-border-subtlest, #e3e4e5)"
        strokeOpacity={0.6}
      />

      {/* Tooltip */}
      {tooltip && (
        <foreignObject x={0} y={0} width={width} height={height} style={{pointerEvents: 'none', overflow: 'visible'}}>
          <div
            className="ld-chart-tooltip"
            style={{
              position: 'absolute',
              left: tooltip.x,
              top: tooltip.y,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <div className="ld-chart-tooltip-label">{tooltip.label}</div>
            {tooltip.items.map((item) => (
              <div key={item.key} className="ld-chart-tooltip-row">
                <span className="ld-chart-tooltip-swatch" style={{backgroundColor: item.color}} />
                <span className="ld-chart-tooltip-key">
                  {(config[item.key]?.label as string) || item.key}
                </span>
                <span className="ld-chart-tooltip-value">{item.value.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </foreignObject>
      )}
    </svg>
  );
};

ChartArea.displayName = 'ChartArea';

// ---------------------------------------------------------------------------
// ChartLegend
// ---------------------------------------------------------------------------

export interface ChartLegendProps extends CommonProps {
  dataKeys: string[];
}

export const ChartLegend: React.FunctionComponent<ChartLegendProps> = (props) => {
  const {dataKeys, className} = applyCommonProps(props) as ChartLegendProps & {className?: string};
  const {config} = useChart();

  const defaultColors = ['#0071DC', '#993EF4', '#4DBDF5', '#2E2F32', '#74767C'];

  return (
    <div className={cx('ld-chart-legend', className)}>
      {dataKeys.map((key, i) => {
        const color = getColor(config, key, defaultColors[i % defaultColors.length]);
        const label = config[key]?.label || key;
        return (
          <div key={key} className="ld-chart-legend-item">
            <span className="ld-chart-legend-swatch" style={{backgroundColor: color}} />
            <span className="ld-chart-legend-label">{label}</span>
          </div>
        );
      })}
    </div>
  );
};

ChartLegend.displayName = 'ChartLegend';

// ---------------------------------------------------------------------------
// ChartPie
// ---------------------------------------------------------------------------

export interface ChartPieProps extends CommonProps {
  data: {name: string; value: number; fill?: string}[];
  innerRadius?: number;
  outerRadius?: number;
  paddingAngle?: number;
}

export const ChartPie: React.FunctionComponent<ChartPieProps> = (props) => {
  const {
    data,
    innerRadius: innerRadiusProp,
    outerRadius: outerRadiusProp,
    paddingAngle = 2,
    className,
  } = applyCommonProps(props) as ChartPieProps & {className?: string};
  const {config, width, height} = useChart();
  const [tooltip, setTooltip] = React.useState<{
    x: number;
    y: number;
    name: string;
    value: number;
    color: string;
  } | null>(null);

  if (!data.length || width === 0 || height === 0) return null;

  const cx = width / 2;
  const cy = height / 2;
  const maxR = Math.min(cx, cy) - 10;
  const outerRadius = outerRadiusProp ?? maxR * 0.7;
  const innerRadius = innerRadiusProp ?? outerRadius * 0.6;

  const total = data.reduce((sum, d) => sum + d.value, 0);
  const padRad = (paddingAngle * Math.PI) / 180;
  const defaultColors = ['#0071DC', '#993EF4', '#4DBDF5', '#2E2F32', '#74767C'];

  // Build arc segments
  let startAngle = -Math.PI / 2;
  const segments = data.map((d, i) => {
    const color = d.fill || config[d.name]?.color || defaultColors[i % defaultColors.length];
    const sweep = total > 0 ? (d.value / total) * (2 * Math.PI) - padRad : 0;
    const seg = {
      name: d.name,
      value: d.value,
      color,
      startAngle,
      endAngle: startAngle + sweep,
    };
    startAngle += sweep + padRad;
    return seg;
  });

  function arcPath(sa: number, ea: number, r1: number, r2: number): string {
    const x1 = cx + r2 * Math.cos(sa);
    const y1 = cy + r2 * Math.sin(sa);
    const x2 = cx + r2 * Math.cos(ea);
    const y2 = cy + r2 * Math.sin(ea);
    const x3 = cx + r1 * Math.cos(ea);
    const y3 = cy + r1 * Math.sin(ea);
    const x4 = cx + r1 * Math.cos(sa);
    const y4 = cy + r1 * Math.sin(sa);
    const largeArc = ea - sa > Math.PI ? 1 : 0;
    return [
      `M ${x1} ${y1}`,
      `A ${r2} ${r2} 0 ${largeArc} 1 ${x2} ${y2}`,
      `L ${x3} ${y3}`,
      `A ${r1} ${r1} 0 ${largeArc} 0 ${x4} ${y4}`,
      'Z',
    ].join(' ');
  }

  return (
    <svg
      className={`ld-chart-svg${className ? ' ' + className : ''}`}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
    >
      {segments.map((seg) => (
        <path
          key={seg.name}
          d={arcPath(seg.startAngle, seg.endAngle, innerRadius, outerRadius)}
          fill={seg.color}
          className="ld-chart-pie-segment"
          onMouseEnter={(e) => {
            const svgEl = (e.target as SVGElement).closest('svg');
            if (!svgEl) return;
            const pt = svgEl.getBoundingClientRect();
            setTooltip({
              x: e.clientX - pt.left,
              y: e.clientY - pt.top - 10,
              name: seg.name,
              value: seg.value,
              color: seg.color,
            });
          }}
          onMouseLeave={() => setTooltip(null)}
        />
      ))}

      {/* Center label */}
      <text
        x={cx}
        y={cy - 6}
        textAnchor="middle"
        className="ld-chart-pie-center-value"
      >
        {total.toLocaleString()}
      </text>
      <text
        x={cx}
        y={cy + 14}
        textAnchor="middle"
        className="ld-chart-pie-center-label"
      >
        Total
      </text>

      {/* Tooltip */}
      {tooltip && (
        <foreignObject x={0} y={0} width={width} height={height} style={{pointerEvents: 'none', overflow: 'visible'}}>
          <div
            className="ld-chart-tooltip"
            style={{
              position: 'absolute',
              left: tooltip.x,
              top: tooltip.y,
              transform: 'translate(-50%, -100%)',
            }}
          >
            <div className="ld-chart-tooltip-row">
              <span className="ld-chart-tooltip-swatch" style={{backgroundColor: tooltip.color}} />
              <span className="ld-chart-tooltip-key">
                {(config[tooltip.name]?.label as string) || tooltip.name}
              </span>
              <span className="ld-chart-tooltip-value">{tooltip.value}%</span>
            </div>
          </div>
        </foreignObject>
      )}
    </svg>
  );
};

ChartPie.displayName = 'ChartPie';

// ---------------------------------------------------------------------------
// ChartTooltip (standalone, for external use)
// ---------------------------------------------------------------------------

export interface ChartTooltipProps extends CommonProps {
  active?: boolean;
  label?: string;
  items?: {key: string; value: number; color: string}[];
}

export const ChartTooltip: React.FunctionComponent<ChartTooltipProps> = (props) => {
  const {active, label, items, className} = applyCommonProps(props) as ChartTooltipProps & {className?: string};
  const {config} = useChart();

  if (!active || !items?.length) return null;

  return (
    <div className={cx('ld-chart-tooltip', className)}>
      {label && <div className="ld-chart-tooltip-label">{label}</div>}
      {items.map((item) => (
        <div key={item.key} className="ld-chart-tooltip-row">
          <span className="ld-chart-tooltip-swatch" style={{backgroundColor: item.color}} />
          <span className="ld-chart-tooltip-key">
            {(config[item.key]?.label as string) || item.key}
          </span>
          <span className="ld-chart-tooltip-value">{item.value.toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};

ChartTooltip.displayName = 'ChartTooltip';
