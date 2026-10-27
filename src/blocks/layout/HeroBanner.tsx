import type { ComponentPropsWithRef, ReactNode } from 'react';
import Panel from './Panel';

export interface HeroBannerProps extends ComponentPropsWithRef<'div'> {
  title: string;
  subtitle?: string;
  /** Image URL shown as a round logo/avatar. Falls back to `icon`. */
  imageUrl?: string;
  /** Image load failed — e.g. switch to the `icon` fallback. */
  onImageError?: () => void;
  /** Fallback when no image is available (e.g. a category icon). */
  icon?: ReactNode;
  /** Right-side slot — status controls, actions, etc. */
  actions?: ReactNode;
  children?: ReactNode;
}

/** Entity hero banner — logo/avatar, title + subtitle, and an actions slot,
 *  in a full-width Panel. Tops detail/record views. */
export default function HeroBanner({
  title,
  subtitle,
  imageUrl,
  onImageError,
  icon,
  actions,
  children,
  className,
  ref,
  ...rest
}: HeroBannerProps) {
  return (
    <Panel
      ref={ref}
      {...rest}
      className={className}
      bodyClassName="flex-row items-center gap-4 p-5"
    >
      {imageUrl ? (
        <img
          src={imageUrl}
          alt=""
          className="h-14 w-14 shrink-0 rounded-full object-cover"
          onError={onImageError}
        />
      ) : icon ? (
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
          {icon}
        </span>
      ) : null}
      <div className="min-w-0 flex-1">
        <h1 className="truncate text-2xl font-semibold">{title}</h1>
        {subtitle && (
          <p className="truncate text-sm text-base-content/60">{subtitle}</p>
        )}
        {children}
      </div>
      {actions}
    </Panel>
  );
}
