import ItemList from '../../blocks/data/ItemList';
import Badge from '../../blocks/feedback/Badge';

export default function ItemListDemo() {
  return (
    <ItemList
      className="w-full max-w-md"
      onSelect={() => {}}
      items={[
        {
          id: '1',
          title: 'Passport scan',
          subtitle: 'Uploaded 2 minutes ago',
          meta: <Badge tone="info" size="sm">In review</Badge>,
        },
        {
          id: '2',
          title: 'Driving licence',
          subtitle: 'Uploaded 1 hour ago',
          meta: <Badge tone="success" size="sm">Verified</Badge>,
        },
        {
          id: '3',
          title: 'Utility bill',
          subtitle: 'Uploaded yesterday',
          meta: <Badge tone="warning" size="sm">Referred</Badge>,
        },
      ]}
    />
  );
}
