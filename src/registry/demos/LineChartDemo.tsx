import LineChart from '../../blocks/data/LineChart';

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];

export default function LineChartDemo() {
  return (
    <div className="max-w-2xl">
      <LineChart
        labels={labels}
        target={250}
        series={[{ label: '2025', values: [211, 142, 198, 132, 212, 200, 245, 219] }]}
      />
    </div>
  );
}
