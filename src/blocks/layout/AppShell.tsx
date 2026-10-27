import { useEffect, useState } from 'react';
import type { ComponentPropsWithRef, ReactNode } from 'react';

export interface NavItem {
  id: string;
  label: string;
  icon?: ReactNode;
  /** Visible only to these roles. Omit to show to everyone. */
  roles?: string[];
  badge?: string;
  /** Child items — renders the row as a collapsible group. */
  children?: NavItem[];
}

export interface ShellUser {
  name: string;
  /** Secondary line under the name in the header (e.g. role) — hidden when absent. */
  role?: string;
  /** Org badge next to the app name — hidden when absent. */
  org?: string;
  /** Shown under the name in the user menu (e.g. email/username). */
  email?: string;
  /** Display picture URL — a default silhouette shows when absent. */
  photoUrl?: string;
}

export interface ShellMenuAction {
  id: string;
  label: string;
  icon?: ReactNode;
  onSelect?: () => void;
}

export interface AppShellProps extends ComponentPropsWithRef<'div'> {
  appName?: string;
  /** Logo/image rendered in the side-nav header instead of the appName text. */
  logo?: ReactNode;
  navItems: NavItem[];
  activeNavId?: string;
  user: ShellUser;
  /** Extra controls in the header, before the user cluster (e.g. a
   *  notifications bell IconButton). */
  headerActions?: ReactNode;
  /** Content rendered in the user menu between the identity header and the
   *  actions — e.g. a settings section with toggles. */
  userMenu?: ReactNode;
  /** Custom user-menu actions. When omitted, a default "My account" item
   *  emits onNavigate('account'). Pass [] for none. */
  menuActions?: ShellMenuAction[];
  onNavigate?: (id: string) => void;
  onSignOut?: () => void;
  /** The shell fills its parent; give the parent a height (e.g. h-dvh). */
  children?: ReactNode;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function AppShell({
  appName = 'VeriScan',
  logo,
  navItems,
  activeNavId,
  user,
  headerActions,
  userMenu,
  menuActions,
  onNavigate,
  onSignOut,
  children,
  className,
  ref,
  ...rest
}: AppShellProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openGroups, setOpenGroups] = useState<Set<string>>(() => {
    const open = new Set<string>();
    for (const item of navItems) {
      if (item.children?.some((c) => c.id === activeNavId)) open.add(item.id);
    }
    return open;
  });
  const visibleItems = navItems.filter(
    (item) => !item.roles || (user.role !== undefined && item.roles.includes(user.role)),
  );

