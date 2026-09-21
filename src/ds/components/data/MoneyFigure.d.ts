import * as React from "react";

/**
 * A currency amount set in tabular figures. The colour carries the meaning.
 */
export interface MoneyFigureProps extends React.HTMLAttributes<HTMLSpanElement> {
  value: number | string;
  /** one of the three cajas — sets symbol, decimals and code: COP ($, 0), USD (US$, 2), USDT (no symbol, 2) */
  currency?: "COP" | "USD" | "USDT";
  /** override the symbol shown small and half-opacity before the number */
  symbol?: string;
  /** override the decimal places */
  decimals?: number;
  /** override the trailing code */
  code?: string;
  /** show the currency code after the number — required whenever two cajas are on screen together */
  showCode?: boolean;
  /** cash = saldo de caja, receivable = me deben, payable = lo que debo, profit = utilidad */
  role?: "cash" | "receivable" | "payable" | "profit" | "neutral" | "inverse";
  size?: "sm" | "md" | "lg" | "xl";
  /** explicit leading sign, e.g. "−" */
  sign?: string;
}
export declare function MoneyFigure(props: MoneyFigureProps): JSX.Element;
