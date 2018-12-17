import * as parser from "query-string-parser";
import { BooleanFilter } from "../src/BooleanFilter";
import { BooleanFilterOperation } from "../src/FilterOperation";

describe("BooleanFilter", () => {
  it("build query with boolean filter", () => {
    const query = new BooleanFilter({
      property: "boolean",
      op: BooleanFilterOperation.Equals,
      value: true,
    }).build();

    expect(parser.fromQuery(query)).toEqual({
      o: "Equals",
      p: "boolean",
      v: "true",
    });
  });

  it("should build query with boolean filter for valueToString", () => {
    const query = new BooleanFilter({
      property: "boolean",
      op: BooleanFilterOperation.Equals,
      value: true,
    }).valueToString();

    expect(query).toEqual("true");
  });

  it("should build query with date boolean for every operations", () => {
    const operations = Object.keys(BooleanFilterOperation);

    operations.forEach((operation: string) => {
      const query = new BooleanFilter({
        property: "boolean",
        value: true,
        op: operation as BooleanFilterOperation,
      }).build();

      expect(parser.fromQuery(query)).toEqual({
        o: operation,
        p: "boolean",
        v: "true",
      });
    });
  });
});
