import * as parser from "query-string-parser";
import { SortDirection, SortField } from "../src/SortField";

describe("SortFilter", () => {

  it("should build query with sorting filter", () => {
    const query = new SortField({
      property: "sort",
      by: SortDirection.NONE,
    });
    expect(parser.fromQuery(query.build())).toEqual({});
  });

  it("should build query with sorting filter for every operations", () => {
    const operations = Object.keys(SortDirection);
    operations.pop();
    // t.plan(operations.length);
    operations.forEach((operation: string) => {
      const query = new SortField({
        property: "sort",
        by: operation as SortDirection,
      }).build();

      expect(parser.fromQuery(query)).toEqual({
        s: `sort,${operation.toLowerCase()}`,
      });
    });
  });
});
