import * as React from "react";

/** Bare column chart for a card footer: tinted history, one saturated current bar. */
export interface BarSparklineProps extends React.HTMLAttributes<HTMLDivElement> {
  values?: number[];
  role?: "cash" | "receivable" | "payable" | "profit" | "neutral";
  height?: number;
  gap?: number;
  /** colour only the last bar (default); false colours every bar */
  highlightLast?: boolean;
}
export declare function BarSparkline(props: BarSparklineProps): JSX.Element;
