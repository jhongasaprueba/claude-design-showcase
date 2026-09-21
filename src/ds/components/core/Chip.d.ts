import * as React from "react";

/** Toggleable filter pill. */
export interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  selected?: boolean;
  icon?: React.ReactNode;
  /** trailing count, e.g. number of matching rows */
  count?: number;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}
export declare function Chip(props: ChipProps): JSX.Element;
