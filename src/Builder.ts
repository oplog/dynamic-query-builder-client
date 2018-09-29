import { FilterOperation } from "./FilterOperation";

export interface Builder {
  build: () => string;
}

export function buildFilter(
  op: FilterOperation,
  property: string,
  value: string
): string {
  let o = `o=${op}`;
  let p = `p=${property}`;
  let v = `v=${value}`;

  return [o, p, v].join("&");
}
