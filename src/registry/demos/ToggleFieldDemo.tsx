import { useState } from 'react';
import ToggleField from '../../blocks/forms/ToggleField';

export default function ToggleFieldDemo() {
  const [online, setOnline] = useState(true);
  const [notify, setNotify] = useState(false);
  return (
    <div className="grid w-full max-w-md grid-cols-1 gap-2">
      <ToggleField
        label="Show offline analysts"
        tone="primary"
        checked={online}
        onChange={(e) => setOnline(e.target.checked)}
      />
      <ToggleField
        label="Email notifications"
        size="sm"
        checked={notify}
        onChange={(e) => setNotify(e.target.checked)}
        hint="Sends a digest every morning"
      />
    </div>
  );
}
