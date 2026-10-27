import { useEffect, useId, useRef } from 'react';
import type { ComponentPropsWithRef, ReactNode } from 'react';
import IconButton from '../forms/IconButton';
import Icon from '../media/Icon';

export interface DrawerProps extends ComponentPropsWithRef<'div'> {
  open: boolean;
  onClose?: () => void;
  title?: string;
  /** Icon rendered before the title. */
  icon?: ReactNode;
  /** Footer slot pinned to the bottom — put actions here. */
  footer?: ReactNode;
  /** Which edge the panel slides in from. */
  side?: 'left' | 'right';
  /** Panel width (Tailwind class). */
  width?: string;
  children?: ReactNode;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

/** Edge-anchored slide-over panel — notifications trays, detail inspectors,
 *  filters. Overlays the page with a backdrop, like a sideways Modal. */
export default function Drawer({
  open,
  onClose,
  title,
  icon,
  footer,
  side = 'right',
  width = 'w-80',
  className,
  children,
  ref,
  ...rest
}: DrawerProps) {
  const panelRef = useRef<HTMLElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose?.();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      ref={ref}
      {...rest}
      role="dialog"
      aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
      className={cx('fixed inset-0 z-40', className)}
    >
      <div
        className="absolute inset-0 bg-base-content/40"
        aria-hidden="true"
        onClick={onClose}
      />
      <aside
        ref={panelRef}
        className={cx(
          'absolute inset-y-0 flex flex-col bg-base-100 shadow-xl',
          side === 'right' ? 'right-0' : 'left-0',
          width,
        )}
      >
        <div className="flex items-center gap-2 border-b border-base-300 px-4 py-3">
          {icon && <span className="text-base-content/70">{icon}</span>}
          {title && (
            <h3 id={titleId} className="flex-1 font-semibold">
              {title}
            </h3>
          )}
          <IconButton
            label="Close"
            size="sm"
            icon={<Icon name="cross" className="h-4 w-4" />}
            onClick={onClose}
          />
        </div>
        <div className="flex-1 overflow-y-auto">{children}</div>
        {footer && (
          <div className="flex items-center justify-between gap-2 border-t border-base-300 px-4 py-2">
            {footer}
          </div>
        )}
      </aside>
    </div>
  );
}
