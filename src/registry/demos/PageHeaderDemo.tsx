import PageHeader from '../../blocks/layout/PageHeader';
import Badge from '../../blocks/feedback/Badge';
import Button from '../../blocks/forms/Button';

export default function PageHeaderDemo() {
  return (
    <PageHeader
      title="Application #1042"
      onBack={() => {}}
      backLabel="Applications"
      meta="id 1042 · Document scan"
      actions={<Button size="sm" tone="primary">Open</Button>}
      className="w-full"
    >
      <Badge tone="success">Verified</Badge>
    </PageHeader>
  );
}
