import { Filter } from "./Filter";
import { SortField } from "./SortField";
import { Builder } from "./Builder";
import { Pagination } from "./Pagination";

export interface QueryBuilderParams {
  filters: Array<Filter>;
  sortBy?: Array<SortField>;
  pagination?: Pagination;
}

export class QueryBuilder implements Builder, QueryBuilderParams {
  filters: Filter[];
  sortBy?: Array<SortField>;
  pagination?: Pagination;

  constructor(params: QueryBuilderParams) {
    this.filters = params.filters;
    this.sortBy = params.sortBy;
    this.pagination = params.pagination;
  }

  build(): string {
    const filterQueries: Array<string> = this.filters.map(f => f.build());
    const sortByQueries = this.sortBy ? this.sortBy.map(s => s.build()) : undefined;
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
