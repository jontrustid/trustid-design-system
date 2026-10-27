import { Fragment, type ComponentPropsWithRef, type ReactNode } from 'react';
import EmptyState from '../feedback/EmptyState';

export interface DataTableColumn<Row> {
  /** Key into the row when `cell` is not provided. */
  key: string;
  header?: ReactNode;
  /** Classes applied to the td/th for this column (e.g. text-right, font-mono). */
  className?: string;
  /** Custom cell renderer; falls back to String(row[key]). */
  cell?: (row: Row, index: number) => ReactNode;
}

export interface DataTableProps<Row> extends ComponentPropsWithRef<'div'> {
  columns: DataTableColumn<Row>[];
  rows: Row[];
  rowKey?: (row: Row, index: number) => string | number;
  /** Per-row classes (e.g. highlight invalid or selected rows). */
  rowClassName?: (row: Row, index: number) => string | undefined;
  /** Optional content rendered as a full-width row after each data row —
   *  e.g. an insert-zone strip between rows. */
  afterRow?: (row: Row, index: number) => ReactNode;
  onRowClick?: (row: Row) => void;
  /** EmptyState title when rows is empty; omit to render an empty table. */
  emptyTitle?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  /** Prevent cell wrapping for dense data grids. */
  nowrap?: boolean;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function DataTable<Row>({
  columns,
  rows,
  rowKey,
  rowClassName,
  afterRow,
  onRowClick,
  emptyTitle,
  size = 'sm',
  nowrap = false,
  className,
  ref,
  ...rest
}: DataTableProps<Row>) {
  if (rows.length === 0 && emptyTitle) {
    return <EmptyState title={emptyTitle} className={className} />;
  }

  return (
    <div
      ref={ref}
      {...rest}
      className={cx('overflow-x-auto rounded-box border border-base-300', className)}
    >
      <table className={cx('table', size !== 'md' && `table-${size}`, nowrap && 'whitespace-nowrap')}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key} className={col.className}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <Fragment key={rowKey ? rowKey(row, i) : i}>
              <tr
                className={cx(
                  onRowClick && 'cursor-pointer hover:bg-base-200/50',
                  rowClassName?.(row, i),
                )}
                onClick={onRowClick ? () => onRowClick(row) : undefined}
              >
                {columns.map((col) => (
                  <td key={col.key} className={col.className}>
                    {col.cell
                      ? col.cell(row, i)
                      : String((row as Record<string, unknown>)[col.key] ?? '')}
                  </td>
                ))}
              </tr>
              {afterRow && (
                <tr>
                  <td colSpan={columns.length} className="p-0">
                    {afterRow(row, i)}
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}
