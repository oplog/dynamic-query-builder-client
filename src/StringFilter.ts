import { buildFilter } from "./Builder";
import { Filter, FilterParams } from "./Filter";
import { LogicalOperator, StringFilterOperation } from "./FilterOperation";

export interface StringFilterParams extends FilterParams {
  op: StringFilterOperation;
  value: string | string[];
  logicalOperator?: LogicalOperator;
}

export class StringFilter extends Filter implements StringFilterParams {
  public op: StringFilterOperation;
  public value: string | string[];
  public logicalOperator?: LogicalOperator;

  constructor(params: StringFilterParams) {
    super(params);
    this.op = params.op;
    this.value = params.value;
    this.logicalOperator = params.logicalOperator;
  }

  public build(): string {
    if (typeof this.value === "string") {
      return buildFilter(
        this.op,
        this.property,
        `${this.value}`,
        this.logicalOperator
      );
    }

    const values: string = (this.value as string[]).join(",");
    return buildFilter(this.op, this.property, values, this.logicalOperator);
  }

  public valueToString(): string {
    if (typeof this.value === "string") {
      return this.value;
    }

    return this.value.join(",");
  }
}
