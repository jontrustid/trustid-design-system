import NotificationItem from '../../blocks/feedback/NotificationItem';
import Icon from '../../blocks/media/Icon';

export default function NotificationItemDemo() {
  return (
    <div className="max-w-sm rounded-box border border-base-300">
      <NotificationItem
        icon={<Icon name="user" className="h-5 w-5 text-success" />}
        message="Jane Smith is now online"
        timestamp="Just now"
        unread
        onDelete={() => {}}
      />
      <NotificationItem
        icon={<Icon name="pool" className="h-5 w-5 text-info" />}
        message="John Doe has been allocated to RTW"
        timestamp="25 minutes ago"
        onDelete={() => {}}
      />
    </div>
  );
}
