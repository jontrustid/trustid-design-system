import Badge from '../../blocks/feedback/Badge';

export default function BadgeDemo() {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="primary">Primary</Badge>
        <Badge tone="secondary">Secondary</Badge>
        <Badge tone="accent">Accent</Badge>
        <Badge tone="info">Info</Badge>
        <Badge tone="success">Success</Badge>
        <Badge tone="warning">Warning</Badge>
        <Badge tone="error">Error</Badge>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <Badge soft tone="primary">Soft</Badge>
        <Badge outline tone="primary">Outline</Badge>
        <Badge size="sm" tone="neutral">Small</Badge>
      </div>
    </div>
  );
}
