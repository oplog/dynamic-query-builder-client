import * as moment from "moment";
import { buildFilter } from "./Builder";
import { Filter, FilterParams } from "./Filter";
import { DateFilterOperation } from "./FilterOperation";

export const DATE_FILTER_FORMAT = "YYYY-MM-DD";

export interface DateFilterParams extends FilterParams {
  op: DateFilterOperation;
  value: moment.Moment | "null" | string;
  dateFormat?: string;
}

export class DateFilter extends Filter implements DateFilterParams {
  public op: DateFilterOperation;
  public value: moment.Moment | "null" | string;
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
      this.value === "null" ? "null" :
        typeof this.value === "string" ? moment(this.value).utc().format(this.dateFormat) :
          this.value.utc().format(this.dateFormat),
    );
  }

  public valueToString(): string {
    return this.value === "null" ? "null" :
      typeof this.value === "string" ? moment(this.value).format(this.dateFormat) :
        this.value.format(this.dateFormat);
  }
}
