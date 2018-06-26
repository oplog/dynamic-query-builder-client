import { Builder } from "./Builder";

export enum SortDirection {
  ASC = "ASC",
  DESC = "DESC",
  NONE = "NONE"
}

export interface SortFieldParams {
  property: string;
  by?: SortDirection;
}

export class SortField implements SortFieldParams, Builder {
  property: string;
  by: SortDirection;

  constructor(params: SortFieldParams) {
    this.property = params.property;
    this.by = params.by || SortDirection.ASC;
  }

  build(): string {
    if (this.by === SortDirection.NONE) {
      return "";
    }

    let value = `${this.property},${this.by.toLowerCase()}`;
    return ["s", value].join("=");
  }
}
