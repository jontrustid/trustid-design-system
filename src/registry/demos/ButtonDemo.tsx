import Button from '../../blocks/forms/Button';
import Icon from '../../blocks/media/Icon';

export default function ButtonDemo() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Button tone="primary">Primary</Button>
        <Button tone="secondary">Secondary</Button>
        <Button tone="accent">Accent</Button>
        <Button tone="success">Success</Button>
        <Button tone="error">Error</Button>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Button variant="outline" tone="primary">Outline</Button>
        <Button variant="ghost">Ghost</Button>
        <Button variant="soft" tone="primary">Soft</Button>
        <Button variant="link">Link</Button>
        <Button size="sm" icon={<Icon name="refresh" className="h-4 w-4" />}>With icon</Button>
        <Button loading>Loading</Button>
      </div>
    </div>
  );
}
