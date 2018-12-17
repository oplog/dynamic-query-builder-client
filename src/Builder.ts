import { FilterOperation } from "./FilterOperation";

export interface Builder {
  build: () => string;
}

export function buildFilter(
  op: FilterOperation,
  property: string,
  value: string,
): string {
  const o = `o=${op}`;
  const p = `p=${property}`;
  const v = `v=${value}`;

  return [o, p, v].join("&");
}
