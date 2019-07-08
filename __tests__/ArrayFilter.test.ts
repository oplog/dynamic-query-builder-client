import { ArrayFilter } from "../src/ArrayFilter";
import { ArrayFilterOperation, StringFilterOperation } from "../src/FilterOperation";

// Url Parser is not working in this situation
// it cannot be able to parse "o=Any&p=Tests&v=(o=contains&p=Name&v=1,2,3,4,5,6)"
// values are overriding each other on parsing phase
describe("Array Filter", () => {
  it("build query with array filter", () => {
    const query = new ArrayFilter({
      property: "array",
      op: StringFilterOperation.In,
      value: "123,456",
      outerOp: ArrayFilterOperation.Any,
      searchField: "_"
    }).build();

    expect(query).toEqual("o=Any&p=array&v=(o=In&p=_&v=123,456)");
  });

  it("should build query with array filter for valueToString", () => {
    const query = new ArrayFilter({
      property: "array",
      op: StringFilterOperation.In,
      value: "123,456",
      outerOp: ArrayFilterOperation.Any,
      searchField: "_"
    }).valueToString();

    expect(query).toEqual("123,456");
  });

  it("should build inner filter for array filter", () => {
    const innerFilter = new ArrayFilter({
      property: "array",
      op: StringFilterOperation.In,
      value: "123,456",
      outerOp: ArrayFilterOperation.Any,
      searchField: "_"
    }).innerFilterBuild;

    expect(innerFilter).toEqual(`(o=${StringFilterOperation.In}&p=_&v=123,456)`);
  });

});
