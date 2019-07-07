import { buildFilter } from "./Builder";
import { Filter, FilterParams } from "./Filter";
import { ArrayFilterOperation } from "./FilterOperation";

export interface ArrayFilterParams extends FilterParams {
  op: ArrayFilterOperation;
  value: string;
}

export class ArrayFilter extends Filter implements ArrayFilterParams {
  public op: ArrayFilterOperation;
  public value: string;
  constructor(params: ArrayFilterParams) {
    super(params);
    this.op = params.op;
    this.value = params.value;
  }
  public get innerFilterBuild(): string {
    // example > "o=Any&p=Tests&v=(o=contains&p=Name&v=1,2,3,4,5,6)"
    const o = `o=${this.op}`;
    const p = "p=_";
    const v = `v=${this.value}`;
    // this return will be used as a value for filter
    return `(${[o, p, v].join("&")})`;
  }
  public build(): string {
    return buildFilter(
      ArrayFilterOperation.Any,
      this.property,
      this.innerFilterBuild,
    );
  }
  public valueToString(): string {
    return this.value;
  }
}
