import * as parser from "query-string-parser";
import { DEFAULT_PAGINATION_COUNT, Pagination } from "../src/Pagination";

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

  it("should use default pagination count", () => {
    const count = new Pagination({
      offset: 0,
    }).count;

    expect(count).toBe(DEFAULT_PAGINATION_COUNT);
  });

  it("should get current page", () => {
    let currentPage = new Pagination({
      offset: 25,
      count: 10,
    }).currentPage;

    expect(currentPage).toEqual(3);

    currentPage = new Pagination({
      offset: 30,
      count: 10,
    }).currentPage;

    expect(currentPage).toEqual(4);
  });
});