  // The group holding the active page stays open when navigation lands in it.
  useEffect(() => {
    const parent = visibleItems.find(
      (item) =>
        item.id === activeNavId ||
        item.children?.some((c) => c.id === activeNavId),
    );
    if (parent) {
      setOpenGroups((prev) => {
        if (prev.has(parent.id)) return prev;
        const next = new Set(prev);
        next.add(parent.id);
        return next;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeNavId]);

  function toggleGroup(id: string) {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function renderItem(item: NavItem) {
    const active = item.id === activeNavId;
    if (item.children?.length) {
      return (
        <details open={openGroups.has(item.id)}>
          <summary
            className={active ? 'menu-active' : undefined}
            aria-current={active ? 'page' : undefined}
            onClick={(e) => {
              e.preventDefault();
              toggleGroup(item.id);
              onNavigate?.(item.id);
            }}
          >
            {item.icon}
            <span className="flex-1">{item.label}</span>
          </summary>
          <ul>
            {item.children.map((child) => (
              <li key={child.id}>
                <a
                  className={child.id === activeNavId ? 'menu-active' : undefined}
                  aria-current={child.id === activeNavId ? 'page' : undefined}
                  onClick={() => {
                    onNavigate?.(child.id);
                    setDrawerOpen(false);
                  }}
                >
                  {child.icon}
                  <span className="flex-1">{child.label}</span>
                  {child.badge && <span className="badge badge-sm">{child.badge}</span>}
                </a>
              </li>
            ))}
          </ul>
        </details>
      );
    }
    return (
      <a
        className={active ? 'menu-active' : undefined}
        aria-current={active ? 'page' : undefined}
        onClick={() => {
          onNavigate?.(item.id);
          setDrawerOpen(false);
        }}
      >
        {item.icon}
        <span className="flex-1">{item.label}</span>
        {item.badge && <span className="badge badge-sm">{item.badge}</span>}
      </a>
    );
  }

  return (
    <div
      ref={ref}
      {...rest}
      className={cx(
        'drawer h-full min-h-0 lg:drawer-open',
        drawerOpen && 'drawer-open',
        className,
      )}
    >
      <input
        id="app-shell-drawer"
        type="checkbox"
        className="drawer-toggle"
        checked={drawerOpen}
        onChange={(e) => setDrawerOpen(e.target.checked)}
      />

      <div className="drawer-content flex min-w-0 flex-col">
        <header className="navbar gap-2 border-b border-base-300 bg-base-100 px-4">
          <label
            htmlFor="app-shell-drawer"
            className="btn btn-ghost btn-sm btn-square lg:hidden"
            aria-label="Toggle navigation"
          >
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>

          {!logo && (
            <span className="text-lg font-semibold text-primary">{appName}</span>
          )}
          {user.org && (
            <span className="badge badge-outline badge-sm hidden sm:inline-flex">
              {user.org}
            </span>
          )}

          <div className="ms-auto flex items-center gap-3">
            {headerActions}
            <div className="hidden text-end sm:block">
              <p className="text-sm font-medium leading-tight">{user.name}</p>
              {user.role && (
                <p className="text-xs capitalize text-base-content/60">{user.role}</p>
              )}
            </div>
            <div className="dropdown dropdown-end">
              <button type="button" tabIndex={0} className="btn btn-ghost btn-circle avatar avatar-placeholder">
                <span className="w-9 rounded-full bg-neutral text-neutral-content">
                  {user.photoUrl ? (
                    <img src={user.photoUrl} alt="" className="h-full w-full rounded-full object-cover" />
                  ) : (
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="m-auto mt-1.5 h-6 w-6"
                      aria-hidden="true"
                    >
                      <path d="M12 12a4.5 4.5 0 1 0-4.5-4.5A4.5 4.5 0 0 0 12 12Zm0 2c-3.6 0-8 1.8-8 5v1h16v-1c0-3.2-4.4-5-8-5Z" />
                    </svg>
                  )}
                </span>
              </button>
              <div
                tabIndex={0}
                className="dropdown-content z-10 mt-2 w-72 rounded-box border border-base-300 bg-base-100 shadow-md"
              >
                <div className="flex items-center gap-3 border-b border-base-200 p-3">
                  <span className="avatar avatar-placeholder h-11 w-11 shrink-0 overflow-hidden rounded-full bg-neutral text-neutral-content">
                    {user.photoUrl ? (
                      <img src={user.photoUrl} alt="" className="h-full w-full object-cover" />
                    ) : (
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="m-auto mt-2 h-7 w-7"
                        aria-hidden="true"
                      >
                        <path d="M12 12a4.5 4.5 0 1 0-4.5-4.5A4.5 4.5 0 0 0 12 12Zm0 2c-3.6 0-8 1.8-8 5v1h16v-1c0-3.2-4.4-5-8-5Z" />
                      </svg>
                    )}
                  </span>
                  <div className="min-w-0">
                    <p className="truncate font-medium">{user.name}</p>
                    {user.email && (
                      <p className="truncate text-xs text-base-content/60">{user.email}</p>
                    )}
                  </div>
                </div>
                {userMenu}
                <ul className="menu p-2">
                  {(menuActions ?? [{ id: 'account', label: 'My account' }]).map(
                    (action) => (
                      <li key={action.id}>
                        <a
                          onClick={() =>
                            action.onSelect ? action.onSelect() : onNavigate?.(action.id)
                          }
                        >
                          {action.icon}
                          {action.label}
                        </a>
                      </li>
                    ),
                  )}
                  {onSignOut && (
                    <li>
                      <a onClick={onSignOut}>Sign out</a>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-auto bg-base-200 p-4">{children}</main>
      </div>

      <div className="drawer-side z-20">
        <label
          htmlFor="app-shell-drawer"
          className="drawer-overlay"
          aria-label="Close navigation"
        />
        <aside className="flex min-h-full w-64 flex-col bg-base-100">
          <div className="flex min-h-16 flex-col justify-center border-b border-base-300 px-4">
            {logo ?? (
              <span className="text-lg font-semibold text-primary">{appName}</span>
            )}
            <p className="text-xs text-base-content/60">Document verification</p>
          </div>
          <nav className="flex-1 overflow-y-auto">
            <ul className="menu gap-1 p-3">
              {visibleItems.map((item) => (
                <li key={item.id}>{renderItem(item)}</li>
              ))}
            </ul>
          </nav>
        </aside>
      </div>
    </div>
  );
}
