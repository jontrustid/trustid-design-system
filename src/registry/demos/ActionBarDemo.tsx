import ActionBar from '../../blocks/forms/ActionBar';

export default function ActionBarDemo() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-4">
      <ActionBar
        actions={[
          { key: 'save', label: 'Save', tone: 'primary' },
          { key: 'cancel', label: 'Cancel', variant: 'ghost' },
        ]}
      />
      <ActionBar
        justify="end"
        actions={[
          { key: 'reject', label: 'Reject', variant: 'ghost', danger: true },
          { key: 'approve', label: 'Approve', tone: 'success' },
        ]}
      />
    </div>
  );
}
