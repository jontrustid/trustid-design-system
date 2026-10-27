import Panel from '../../blocks/layout/Panel';
import Badge from '../../blocks/feedback/Badge';
import IconButton from '../../blocks/forms/IconButton';
import Icon from '../../blocks/media/Icon';

export default function PanelDemo() {
  return (
    <Panel
      title="Panel title"
      hint="Optional muted helper text under the title row."
      actions={
        <>
          <Badge tone="info">3 new</Badge>
          <IconButton
            size="sm"
            icon={<Icon name="ellipsis" className="h-4 w-4" />}
            label="Panel actions"
          />
        </>
      }
      className="w-full max-w-md"
    >
      <p className="text-sm text-base-content/70">
        The standard bordered content container — title row, actions slot and
        body content.
      </p>
    </Panel>
  );
}
