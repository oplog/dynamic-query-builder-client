import { Builder } from "./Builder";
import { FilterOperation } from "./FilterOperation";

export interface FilterParams {
  id?: string;
  property: string;
}

export abstract class Filter implements FilterParams, Builder {
  public id: string;
  public property: string;

  constructor(params: FilterParams) {
    this.property = params.property;
    this.id = params.id || this.property;
  }

  abstract get op(): FilterOperation;
  public abstract build(): string;
  public abstract valueToString(): string;
}
