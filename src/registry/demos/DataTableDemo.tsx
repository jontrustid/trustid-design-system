import DataTable from '../../blocks/data/DataTable';
import Badge from '../../blocks/feedback/Badge';

const ROWS = [
  { id: 1, name: 'Alice Smith', role: 'Analyst', status: 'active' },
  { id: 2, name: 'Bob Jones', role: 'Reviewer', status: 'active' },
  { id: 3, name: 'Carol White', role: 'Analyst', status: 'away' },
];

export default function DataTableDemo() {
  return (
    <DataTable
      className="w-full max-w-lg"
      rows={ROWS}
      rowKey={(r) => r.id}
      columns={[
        { key: 'name', header: 'Name' },
        { key: 'role', header: 'Role' },
        {
          key: 'status',
          header: 'Status',
          cell: (r) =>
            r.status === 'active' ? (
              <Badge tone="success" size="sm">Active</Badge>
            ) : (
              <Badge tone="warning" size="sm">Away</Badge>
            ),
        },
      ]}
    />
  );
}
