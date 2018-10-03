import { FilterParams, Filter } from "./Filter";
import { BooleanFilterOperation } from "./FilterOperation";
import { buildFilter } from "./Builder";

export interface BooleanFilterParams extends FilterParams {
  op: BooleanFilterOperation;
  value: boolean;
}

export class BooleanFilter extends Filter implements BooleanFilterParams {
  op: BooleanFilterOperation;
  value: boolean;

  constructor(params: BooleanFilterParams) {
    super(params);
    this.op = params.op;
    this.value = params.value;
  }

  build(): string {
    return buildFilter(this.op, this.property, `${this.value}`);
  }

  valueToString(): string {
    return `${this.value}`;
  }
}
