import { buildFilter } from "./Builder";
import { Filter, FilterParams } from "./Filter";
import { BooleanFilterOperation, LogicalOperator } from "./FilterOperation";

export interface BooleanFilterParams extends FilterParams {
  op: BooleanFilterOperation;
  value: boolean;
  logicalOperator?: LogicalOperator;
}

export class BooleanFilter extends Filter implements BooleanFilterParams {
  public op: BooleanFilterOperation;
  public value: boolean;
  public logicalOperator?: LogicalOperator;

  constructor(params: BooleanFilterParams) {
    super(params);
    this.op = params.op;
    this.value = params.value;
    this.logicalOperator = params.logicalOperator;
  }

  public build(): string {
    return buildFilter(
      this.op,
      this.property,
      `${this.value}`,
      this.logicalOperator
    );
  }

  public valueToString(): string {
    return `${this.value}`;
  }
}
