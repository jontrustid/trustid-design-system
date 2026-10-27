import type { ReactNode } from 'react';
import Panel from '../layout/Panel';

export interface KpiCardProps {
  name: string;
  value: number | string;
  description: string;
  icon: ReactNode;
  className?: string;
}

/** Compact KPI tile: tinted icon, headline value and a one-line description —
 *  used on ops headers (smart pool, allocation). */
export default function KpiCard({ name, value, description, icon, className }: KpiCardProps) {
  return (
    <Panel className={className ?? 'shadow-sm'} bodyClassName="flex-row items-center gap-4 p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-box bg-primary/10 text-primary">
        {icon}
      </div>
      <div>
        <p className="text-xs text-base-content/60">{name}</p>
        <p className="text-xl font-semibold leading-tight">{value}</p>
        <p className="text-xs text-base-content/50">{description}</p>
      </div>
    </Panel>
  );
}
