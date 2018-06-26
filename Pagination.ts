import { Builder } from "./Builder";

export interface PaginationParams {
  offset?: number;
  count?: number;
}

export const DEFAULT_PAGINATION_COUNT = 10;

export class Pagination implements Builder, PaginationParams {
  offset: number;
  count: number;

  constructor(params: PaginationParams) {
    this.offset = params.offset || 0;
    this.count = params.count || DEFAULT_PAGINATION_COUNT;
  }

  build(): string {
    let offset = ["offset", this.offset].join("=");
    let count = ["count", this.count].join("=");

    return [offset, count].join("&");
  }

  get currentPage(): number {
    return this.offset / this.count + 1;
  }
}
