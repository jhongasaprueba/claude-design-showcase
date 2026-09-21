import * as React from "react";

/** Composition ring with an inline legend. Greens and limes only. */
export interface DonutSegment { label: string; value: number; color?: string }
export interface DonutChartProps extends React.HTMLAttributes<HTMLDivElement> {
  segments?: DonutSegment[];
  size?: number;
  thickness?: number;
  centerLabel?: React.ReactNode;
  centerValue?: React.ReactNode;
  legend?: boolean;
}
export declare function DonutChart(props: DonutChartProps): JSX.Element;
