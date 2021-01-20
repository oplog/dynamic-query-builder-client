import { buildFilter } from "./Builder";
import { Filter, FilterParams } from "./Filter";
import {
  ArrayFilterOperation,
  BooleanFilterOperation,
  DateFilterOperation,
  LogicalOperator,
  NumericFilterOperation,
  StringFilterOperation,
} from "./FilterOperation";

export interface ArrayFilterParams extends FilterParams {
  op:
    | NumericFilterOperation
    | StringFilterOperation
    | DateFilterOperation
    | BooleanFilterOperation;
  value: string;
  outerOp: ArrayFilterOperation;
  searchField: string;
  logicalOperator?: LogicalOperator;
}

export class ArrayFilter extends Filter implements ArrayFilterParams {
  public op:
    | NumericFilterOperation
    | StringFilterOperation
    | DateFilterOperation
    | BooleanFilterOperation;
  public value: string;
  public outerOp: ArrayFilterOperation;
  public searchField: string;
  public logicalOperator?: LogicalOperator;
  constructor(params: ArrayFilterParams) {
    super(params);
    this.op = params.op;
    this.outerOp = params.outerOp;
    this.value = params.value;
    this.searchField = params.searchField;
    this.logicalOperator = params.logicalOperator;
  }
  public get innerFilterBuild(): string {
    // example > "o=Any&p=Tests&v=(o=contains&p=Name&v=1,2,3,4,5,6)"
    let o: string = `o=${this.op}`;
    const p: string = `p=${this.searchField}`;
    const v: string = `v=${this.value}`;

    if (this.logicalOperator) {
      o = o.concat(`|${this.logicalOperator}`);
    }

    // this return will be used as a value for filter
    return `(${[o, p, v].join("&")})`;
  }
  public build(): string {
    return buildFilter(
      this.outerOp,
      this.property,
      this.innerFilterBuild,
      this.logicalOperator
    );
  }
  public valueToString(): string {
    return this.value;
  }
}
