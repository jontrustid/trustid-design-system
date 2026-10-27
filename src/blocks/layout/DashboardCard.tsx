import type { ComponentPropsWithRef, ReactNode } from 'react';
import IconButton from '../forms/IconButton';
import Icon from '../media/Icon';
import LoadingSpinner from '../feedback/LoadingSpinner';
import Panel from './Panel';

export interface DashboardCardProps extends ComponentPropsWithRef<'div'> {
  title: string;
  /** Icon rendered before the title (e.g. Icon name chart/calendar). */
  icon?: ReactNode;
  /** Shows a spinner instead of the content. */
  loading?: boolean;
  /** Content scrolls within the card's available height. */
  scrollable?: boolean;
  /** Refresh action in the header. */
  onRefresh?: () => void;
  /** Full-screen / restore toggle — button shows when provided. */
  fullScreen?: boolean;
  onFullScreenChange?: (fullScreen: boolean) => void;
  children?: ReactNode;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

/** Dashboard card chrome — header (icon, title, refresh/full-screen actions)
 *  plus a content area, used by chart and list cards on dashboards. */
export default function DashboardCard({
  title,
  icon,
  loading,
  scrollable,
  onRefresh,
  fullScreen,
  onFullScreenChange,
  children,
  className,
  ref,
  ...rest
}: DashboardCardProps) {
  return (
    <Panel
      ref={ref}
      {...rest}
      className={cx('h-full', fullScreen && 'fixed inset-0 z-50 m-4 overflow-auto', className)}
      bodyClassName="h-full gap-2 p-4"
    >
      <div className="flex items-center gap-2">
        {icon}
        <h3 className="flex-1 text-sm font-semibold">{title}</h3>
        {!loading && (
          <div className="flex items-center">
            {onRefresh && (
              <IconButton
                label="Refresh"
                size="sm"
                icon={<Icon name="refresh" className="h-4 w-4" />}
                onClick={onRefresh}
              />
            )}
            {onFullScreenChange && (
              <IconButton
                label={fullScreen ? 'Restore' : 'Full screen'}
                size="sm"
                icon={
                  <Icon
                    name={fullScreen ? 'compress' : 'expand'}
                    className="h-4 w-4"
                  />
                }
                onClick={() => onFullScreenChange(!fullScreen)}
              />
            )}
          </div>
        )}
      </div>
      {loading ? (
        <LoadingSpinner className="flex-1" />
      ) : (
        <div className={cx('flex min-h-0 flex-1 flex-col', scrollable && 'overflow-y-auto')}>
          {children}
        </div>
      )}
    </Panel>
  );
}
