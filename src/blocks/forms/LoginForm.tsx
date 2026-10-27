import { useState } from 'react';
import type { ComponentPropsWithRef, FormEvent } from 'react';

export interface LoginEnvironment {
  id: string;
  label: string;
}

export interface LoginFormValues {
  environment: string;
  username: string;
  password: string;
  mfaCode: string;
}

export interface LoginFormProps extends Omit<ComponentPropsWithRef<'form'>, 'onSubmit'> {
  environments: LoginEnvironment[];
  /** Preselect an environment (defaults to the first). */
  defaultEnvironmentId?: string;
  /** Show the one-time code field (second auth step). */
  requireMfa?: boolean;
  loading?: boolean;
  /** External error to surface (e.g. rejected credentials). */
  error?: string;
  onSubmit?: (values: LoginFormValues) => void;
  /** Label for the SSO button — when set with `onSso`, a secondary
   *  single-sign-on button is shown under the submit button. */
  ssoLabel?: string;
  /** SSO sign-in — called with the currently selected environment id. */
  onSso?: (environmentId: string) => void;
  /** Disable the SSO button (e.g. while an SSO attempt is in flight). */
  ssoLoading?: boolean;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function LoginForm({
  environments,
  defaultEnvironmentId,
  requireMfa = false,
  loading = false,
  error,
  onSubmit,
  ssoLabel,
  onSso,
  ssoLoading = false,
  className,
  ref,
  ...rest
}: LoginFormProps) {
  const [environment, setEnvironment] = useState(
    defaultEnvironmentId ?? environments[0]?.id ?? '',
  );
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [mfaCode, setMfaCode] = useState('');

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSubmit?.({ environment, username, password, mfaCode });
  }

  return (
    <form
      ref={ref}
      {...rest}
      onSubmit={handleSubmit}
      className={cx('card w-full max-w-sm bg-base-100 shadow-md', className)}
    >
      <div className="card-body gap-4">
        <h2 className="card-title">Sign in to VeriScan</h2>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Environment</legend>
          <select
            className="select w-full"
            value={environment}
            onChange={(e) => setEnvironment(e.target.value)}
          >
            {environments.map((env) => (
              <option key={env.id} value={env.id}>
                {env.label}
              </option>
            ))}
          </select>
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Username</legend>
          <input
            type="text"
            className="input w-full"
            autoComplete="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </fieldset>

        <fieldset className="fieldset">
          <legend className="fieldset-legend">Password</legend>
          <input
            type="password"
            className="input w-full"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </fieldset>

        {requireMfa && (
          <fieldset className="fieldset">
            <legend className="fieldset-legend">One-time code</legend>
            <input
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={6}
              placeholder="6-digit code"
              className="input w-full tracking-widest"
              value={mfaCode}
              onChange={(e) => setMfaCode(e.target.value)}
              required
            />
          </fieldset>
        )}

        {error && (
          <div role="alert" className="alert alert-error alert-soft text-sm">
            <span>{error}</span>
          </div>
        )}

        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
          {loading && <span className="loading loading-spinner loading-sm" />}
          {requireMfa ? 'Verify and sign in' : 'Sign in'}
        </button>

        {ssoLabel && onSso && (
          <>
            <div className="divider my-0 text-xs">or</div>
            <button
              type="button"
              className="btn btn-outline w-full"
              disabled={loading || ssoLoading}
              onClick={() => onSso(environment)}
            >
              {ssoLoading && <span className="loading loading-spinner loading-sm" />}
              {ssoLabel}
            </button>
          </>
        )}
      </div>
    </form>
  );
}
