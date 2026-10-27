import KpiCard from '../../blocks/data/KpiCard';
import Icon from '../../blocks/media/Icon';

export default function KpiCardDemo() {
  return (
    <div className="grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
      <KpiCard
        name="Breaching SLA"
        value={4}
        description="checks over target"
        icon={<Icon name="warning" className="h-5 w-5" />}
      />
      <KpiCard
        name="High Sensitivity"
        value={12}
        description="VIP checks in queue"
        icon={<Icon name="star" className="h-5 w-5" />}
      />
      <KpiCard
        name="Total Checks"
        value={86}
        description="across all pools"
        icon={<Icon name="inbox" className="h-5 w-5" />}
      />
    </div>
  );
}
