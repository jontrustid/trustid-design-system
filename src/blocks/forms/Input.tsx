import type { ComponentPropsWithRef } from 'react';

export interface InputProps extends Omit<ComponentPropsWithRef<'input'>, 'size'> {
  size?: 'xs' | 'sm' | 'md' | 'lg';
  error?: boolean;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

/** Bare styled input — for inline editing inside tables and composite controls
 *  where a labelled field would be too heavy. Prefer TextField elsewhere. */
export default function Input({ size = 'md', error, className, ref, ...rest }: InputProps) {
  return (
    <input
      ref={ref}
      aria-invalid={error ? true : undefined}
      {...rest}
      className={cx('input', size !== 'md' && `input-${size}`, error && 'input-error', className)}
    />
  );
}
