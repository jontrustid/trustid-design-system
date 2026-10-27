import { useId } from 'react';
import type { ComponentPropsWithRef, ReactNode } from 'react';

export interface SearchFieldProps
  extends Omit<ComponentPropsWithRef<'input'>, 'type' | 'size'> {
  /** Visible legend label; omit for an icon-only search box (pass aria-label then). */
  label?: string;
  hint?: string;
  error?: string;
  type?: 'search' | 'text' | 'number';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Leading icon inside the input frame — pass null to hide the default magnifier. */
  icon?: ReactNode;
  /** Renders a clear (×) button while the controlled value is non-empty. */
  onClear?: () => void;
  /** Extra classes applied to the input itself (className styles the wrapper). */
  inputClassName?: string;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

const MAGNIFIER = (
  <svg
    className="h-4 w-4 shrink-0 opacity-60"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

/** Framed input with a leading icon and optional clear button — search boxes and
 *  compact inline inputs (no legend) share this block. */
export default function SearchField({
  label,
  hint,
  error,
  type = 'search',
  size = 'md',
  icon,
  onClear,
  className,
  inputClassName,
  id,
  ref,
  value,
  ...rest
}: SearchFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const message = error ?? hint;
  const messageId = `${inputId}-msg`;
  const showClear = onClear !== undefined && typeof value === 'string' && value.length > 0;

  return (
    <fieldset className={cx('fieldset', className)}>
      {label && <legend className="fieldset-legend">{label}</legend>}
      <label
        className={cx('input flex items-center gap-2', size !== 'md' && `input-${size}`)}
        htmlFor={inputId}
      >
        {icon === undefined ? MAGNIFIER : icon}
        <input
          id={inputId}
          ref={ref}
          type={type}
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? messageId : undefined}
          value={value}
          {...rest}
          className={cx('grow', inputClassName)}
        />
        {showClear && (
          <button
            type="button"
            className="btn btn-ghost btn-xs btn-square shrink-0"
            onClick={onClear}
            aria-label="Clear"
          >
            <svg
              className="h-3.5 w-3.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              aria-hidden="true"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        )}
      </label>
      {message && (
        <p id={messageId} className={cx('fieldset-label', error && 'text-error')}>
          {message}
        </p>
      )}
    </fieldset>
  );
}
