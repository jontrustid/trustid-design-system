import type { ReactNode } from 'react';
import Alert from './Alert';

export interface InfoBannerItem {
  name: string;
  value: string;
}

export interface InfoBannerProps {
  title: string;
  /** Optional name/value info rows rendered under the title. */
  items?: InfoBannerItem[];
  className?: string;
  children?: ReactNode;
}

/** Informational banner with a headline and optional key/value detail rows —
 *  used for "page in development" notices and environment summaries. */
export default function InfoBanner({ title, items, className, children }: InfoBannerProps) {
  return (
    <Alert severity="info" className={className}>
      <div className="space-y-2">
        <p>{title}</p>
        {items && items.length > 0 && (
          <ul className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
            {items.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span className="font-semibold">{item.name}</span>
                <span className="whitespace-pre-wrap text-base-content/70">{item.value}</span>
              </li>
            ))}
          </ul>
        )}
        {children}
      </div>
    </Alert>
  );
}
