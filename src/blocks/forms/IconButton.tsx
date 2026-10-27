import type { ReactNode } from 'react';
import Button from './Button';
import type { ButtonProps } from './Button';

export interface IconButtonProps extends Omit<ButtonProps, 'children' | 'icon'> {
  /** Glyph rendered inside the button. */
  icon: ReactNode;
  /** Accessible name — applied as aria-label and title tooltip. */
  label: string;
  /** Optional count badge shown at the top-right (e.g. unread notifications). */
  badge?: number;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

/** Square icon-only button — ghost by default, for toolbars, card menus and
 *  inline affordances. */
export default function IconButton({
  icon,
  label,
  badge,
  variant = 'ghost',
  className,
  ...rest
}: IconButtonProps) {
  return (
    <span className="relative inline-flex">
      <Button
        variant={variant}
        aria-label={label}
        title={label}
        {...rest}
        className={cx('btn-square', className)}
      >
        {icon}
      </Button>
      {badge !== undefined && badge > 0 && (
        <span className="badge badge-error badge-xs absolute -top-1 -right-1 px-1">
          {badge}
        </span>
      )}
    </span>
  );
}
