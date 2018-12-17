import { Moment } from "moment";
import { buildFilter } from "./Builder";
import { Filter, FilterParams } from "./Filter";
import { DateFilterOperation } from "./FilterOperation";

export const DATE_FILTER_FORMAT = "YYYY-MM-DD";

export interface DateFilterParams extends FilterParams {
  op: DateFilterOperation;
  value: Moment;
  dateFormat?: string;
}

export class DateFilter extends Filter implements DateFilterParams {
  public op: DateFilterOperation;
  public value: Moment;
  public dateFormat: string;

  constructor(params: DateFilterParams) {
    super(params);
    this.op = params.op;
    this.value = params.value;
    this.dateFormat = params.dateFormat || DATE_FILTER_FORMAT;
  }

  public build(): string {
    return buildFilter(
      this.op,
      this.property,
      this.value.utc().format(this.dateFormat),
    );
  }

  public valueToString(): string {
    return this.value.format(this.dateFormat);
  }
}
