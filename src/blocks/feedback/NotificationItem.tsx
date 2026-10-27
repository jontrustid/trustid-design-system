import type { ComponentPropsWithRef, ReactNode } from 'react';
import IconButton from '../forms/IconButton';
import Icon from '../media/Icon';

export interface NotificationItemProps extends ComponentPropsWithRef<'div'> {
  /** Leading icon — typically an Icon with a semantic colour class. */
  icon?: ReactNode;
  message: string;
  /** Pre-formatted time label (e.g. "5 minutes ago"). */
  timestamp?: string;
  /** Unread items show a marker dot. */
  unread?: boolean;
  /** Row click — e.g. mark as read / navigate. */
  onClick?: () => void;
  onDelete?: () => void;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

/** A single notification row for list/drawer views — icon, message, timestamp
 *  and a per-item delete affordance, with an unread marker. */
export default function NotificationItem({
  icon,
  message,
  timestamp,
  unread,
  onClick,
  onDelete,
  className,
  ref,
  ...rest
}: NotificationItemProps) {
  return (
    <div
      ref={ref}
      {...rest}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      className={cx(
        'flex items-start gap-3 border-b border-base-200 px-4 py-3',
        onClick && 'cursor-pointer hover:bg-base-200/60',
        className,
      )}
      onClick={onClick}
      onKeyDown={
        onClick
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick();
              }
            }
          : undefined
      }
    >
      <span className="relative mt-0.5 shrink-0">
        {icon}
        {unread && (
          <span className="badge badge-primary badge-xs absolute -top-1 -right-1 h-2 w-2 p-0" />
        )}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm">{message}</p>
        {timestamp && (
          <p className="mt-0.5 text-xs text-base-content/50">{timestamp}</p>
        )}
      </div>
      {onDelete && (
        <IconButton
          label="Delete notification"
          size="xs"
          icon={<Icon name="trash" className="h-3.5 w-3.5" />}
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        />
      )}
    </div>
  );
}
