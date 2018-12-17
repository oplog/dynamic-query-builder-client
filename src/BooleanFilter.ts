import { buildFilter } from "./Builder";
import { Filter, FilterParams } from "./Filter";
import { BooleanFilterOperation } from "./FilterOperation";

export interface BooleanFilterParams extends FilterParams {
  op: BooleanFilterOperation;
  value: boolean;
}

export class BooleanFilter extends Filter implements BooleanFilterParams {
  public op: BooleanFilterOperation;
  public value: boolean;

  constructor(params: BooleanFilterParams) {
    super(params);
    this.op = params.op;
    this.value = params.value;
  }

  public build(): string {
    return buildFilter(this.op, this.property, `${this.value}`);
  }

  public valueToString(): string {
    return `${this.value}`;
  }
}
