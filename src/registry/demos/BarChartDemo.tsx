import BarChart from '../../blocks/data/BarChart';
import Panel from '../../blocks/layout/Panel';

export default function BarChartDemo() {
  return (
    <Panel title="Sales" className="max-w-md">
      <BarChart series={[320, 410, 380, 460, 520, 490, 610, 580]} />
    </Panel>
  );
}
