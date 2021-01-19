import { FilterOperation, LogicalOperator } from "./FilterOperation";

export interface Builder {
  build: () => string;
}

export function buildFilter(
  op: FilterOperation,
  property: string,
  value: string,
  logicalOperator?: LogicalOperator
): string {
  let o = `o=${op}`;
  const p = `p=${property}`;
  const v = `v=${value}`;

  if (logicalOperator) {
    o = o.concat(`|${logicalOperator}`);
  }

  return [o, p, v].join("&");
}
