import { StringFilterOperation } from "./FilterOperation";
import { Filter, FilterParams } from "./Filter";
import { buildFilter } from "./Builder";

export interface StringFilterParams extends FilterParams {
  op: StringFilterOperation;
  value: string | Array<string>;
}

export class StringFilter extends Filter implements StringFilterParams {
  op: StringFilterOperation;
  value: string | string[];

  constructor(params: StringFilterParams) {
    super(params);
    this.op = params.op;
    this.value = params.value;
  }

  build(): string {
    if (typeof this.value === "string") {
      return buildFilter(this.op, this.property, `${this.value}`);
    }

    let values: string = (this.value as Array<string>).join(",");
    return buildFilter(this.op, this.property, values);
  }

  valueToString(): string {
    if (typeof this.value === "string") {
      return this.value;
    }

    return this.value.join(",");
  }
}
