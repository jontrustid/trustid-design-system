import Toolbar from '../../blocks/layout/Toolbar';
import SelectField from '../../blocks/forms/SelectField';
import TextField from '../../blocks/forms/TextField';
import Button from '../../blocks/forms/Button';

export default function ToolbarDemo() {
  return (
    <Toolbar className="w-full">
      <SelectField
        label="Status"
        options={[
          { value: 'all', label: 'All' },
          { value: 'open', label: 'Open' },
          { value: 'closed', label: 'Closed' },
        ]}
      />
      <TextField label="Reference" placeholder="e.g. 1042" />
      <Button size="sm" tone="primary" className="mb-1">
        Apply
      </Button>
    </Toolbar>
  );
}
