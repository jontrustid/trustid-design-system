import StatList from '../../blocks/data/StatList';
import Icon from '../../blocks/media/Icon';

export default function StatListDemo() {
  return (
    <div className="w-72">
      <StatList
        items={[
          { icon: <Icon name="star" className="h-3 w-3 text-base-content/50" />, label: 'High Sensitivity', value: 4, hint: 'High Sensitivity Checks' },
          { icon: <Icon name="activity" className="h-3 w-3 text-base-content/50" />, label: 'Avg Actual Rate', value: '5:00', hint: 'Average Actual Rate' },
          { icon: <Icon name="activity" className="h-3 w-3 text-base-content/50" />, label: 'Avg Target Rate', value: '4:00', hint: 'Average Target Rate' },
          { icon: <Icon name="warning" className="h-3 w-3 text-base-content/50" />, label: 'Breaching SLA', value: 4, hint: 'Number of Checks Breaching SLA' },
          { icon: <Icon name="plus" className="h-3 w-3 text-base-content/50" />, label: 'New (last hour)', value: 10, hint: 'Number of New Checks in the last hour' },
        ]}
        total={{ icon: <Icon name="inbox" className="h-3 w-3" />, label: 'Total Checks', value: 86, hint: 'Total Number of Checks' }}
      />
    </div>
  );
}
