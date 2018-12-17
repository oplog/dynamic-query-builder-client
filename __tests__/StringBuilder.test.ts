import * as parser from "query-string-parser";
import { StringFilterOperation } from "../src/FilterOperation";
import { StringFilter } from "../src/StringFilter";

describe("StringBuilder", () => {

  it("should build query with string filter", () => {
    const query = new StringFilter({
      property: "string",
      op: StringFilterOperation.Equals,
      value: "test",
    }).build();

    expect(parser.fromQuery(query)).toEqual({
      o: "Equals",
      p: "string",
      v: "test",
    });
  });

  it("should build query with string filter for array", () => {
    const query = new StringFilter({
      property: "string",
      op: StringFilterOperation.Equals,
      value: ["one", "two"],
    }).build();

    expect(parser.fromQuery(query)).toEqual({
      o: "Equals",
      p: "string",
      v: "one,two",
    });

  });
  it("should build query with string filter for valueToString", () => {
    const query = new StringFilter({
      property: "string",
      op: StringFilterOperation.Equals,
      value: ["one", "two"],
    }).valueToString();
    expect(query).toEqual("one,two");
  });

  it("should build query with numeric filter for valueToString", () => {
    const query = new StringFilter({
      property: "string",
      op: StringFilterOperation.Equals,
      value: "one",
    }).valueToString();
    expect(query).toEqual("one");
  });

  it("should build query with string filter for every operations", () => {
    const operations = Object.keys(StringFilterOperation);
    // t.plan(operations.length);
    operations.forEach((operation: string) => {
      const query = new StringFilter({
        property: "string",
        value: "test",
        op: operation as StringFilterOperation,
      }).build();

      expect(parser.fromQuery(query)).toEqual({
        o: operation,
        p: "string",
        v: "test",
      });
    });
  });
});
