import { buildFilter } from "./Builder";
import { Filter, FilterParams } from "./Filter";
import { StringFilterOperation } from "./FilterOperation";

export interface StringFilterParams extends FilterParams {
  op: StringFilterOperation;
  value: string | string[];
}

export class StringFilter extends Filter implements StringFilterParams {
  public op: StringFilterOperation;
  public value: string | string[];

  constructor(params: StringFilterParams) {
    super(params);
    this.op = params.op;
    this.value = params.value;
  }

  public build(): string {
    if (typeof this.value === "string") {
      return buildFilter(this.op, this.property, `${this.value}`);
    }

    const values: string = (this.value as string[]).join(",");
    return buildFilter(this.op, this.property, values);
  }

  public valueToString(): string {
    if (typeof this.value === "string") {
      return this.value;
    }

    return this.value.join(",");
  }
}
