import StatCard from '../../blocks/data/StatCard';

export default function StatCardDemo() {
  return (
    <div className="grid w-full max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3">
      <StatCard name="Total Customers" value={1272} previousValue={1178} increaseLabel="increase last 30 days" />
      <StatCard name="Document Scans" value={1089} previousValue={1122} increaseLabel="increase last 30 days" />
      <StatCard name="Avg. Sales Price" value={700} previousValue={650} prefix="£" increaseLabel="increase last 30 days" />
    </div>
  );
}
