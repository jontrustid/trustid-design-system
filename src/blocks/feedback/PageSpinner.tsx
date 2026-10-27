import type { ComponentPropsWithRef } from 'react';
import LoadingSpinner from './LoadingSpinner';

export interface PageSpinnerProps
  extends Omit<ComponentPropsWithRef<'div'>, 'children'> {
  /** Optional caption under the spinner. */
  text?: string;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

/** Full-area loading spinner — centres a large spinner in the available space.
 *  Use for route/view-level loading states. */
export default function PageSpinner({ text, className, ref, ...rest }: PageSpinnerProps) {
  return (
    <LoadingSpinner
      ref={ref}
      size="lg"
      text={text}
      {...rest}
      className={cx('h-full py-16', className)}
    />
  );
}
