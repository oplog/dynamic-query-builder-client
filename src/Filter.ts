import { Builder } from "./Builder";
import { FilterOperation } from "./FilterOperation";

export interface FilterParams {
  id?: string;
  property: string;
}

export abstract class Filter implements FilterParams, Builder {
  id: string;
  property: string;

  constructor(params: FilterParams) {
    this.property = params.property;
    this.id = params.id || this.property;
  }

  abstract get op(): FilterOperation;
  abstract build(): string;
  abstract valueToString(): string;
}
