import type { ComponentPropsWithRef } from 'react';

export interface AvatarProps extends Omit<ComponentPropsWithRef<'img'>, 'size'> {
  src: string;
  /** Presence dot; omit to hide. */
  status?: 'online' | 'offline';
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
}

const SIZES: Record<NonNullable<AvatarProps['size']>, string> = {
  xs: 'h-6 w-6',
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-14 w-14',
  xl: 'h-20 w-20',
};

const DOT_SIZES: Record<NonNullable<AvatarProps['size']>, string> = {
  xs: 'h-2 w-2 border',
  sm: 'h-2.5 w-2.5 border',
  md: 'h-3 w-3 border-2',
  lg: 'h-3.5 w-3.5 border-2',
  xl: 'h-4 w-4 border-2',
};

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

/** Round profile image with an optional presence dot. */
export default function Avatar({ src, status, size = 'md', className, alt = '', ...rest }: AvatarProps) {
  return (
    <div className="relative inline-block shrink-0">
      <img
        src={src}
        alt={alt}
        {...rest}
        className={cx(SIZES[size], 'rounded-full object-cover', className)}
      />
      {status && (
        <span
          className={cx(
            'absolute -bottom-0.5 -right-0.5 rounded-full border-base-100',
            DOT_SIZES[size],
            status === 'online' ? 'bg-success' : 'bg-base-300',
          )}
        />
      )}
    </div>
  );
}
