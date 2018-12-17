import * as parser from "query-string-parser";
import { Pagination } from "../src/Pagination";

describe("Pagination", () => {
  it("build query with pagination filter", () => {
    const query = new Pagination({
      offset: 0,
      count: 10,
    });
    expect(parser.fromQuery(query.build())).toEqual({
      offset: "0",
      count: "10",
    });
  });
});
