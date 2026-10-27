import IconButton from '../../blocks/forms/IconButton';
import Icon from '../../blocks/media/Icon';

export default function IconButtonDemo() {
  return (
    <div className="flex items-center gap-2">
      <IconButton icon={<Icon name="ellipsis" className="h-4 w-4" />} label="More options" />
      <IconButton
        icon={<Icon name="bell" className="h-5 w-5" />}
        label="Notifications"
        badge={1}
      />
      <IconButton size="sm" icon={<Icon name="refresh" className="h-4 w-4" />} label="Refresh" />
      <IconButton
        size="xs"
        variant="outline"
        tone="error"
        icon={<Icon name="trash" className="h-4 w-4" />}
        label="Delete"
      />
    </div>
  );
}
