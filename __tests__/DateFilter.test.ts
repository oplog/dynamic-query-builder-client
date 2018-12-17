import * as moment from "moment";
import * as parser from "query-string-parser";
import { DateFilter } from "../src/DateFilter";
import { DateFilterOperation } from "../src/FilterOperation";

describe("DateFilter", () => {

  it("should build query with date filter", () => {
    const query = new DateFilter({
      property: "date",
      op: DateFilterOperation.Equals,
      value: moment.utc("2018-09-29", "YYYY-MM-DD"),
    }).build();

    expect(parser.fromQuery(query)).toEqual({
      o: "Equals",
      p: "date",
      v: "2018-09-29",
    });
  });

  it("should build query with date filter format", () => {
    const query = new DateFilter({
      property: "date",
      op: DateFilterOperation.Equals,
      value: moment.utc("2018-09-29", "YYYY-MM-DD"),
      dateFormat: "DD/MM/YYYY",
    }).build();

    expect(parser.fromQuery(query)).toEqual({
      o: "Equals",
      p: "date",
      v: "29/09/2018",
    });
  });

  it("should build query with date filter for valueToString", () => {
    const query = new DateFilter({
      property: "date",
      op: DateFilterOperation.Equals,
      value: moment.utc("2018-09-29", "YYYY-MM-DD").utc(),
      dateFormat: "DD/MM/YYYY",
    }).valueToString();

    expect(query).toEqual("29/09/2018");
  });

  it("should build query with date filter for every operations", () => {
    const operations = Object.keys(DateFilterOperation);
    operations.forEach((operation: string) => {
      const query = new DateFilter({
        property: "date",
        value: moment.utc("2018-09-29"),
        op: operation as DateFilterOperation,
      }).build();

      expect(parser.fromQuery(query)).toEqual({
        o: operation,
        p: "date",
        v: "2018-09-29",
      });
    });
  });
});
