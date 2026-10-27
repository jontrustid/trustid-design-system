import Panel from '../layout/Panel';
import Icon from '../media/Icon';

export interface StatCardProps {
  name: string;
  value: number;
  previousValue: number;
  /** Trailing text after the delta (e.g. "increase last 30 days"). */
  increaseLabel: string;
  /** Optional symbol rendered before the values (e.g. "£"). */
  prefix?: string;
  className?: string;
}

/** Headline stat with a trend line comparing to the previous period —
 *  dashboard KPI tile. */
export default function StatCard({
  name,
  value,
  previousValue,
  increaseLabel,
  prefix,
  className,
}: StatCardProps) {
  const diff = value - previousValue;
  const pct = previousValue !== 0 ? Math.round((diff / previousValue) * 100) : 0;
  const up = diff >= 0;
  return (
    <Panel className={className ?? 'shadow-sm'} bodyClassName="gap-1 p-5">
      <p className="text-sm text-base-content/60">{name}</p>
      <p className="text-3xl font-semibold">
        {prefix}
        {value.toLocaleString()}
      </p>
      <p className={`flex items-center gap-1 text-xs ${up ? 'text-success' : 'text-error'}`}>
        <Icon name={up ? 'trending-up' : 'trending-down'} className="h-3.5 w-3.5" />
        {up ? '+' : ''}
        {pct}% ({up ? '+' : ''}
        {prefix}
        {diff.toLocaleString()}) {increaseLabel}
      </p>
    </Panel>
  );
}
