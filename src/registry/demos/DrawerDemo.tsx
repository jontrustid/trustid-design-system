import { useState } from 'react';
import Drawer from '../../blocks/overlay/Drawer';
import NotificationItem from '../../blocks/feedback/NotificationItem';
import Icon from '../../blocks/media/Icon';

export default function DrawerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button type="button" className="btn btn-primary" onClick={() => setOpen(true)}>
        Open drawer
      </button>
      <Drawer
        open={open}
        onClose={() => setOpen(false)}
        title="Notifications"
        icon={<Icon name="bell" className="h-4 w-4" />}
        footer={
          <>
            <button type="button" className="btn btn-ghost btn-sm">
              Mark all as read
            </button>
            <button type="button" className="btn btn-ghost btn-sm">
              Delete all
            </button>
          </>
        }
      >
        <NotificationItem
          icon={<Icon name="bell" className="h-5 w-5 text-info" />}
          message="An analyst has come online"
          timestamp="2 minutes ago"
          unread
        />
        <NotificationItem
          icon={<Icon name="pool" className="h-5 w-5 text-success" />}
          message="A document was allocated to RTW"
          timestamp="1 hour ago"
        />
      </Drawer>
    </div>
  );
}
