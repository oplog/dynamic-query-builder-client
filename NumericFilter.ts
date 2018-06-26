import { FilterParams, Filter } from "./Filter";
import { NumericFilterOperation } from "./FilterOperation";
import { buildFilter } from "./Builder";

export interface NumericFilterParams extends FilterParams {
  op?: NumericFilterOperation;
  value: number | Array<number>;
}

export class NumericFilter extends Filter implements NumericFilterParams {
  value: number | Array<number>;
  op: NumericFilterOperation;

  constructor(params: NumericFilterParams) {
    super(params);
    this.value = params.value;
    this.op = params.op || NumericFilterOperation.Equals;
  }

  build(): string {
    if (typeof this.value === "number") {
      return buildFilter(this.op, this.property, `${this.value}`);
    }

    let values: string = (this.value as Array<number>).join(",");
    return buildFilter(this.op, this.property, values);
  }

  valueToString(): string {
    if (typeof this.value === "number") {
      return `${this.value}`;
    }

    return `${this.value.join(",")}`;
  }
}
