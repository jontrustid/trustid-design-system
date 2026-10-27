import { useMemo, useState } from 'react';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import Button from '../forms/Button';
import IconButton from '../forms/IconButton';
import Icon from '../media/Icon';
import LoadingSpinner from '../feedback/LoadingSpinner';

export interface MonthCalendarEvent {
  /** First day of the event. */
  start: Date;
  /** Last day — omit for a single-day event. */
  end?: Date;
  /** Text shown in the event bar (also used for the tooltip). */
  label: string;
  /** Bar background colour (CSS colour). */
  colour?: string;
  /** Tiny icon rendered before the label. */
  icon?: ReactNode;
  /** Extra tooltip lines (e.g. "May 24 - May 25 · Georgie Bradford"). */
  tooltip?: string;
}

export interface MonthCalendarProps extends ComponentPropsWithRef<'div'> {
  events?: MonthCalendarEvent[];
  /** Date within the displayed month — uncontrolled default. */
  defaultMonth?: Date;
  /** Controlled month. */
  month?: Date;
  onMonthChange?: (month: Date) => void;
  /** Shows an overlay spinner and disables the controls. */
  loading?: boolean;
}

const WEEKDAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const MARKER = 3; // px, event start/end border width

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

function sameDay(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

/** Dates covering `month`, padded to whole Monday-start weeks. */
function monthGridDays(year: number, month: number): Date[] {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const offset = (first.getDay() + 6) % 7; // days back to Monday
  const start = new Date(year, month, 1 - offset);
  const days: Date[] = [];
  const cursor = new Date(start);
  let done = false;
  while (!done) {
    for (let i = 0; i < 7; i++) {
      days.push(new Date(cursor));
      if (sameDay(cursor, last)) done = true;
      cursor.setDate(cursor.getDate() + 1);
    }
  }
  return days;
}

interface DaySlot {
  event: MonthCalendarEvent;
  isFirst: boolean;
  isLast: boolean;
}

/** Per-day first-fit slot assignment, same as the Angular CalendarDates. */
function assignSlots(days: Date[], events: MonthCalendarEvent[]): DaySlot[][] {
  const slots = days.map((): Array<DaySlot | undefined> => []);
  const dayIndex = new Map(
    days.map((d, i) => [`${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`, i]),
  );
  for (const event of events) {
    const end = event.end ?? event.start;
    const cursor = new Date(event.start);
    while (cursor.getTime() <= end.getTime()) {
      const i = dayIndex.get(`${cursor.getFullYear()}-${cursor.getMonth()}-${cursor.getDate()}`);
      if (i !== undefined) {
        const day = days[i];
        let slot = 0;
        while (slots[i][slot]) slot++;
        slots[i][slot] = {
          event,
          isFirst: sameDay(day, event.start),
          isLast: sameDay(day, end),
        };
      }
      cursor.setDate(cursor.getDate() + 1);
    }
  }
  return slots.map((day) => day.map((s) => s as DaySlot));
}

/** Month grid calendar — weekday headers, prev/today/next controls and
 *  multi-day event bars with start/end markers. Port of the Angular
 *  tid-calendar component. */
export default function MonthCalendar({
  events = [],
  defaultMonth,
  month: controlledMonth,
  onMonthChange,
  loading,
  className,
  ref,
  ...rest
}: MonthCalendarProps) {
  const [internal, setInternal] = useState(defaultMonth ?? new Date());
  const shown = controlledMonth ?? internal;
  const year = shown.getFullYear();
  const month = shown.getMonth();

  const setMonth = (y: number, m: number) => {
    const next = new Date(y, m, 1);
    if (!controlledMonth) setInternal(next);
    onMonthChange?.(next);
  };
  const prevMonth = () => setMonth(month === 0 ? year - 1 : year, (month + 11) % 12);
  const nextMonth = () => setMonth(month === 11 ? year + 1 : year, (month + 1) % 12);
  const today = () => {
    const now = new Date();
    setMonth(now.getFullYear(), now.getMonth());
  };

  const days = useMemo(() => monthGridDays(year, month), [year, month]);
  const slots = useMemo(() => assignSlots(days, events), [days, events]);
  const todayDate = new Date();
  const title = shown.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });

  return (
    <div ref={ref} {...rest} className={cx('relative flex h-full flex-col', className)}>
      <div className="flex h-16 items-center justify-between">
        <h3 className="m-0 text-lg font-semibold">{title}</h3>
        <div className="flex items-center gap-2">
          <IconButton
            label="Previous month"
            size="sm"
            disabled={loading}
            icon={<Icon name="chevron-left" className="h-4 w-4" />}
            onClick={prevMonth}
          />
          <Button size="sm" tone="primary" disabled={loading} onClick={today}>
            Today
          </Button>
          <IconButton
            label="Next month"
            size="sm"
            disabled={loading}
            icon={<Icon name="chevron-right" className="h-4 w-4" />}
            onClick={nextMonth}
          />
        </div>
      </div>

      <div className="grid grid-cols-7 border-r border-base-300 bg-base-200">
        {WEEKDAYS.map((day) => (
          <div key={day} className="border-l border-t border-base-300 p-2 text-sm font-medium">
            {day}
          </div>
        ))}
      </div>

      <div className="grid flex-1 auto-rows-fr grid-cols-7 border-b border-r border-base-300">
        {days.map((day, i) => {
          const inMonth = day.getMonth() === month;
          const isToday = sameDay(day, todayDate);
          const showHeader = day.getDate() === 1 || i === 0 || isToday;
          return (
            <div
              key={i}
              className={cx(
                'min-h-16 border-l border-t border-base-300',
                inMonth ? 'bg-base-100' : 'bg-base-200/60',
                isToday && 'ring-2 ring-inset ring-primary',
              )}
            >
              {showHeader && (
                <div className={cx('p-2 text-sm', isToday && 'font-bold')}>
                  {day.getDate()} {day.toLocaleDateString('en-GB', { month: 'short' })}
                </div>
              )}
              <div>
                {slots[i].map((slot, si) =>
                  slot ? (
                    <div
                      key={si}
                      className="mb-px flex items-center gap-1 truncate px-2 py-0.5 text-xs text-white"
                      style={{
                        backgroundColor: slot.event.colour ?? 'var(--color-primary)',
                        borderLeft: `${MARKER}px solid ${slot.isFirst ? 'var(--color-base-content)' : 'transparent'}`,
                        borderRight: `${MARKER}px solid ${slot.isLast ? 'var(--color-base-content)' : 'transparent'}`,
                      }}
                      title={slot.event.tooltip ?? slot.event.label}
                    >
                      {slot.event.icon}
                      <span className="truncate">{slot.event.label}</span>
                    </div>
                  ) : (
                    <div key={si} className="mb-px px-2 py-0.5 text-xs">
                      &nbsp;
                    </div>
                  ),
                )}
              </div>
            </div>
          );
        })}
      </div>

      {loading && <LoadingSpinner overlay />}
    </div>
  );
}
