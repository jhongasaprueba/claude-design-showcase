import * as React from "react";

/** Horizontal share bar: collected vs pending, paid vs owed. */
export interface ProgressMeterProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
  max?: number;
  role?: "cash" | "receivable" | "payable" | "profit" | "neutral";
  label?: React.ReactNode;
  /** right-aligned figure above the bar */
  valueLabel?: React.ReactNode;
  height?: number;
}
export declare function ProgressMeter(props: ProgressMeterProps): JSX.Element;
