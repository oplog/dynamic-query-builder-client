import { buildFilter } from "./Builder";
import { Filter, FilterParams } from "./Filter";
// tslint:disable-next-line:max-line-length
import { ArrayFilterOperation, BooleanFilterOperation, DateFilterOperation, NumericFilterOperation, StringFilterOperation } from "./FilterOperation";

export interface ArrayFilterParams extends FilterParams {
  // tslint:disable-next-line:max-line-length
  op: NumericFilterOperation | StringFilterOperation | DateFilterOperation | BooleanFilterOperation;
  value: string;
  outerOp: ArrayFilterOperation;
  searchField: string;
}

export class ArrayFilter extends Filter implements ArrayFilterParams {
  // tslint:disable-next-line:max-line-length
  public op: NumericFilterOperation | StringFilterOperation | DateFilterOperation | BooleanFilterOperation;
  public value: string;
  public outerOp: ArrayFilterOperation;
  public searchField: string;
  constructor(params: ArrayFilterParams) {
    super(params);
    this.op = params.op;
    this.outerOp = params.outerOp;
    this.value = params.value;
    this.searchField = params.searchField;
  }
  public get innerFilterBuild(): string {
    // example > "o=Any&p=Tests&v=(o=contains&p=Name&v=1,2,3,4,5,6)"
    const o = `o=${this.op}`;
    const p = `p=${this.searchField}`;
    const v = `v=${this.value}`;
    // this return will be used as a value for filter
    return `(${[o, p, v].join("&")})`;
  }
  public build(): string {
    return buildFilter(
      this.outerOp,
      this.property,
      this.innerFilterBuild,
    );
  }
  public valueToString(): string {
    return this.value;
  }
}
