import { Moment } from "moment";
import { DateFilterOperation } from "./FilterOperation";
import { FilterParams, Filter } from "./Filter";
import { buildFilter } from "./Builder";

export const DATE_FILTER_FORMAT = "YYYY-MM-DD";

export interface DateFilterParams extends FilterParams {
  op: DateFilterOperation;
  value: Moment;
  dateFormat?: string;
}

export class DateFilter extends Filter implements DateFilterParams {
  op: DateFilterOperation;
  value: Moment;
  dateFormat: string;

  constructor(params: DateFilterParams) {
    super(params);
    this.op = params.op;
    this.value = params.value;
    this.dateFormat = params.dateFormat || DATE_FILTER_FORMAT;
  }

  build(): string {
    return buildFilter(
      this.op,
      this.property,
      this.value.format(this.dateFormat)
    );
  }

  valueToString(): string {
    return this.value.format(this.dateFormat);
  }
}
