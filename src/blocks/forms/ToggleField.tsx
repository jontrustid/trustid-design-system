import { useId } from 'react';
import type { ComponentPropsWithRef } from 'react';

export interface ToggleFieldProps
  extends Omit<ComponentPropsWithRef<'input'>, 'type' | 'size'> {
  label: string;
  hint?: string;
  error?: string;
  /** Semantic colour when checked; omit for the default toggle. */
  tone?: 'primary' | 'secondary' | 'accent' | 'info' | 'success' | 'warning' | 'error';
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Extra classes applied to the input itself (className styles the wrapper). */
  inputClassName?: string;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

/** Labelled on/off switch — the toggle counterpart to CheckboxField. */
export default function ToggleField({
  label,
  hint,
  error,
  tone,
  size = 'md',
  className,
  inputClassName,
  id,
  ref,
  ...rest
}: ToggleFieldProps) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const message = error ?? hint;
  const messageId = `${inputId}-msg`;

  return (
    <fieldset className={cx('fieldset', className)}>
      <label className="label cursor-pointer justify-start gap-2" htmlFor={inputId}>
        <input
          id={inputId}
          ref={ref}
          type="checkbox"
          aria-invalid={error ? true : undefined}
          aria-describedby={message ? messageId : undefined}
          {...rest}
          className={cx(
            'toggle',
            tone && `toggle-${tone}`,
            size !== 'md' && `toggle-${size}`,
            error && 'toggle-error',
            inputClassName,
          )}
        />
        <span className="label-text">{label}</span>
      </label>
      {message && (
        <p id={messageId} className={cx('fieldset-label', error && 'text-error')}>
          {message}
        </p>
      )}
    </fieldset>
  );
}
