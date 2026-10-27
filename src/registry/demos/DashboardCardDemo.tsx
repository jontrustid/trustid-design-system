import DashboardCard from '../../blocks/layout/DashboardCard';
import Icon from '../../blocks/media/Icon';

export default function DashboardCardDemo() {
  return (
    <div className="h-56 max-w-md">
      <DashboardCard
        title="Sales"
        icon={<Icon name="trending-up" className="h-4 w-4" />}
        onRefresh={() => {}}
        fullScreen={false}
        onFullScreenChange={() => {}}
      >
        <p className="text-sm text-base-content/60">Card content — charts, lists, KPIs.</p>
      </DashboardCard>
    </div>
  );
}
