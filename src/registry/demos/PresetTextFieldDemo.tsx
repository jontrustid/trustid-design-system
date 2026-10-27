import { useState } from 'react';
import PresetTextField from '../../blocks/forms/PresetTextField';

export default function PresetTextFieldDemo() {
  const [value, setValue] = useState('');
  return (
    <PresetTextField
      className="w-full max-w-md"
      label="Rejection reason"
      value={value}
      onValueChange={setValue}
      placeholder="Type or insert a preset…"
      presets={[
        {
          category: 'Image quality',
          items: ['Image is too blurry to read', 'Document is cropped'],
        },
        {
          category: 'Document',
          items: ['Document has expired', 'Document type not accepted'],
        },
      ]}
    />
  );
}
