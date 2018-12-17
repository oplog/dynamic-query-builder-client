import * as parser from "query-string-parser";
import {
  NumericFilter,
  NumericFilterOperation,
  Pagination,
  QueryBuilder,
  SortDirection,
  SortField,
  StringFilter,
  StringFilterOperation,
} from "../src";

describe("QueryBuilder", () => {
  it("should build query with no filters", () => {
    const builder = new QueryBuilder({ filters: [] });
    expect(builder.build()).toEqual("");
  });

  it("build query with filters", () => {
    // t.plan(2);
    const builder = new QueryBuilder({
      filters: [
        new NumericFilter({
          property: "age",
          value: 25,
          op: NumericFilterOperation.GreaterThan,
        }),
        new StringFilter({
          property: "name",
          value: "Y",
          op: StringFilterOperation.StartsWith,
        }),
      ],
      pagination: new Pagination({
        offset: 0,
        count: 10,
      }),
      sortBy: [
        new SortField({
          property: "name",
          by: SortDirection.DESC,
        }),
        new SortField({
          property: "age",
          by: SortDirection.ASC,
        })],
    });
    const rawQuery = builder.build().toLowerCase(); // toLower to avoid case sensitivity issues.
    const queryParse = parser.fromQuery(rawQuery);

    expect(queryParse).toEqual({
      o: "startswith",
      p: "name",
      v: "y",
      s: "age,asc",
      offset: "0",
      count: "10",
    });

    expect(rawQuery).toContain("o=greaterthan");
    expect(rawQuery).toContain("p=age");
    expect(rawQuery).toContain("v=25");
    expect(rawQuery).toContain("s=name,desc");

    /**
     * Apparently, query-string-parser is not able to parse parameters that occur more than once since it converts
     * the parsed query into an object instead of a kv array but we have to be checking the parameters that occur
     * more than once as well.
     */
  });
});
