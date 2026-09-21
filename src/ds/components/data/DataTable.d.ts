import * as React from "react";

/**
 * Borderless table: uppercase 11px headers, hairline row rules, cream hover.
 */
export interface DataTableColumn<T = any> {
  key: string;
  header: React.ReactNode;
  align?: "left" | "right" | "center";
  width?: string | number;
  /** cell renderer; return a Badge, Avatar row, MoneyFigure, etc. */
  render?: (row: T, index: number) => React.ReactNode;
}
export interface DataTableProps<T = any> extends React.HTMLAttributes<HTMLDivElement> {
  columns?: DataTableColumn<T>[];
  rows?: T[];
  onRowClick?: (row: T, index: number) => void;
  /** 44px rows instead of 56px */
  dense?: boolean;
  /** shown instead of the table when rows is empty */
  emptyState?: React.ReactNode;
}
export declare function DataTable(props: DataTableProps): JSX.Element;
