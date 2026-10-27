import { useState } from 'react';
import CardGrid from '../../blocks/data/CardGrid';
import Icon from '../../blocks/media/Icon';

export default function CardGridDemo() {
  const [selected, setSelected] = useState('passport');
  return (
    <CardGrid
      className="w-full max-w-2xl"
      columns={3}
      selectedId={selected}
      onSelect={(item) => setSelected(item.id)}
      emptyIcon={<Icon name="document" className="h-8 w-8 text-base-content/20" />}
      items={[
        { id: 'passport', title: 'Passport', subtitle: 'Document scan' },
        { id: 'licence', title: 'Driving licence', subtitle: 'Document scan' },
        { id: 'brp', title: 'Biometric permit', subtitle: 'Document scan' },
      ]}
    />
  );
}
