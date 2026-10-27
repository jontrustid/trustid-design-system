import { useState } from 'react';
import ChoiceTiles from '../../blocks/forms/ChoiceTiles';

export default function ChoiceTilesDemo() {
  const [value, setValue] = useState('day');
  return (
    <ChoiceTiles
      value={value}
      onChange={setValue}
      options={[
        { value: 'day', label: 'Day' },
        { value: 'week', label: 'Week' },
        { value: 'month', label: 'Month' },
        { value: 'year', label: 'Year', disabled: true },
      ]}
    />
  );
}
