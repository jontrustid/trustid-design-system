import type { ComponentPropsWithRef } from 'react';

export interface BarChartProps extends ComponentPropsWithRef<'div'> {
  /** Values to plot — each becomes a bar scaled to the series max. */
  series: number[];
  /** Bar colour (Tailwind class). */
  barClassName?: string;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

/** Minimal bar chart — a row of value-scaled bars with hover values. Wrap in a
 *  Panel (with title) for a dashboard card. */
export default function BarChart({
  series,
  barClassName = 'bg-primary/70',
  className,
  ref,
  ...rest
}: BarChartProps) {
  const max = Math.max(...series, 0);
  return (
    <div
      ref={ref}
      {...rest}
      className={cx('flex h-40 items-end gap-1.5 pt-2', className)}
    >
      {series.map((v, i) => (
        <div
          key={i}
          className={cx('flex-1 rounded-t', barClassName)}
          style={{ height: `${max > 0 ? Math.max((v / max) * 100, 4) : 4}%` }}
          title={String(v)}
        />
      ))}
    </div>
  );
}
