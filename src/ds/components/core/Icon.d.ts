import * as React from "react";

/** Lucide glyph wrapper. Requires the Lucide UMD script on the page. */
export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Lucide icon name, e.g. "wallet", "arrow-down-left", "trending-up" */
  name: string;
  size?: number;
  /** 1.75 is the house stroke weight */
  strokeWidth?: number;
  color?: string;
}
export declare function Icon(props: IconProps): JSX.Element;
