import type { ComponentPropsWithRef, ReactNode } from 'react';

export interface EventListItem {
  /** Icon rendered inside the coloured rounded square. */
  icon?: ReactNode;
  /** Background colour of the icon square (CSS colour). */
  iconColour?: string;
  title: string;
  /** Secondary line under the title (e.g. owner). */
  subtitle?: ReactNode;
  /** Right-aligned meta text (e.g. a date range). */
  meta?: string;
}

export interface EventListProps extends ComponentPropsWithRef<'div'> {
  items: EventListItem[];
  /** Called when a row is clicked. */
  onItemClick?: (item: EventListItem, index: number) => void;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

/** List of events — coloured icon square, title, subtitle and a right-aligned
 *  meta (date range). Used by calendar/important-dates cards. */
export default function EventList({
  items,
  onItemClick,
  className,
  ref,
  ...rest
}: EventListProps) {
  return (
    <div ref={ref} {...rest} className={cx('flex flex-col', className)}>
      {items.map((item, i) => (
        <div
          key={i}
          className={cx(
            'flex items-center gap-3 border-b border-base-200 px-1 py-2.5 last:border-0',
            onItemClick && 'cursor-pointer hover:bg-base-200/50',
          )}
          onClick={onItemClick ? () => onItemClick(item, i) : undefined}
        >
          <span
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-box text-primary-content"
            style={{ backgroundColor: item.iconColour ?? 'var(--color-primary)' }}
          >
            {item.icon}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{item.title}</p>
            {item.subtitle && (
              <p className="truncate text-xs text-base-content/60">{item.subtitle}</p>
            )}
          </div>
          {item.meta && (
            <p className="shrink-0 text-xs text-base-content/70">{item.meta}</p>
          )}
        </div>
      ))}
    </div>
  );
}
