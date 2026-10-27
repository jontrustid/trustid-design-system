import type { ComponentPropsWithRef, ReactNode } from 'react';

export interface StatListItem {
  /** Leading icon for the row (muted). */
  icon?: ReactNode;
  label: string;
  value: ReactNode;
  /** Tooltip on the row (expanded metric name or breakdown). */
  hint?: string;
}

export interface StatListProps extends ComponentPropsWithRef<'dl'> {
  items: StatListItem[];
  /** Emphasised footer row on a divider (e.g. a total). */
  total?: StatListItem;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

/** Compact icon/label/value stat rows with an optional emphasised total —
 *  the KPI list inside column and panel headers. */
export default function StatList({ items, total, className, ref, ...rest }: StatListProps) {
  const renderRow = ({ icon, label, value, hint }: StatListItem, key: string | number) => (
    <div key={key} className="flex items-center gap-1.5" title={hint}>
      {icon}
      <dt className="flex-1 text-base-content/60">{label}</dt>
      <dd className="font-semibold">{value}</dd>
    </div>
  );

  return (
    <dl ref={ref} {...rest} className={cx('space-y-0.5 text-xs', className)}>
      {items.map((item, i) => renderRow(item, i))}
      {total && (
        <div
          className="mt-1 flex items-center gap-1.5 border-t border-base-300 pt-1"
          title={total.hint}
        >
          {total.icon}
          <dt className="flex-1 font-medium">{total.label}</dt>
          <dd className="text-sm font-bold">{total.value}</dd>
        </div>
      )}
    </dl>
  );
}
