import type { ComponentPropsWithRef } from 'react';

export interface LineChartSeries {
  /** Series name — shown in the legend when more than one series is given. */
  label?: string;
  values: number[];
  /** Fill the area under the line (default for the first series). */
  filled?: boolean;
}

export interface LineChartProps extends ComponentPropsWithRef<'div'> {
  labels: string[];
  series: LineChartSeries[];
  /** Horizontal reference line (e.g. a KPI target). */
  target?: number;
  targetLabel?: string;
  /** Format for y-axis tick labels (e.g. v => `${v}K`). */
  yFormat?: (value: number) => string;
  /** Approximate number of x labels to show — the rest are skipped. */
  maxXLabels?: number;
}

const W = 800;
const H = 300;
const PAD = { top: 14, right: 16, bottom: 26, left: 46 };
const SERIES_COLORS = ['var(--color-primary)', 'var(--color-secondary)', 'var(--color-accent)'];

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

/** Catmull-Rom → cubic bezier smooth path (Chart.js-style curve). */
function smoothPath(points: Array<[number, number]>): string {
  if (points.length === 0) return '';
  if (points.length === 1) return `M ${points[0][0]} ${points[0][1]}`;
  let d = `M ${points[0][0]} ${points[0][1]}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(i - 1, 0)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(i + 2, points.length - 1)];
    const c1x = p1[0] + (p2[0] - p0[0]) / 6;
    const c1y = p1[1] + (p2[1] - p0[1]) / 6;
    const c2x = p2[0] - (p3[0] - p1[0]) / 6;
    const c2y = p2[1] - (p3[1] - p1[1]) / 6;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2[0]} ${p2[1]}`;
  }
  return d;
}

function niceStep(range: number, ticks: number): number {
  const rough = range / ticks;
  const mag = 10 ** Math.floor(Math.log10(rough));
  const norm = rough / mag;
  const step = norm >= 5 ? 10 : norm >= 2 ? 5 : norm >= 1 ? 2 : 1;
  return step * mag;
}

/** Line/area chart — SVG rendering of one or more series with y gridlines,
 *  x labels, an optional target reference line and a legend for comparisons. */
export default function LineChart({
  labels,
  series,
  target,
  targetLabel = 'Target',
  yFormat = (v) => String(v),
  maxXLabels = 26,
  className,
  ref,
  ...rest
}: LineChartProps) {
  const allValues = series.flatMap((s) => s.values);
  if (target !== undefined) allValues.push(target);
  const rawMin = Math.min(...allValues);
  const rawMax = Math.max(...allValues);
  const step = niceStep(Math.max(rawMax - rawMin, 1), 5);
  const yMin = Math.floor(rawMin / step) * step;
  const yMax = Math.ceil(rawMax / step) * step;
  const span = Math.max(yMax - yMin, 1);

  const x = (i: number) =>
    PAD.left + (i / Math.max(labels.length - 1, 1)) * (W - PAD.left - PAD.right);
  const y = (v: number) => PAD.top + (1 - (v - yMin) / span) * (H - PAD.top - PAD.bottom);

  const yTicks: number[] = [];
  for (let v = yMin; v <= yMax + step / 2; v += step) yTicks.push(v);

  const xStep = Math.max(1, Math.ceil(labels.length / maxXLabels));
  const baseline = y(yMin);

  return (
    <div ref={ref} {...rest} className={cx('flex min-h-0 flex-1 flex-col gap-1', className)}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="none"
        className="h-48 min-h-0 w-full flex-1"
        role="img"
      >
        {yTicks.map((v) => (
          <g key={v}>
            <line
              x1={PAD.left}
              x2={W - PAD.right}
              y1={y(v)}
              y2={y(v)}
              stroke="var(--color-base-300)"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
            <text
              x={PAD.left - 8}
              y={y(v)}
              textAnchor="end"
              dominantBaseline="middle"
              fontSize={12}
              fill="var(--color-base-content)"
              opacity={0.6}
            >
              {yFormat(v)}
            </text>
          </g>
        ))}
        {target !== undefined && (
          <g>
            <line
              x1={PAD.left}
              x2={W - PAD.right}
              y1={y(target)}
              y2={y(target)}
              stroke="var(--color-error)"
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
            />
            <text
              x={W - PAD.right - 4}
              y={y(target) - 6}
              textAnchor="end"
              fontSize={11}
              fontWeight={600}
              fill="var(--color-error)"
            >
              {targetLabel}
            </text>
          </g>
        )}
        {series.map((s, si) => {
          const color = SERIES_COLORS[si % SERIES_COLORS.length];
          const pts = s.values.map((v, i): [number, number] => [x(i), y(v)]);
          const line = smoothPath(pts);
          const filled = s.filled ?? si === 0;
          return (
            <g key={si}>
              {filled && (
                <path
                  d={`${line} L ${pts[pts.length - 1]?.[0]} ${baseline} L ${pts[0]?.[0]} ${baseline} Z`}
                  fill={color}
                  opacity={0.15}
                />
              )}
              <path
                d={line}
                fill="none"
                stroke={color}
                strokeWidth={2}
                vectorEffect="non-scaling-stroke"
              />
              {pts.map(([px, py], i) => (
                <circle
                  key={i}
                  cx={px}
                  cy={py}
                  r={3}
                  fill="var(--color-base-100)"
                  stroke={color}
                  strokeWidth={2}
                >
                  <title>{`${labels[i] ?? ''}: ${s.values[i]}`}</title>
                </circle>
              ))}
            </g>
          );
        })}
        {labels.map((label, i) =>
          i % xStep === 0 || i === labels.length - 1 ? (
            <text
              key={i}
              x={x(i)}
              y={H - 6}
              textAnchor="middle"
              fontSize={11}
              fill="var(--color-base-content)"
              opacity={0.6}
            >
              {label}
            </text>
          ) : null,
        )}
      </svg>
      {series.length > 1 && (
        <div className="flex justify-center gap-4">
          {series.map((s, i) => (
            <span
              key={i}
              className="flex items-center gap-1.5 text-xs text-base-content/70"
            >
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: SERIES_COLORS[i % SERIES_COLORS.length] }}
              />
              {s.label}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
