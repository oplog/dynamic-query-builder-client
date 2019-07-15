import * as parser from "query-string-parser";
import { NumericFilterOperation } from "../src/FilterOperation";
import { NumericFilter } from "../src/NumericFilter";

describe("NumericFilter", () => {
  it("should build query with numeric filter", () => {
    const query = new NumericFilter({
      property: "age",
      value: 25,
    }).build();

    expect(parser.fromQuery(query)).toEqual({
      o: "Equals",
      p: "age",
      v: "25",
    });
  });

  it("should build query with numeric filter for array", () => {
    const query = new NumericFilter({
      property: "age",
      value: [25, 26],
    }).build();

    expect(parser.fromQuery(query)).toEqual({
      o: "Equals",
      p: "age",
      v: "25,26",
    });
  });

  it("should build query with numeric filter for valueToString", () => {
    const query = new NumericFilter({
      property: "age",
      value: [25, 26],
    }).valueToString();
    expect(query).toEqual("25,26");
  });

  it("should build query with numeric filter for valueToString", () => {
    const query = new NumericFilter({
      property: "age",
      value: 25,
    }).valueToString();
    expect(query).toEqual("25");
  });

  it("should build query with numeric filter for every operations", () => {
    const operations = Object.keys(NumericFilterOperation);
    operations.forEach((operation: string) => {
      const query = new NumericFilter({
        property: "age",
        value: 25,
        op: operation as NumericFilterOperation,
      }).build();

      expect(parser.fromQuery(query)).toEqual({
        o: operation,
        p: "age",
        v: "25",
      });
    });
  });

  it("should value be null", () => {
    const query = new NumericFilter({
      property: "age",
      value: "null",
    }).valueToString();
    expect(query).toEqual("null");
  });

  it("should build null query", () => {
    const query = new NumericFilter({
      property: "age",
      value: "null",
      op: "Equals" as NumericFilterOperation,
    }).build();
    const o = `o=Equals`;
    const p = `p=age`;
    const v = `v=null`;
    expect(query).toEqual([o, p, v].join("&"));
  });

});
