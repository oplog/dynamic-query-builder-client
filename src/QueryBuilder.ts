import { Builder } from "./Builder";
import { Filter } from "./Filter";
import { Pagination } from "./Pagination";
import { SortField } from "./SortField";

export interface QueryBuilderParams {
  filters: Filter[];
  sortBy?: SortField[] | SortField;
  pagination?: Pagination;
}

export class QueryBuilder implements Builder, QueryBuilderParams {
  public filters: Filter[];
  public sortBy?: SortField[] | SortField;
  public pagination?: Pagination;

  constructor(params: QueryBuilderParams) {
    this.filters = params.filters;
    this.sortBy = params.sortBy;
    this.pagination = params.pagination;
  }

  public build(): string {
    const filterQueries: string[] = this.filters.map((f) => f.build());

    let sortByQueries;
    if (Array.isArray(this.sortBy)) {
      sortByQueries = this.sortBy ? this.sortBy.map((s) => s.build()) : undefined;
    } else {
      sortByQueries = this.sortBy ? [this.sortBy.build()] : undefined;
    }
    const paginationQuery = this.pagination
      ? this.pagination.build()
      : undefined;
    const statements = [filterQueries.join("&")];

    if (sortByQueries) {
      statements.push(sortByQueries.join("&"));
    }

    if (paginationQuery) {
      statements.push(paginationQuery);
    }
    return statements.join("&");
  }
}
