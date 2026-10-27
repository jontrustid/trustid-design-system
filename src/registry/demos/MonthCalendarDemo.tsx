import { useState } from 'react';
import MonthCalendar, { type MonthCalendarEvent } from '../../blocks/data/MonthCalendar';

export default function MonthCalendarDemo() {
  const now = new Date();
  const y = now.getFullYear();
  const m = now.getMonth();
  const [loading, setLoading] = useState(false);

  const events: MonthCalendarEvent[] = [
    {
      start: new Date(y, m, 6),
      end: new Date(y, m, 8),
      label: 'Compliance audit',
      colour: 'darkblue',
      tooltip: 'Compliance audit · Omon Ilaboya',
    },
    {
      start: new Date(y, m, 14),
      label: 'Public holiday',
      colour: 'brown',
    },
    {
      start: new Date(y, m, 20),
      end: new Date(y, m, 27),
      label: 'Azure migration',
      colour: 'orangered',
    },
    {
      start: new Date(y, m, 24),
      end: new Date(y, m + 1, 2),
      label: 'Conference',
      colour: 'darkslategrey',
    },
  ];

  return (
    <div className="h-[32rem] w-full max-w-4xl rounded-box border border-base-300 p-4">
      <MonthCalendar
        events={events}
        loading={loading}
        onMonthChange={() => {
          setLoading(true);
          setTimeout(() => setLoading(false), 500);
        }}
      />
    </div>
  );
}
