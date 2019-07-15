import { buildFilter } from "./Builder";
import { Filter, FilterParams } from "./Filter";
import { NumericFilterOperation } from "./FilterOperation";

export interface NumericFilterParams extends FilterParams {
  op?: NumericFilterOperation;
  value: number | number[] | "null";
}

export class NumericFilter extends Filter implements NumericFilterParams {
  public value: number | number[] | "null";
  public op: NumericFilterOperation;

  constructor(params: NumericFilterParams) {
    super(params);
    this.value = params.value;
    this.op = params.op || NumericFilterOperation.Equals;
  }

  public build(): string {
    if (this.value === "null") {
      return buildFilter(this.op, this.property, this.value);
    }
    if (typeof this.value === "number") {
      return buildFilter(this.op, this.property, `${this.value}`);
    }

    const values: string = (this.value as number[]).join(",");
    return buildFilter(this.op, this.property, values);
  }

  public valueToString(): string {
    if (this.value === "null") {
      return this.value;
    }

    if (typeof this.value === "number") {
      return `${this.value}`;
    }

    return `${this.value.join(",")}`;
  }
}
