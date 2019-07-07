import { ArrayFilter } from "../src/ArrayFilter";
import { ArrayFilterOperation } from "../src/FilterOperation";

// Url Parser is not working in this situation
// it cannot be able to parse "o=Any&p=Tests&v=(o=contains&p=Name&v=1,2,3,4,5,6)"
// values are overriding each other on parsing phase
describe("Array Filter", () => {
  it("build query with array filter", () => {
    const query = new ArrayFilter({
      property: "array",
      op: ArrayFilterOperation.In,
      value: "123,456",
    }).build();

    expect(query).toEqual("o=Any&p=array&v=(o=In&p=_&v=123,456)");
  });

  it("should build query with array filter for valueToString", () => {
    const query = new ArrayFilter({
      property: "array",
      op: ArrayFilterOperation.In,
      value: "123,234,345",
    }).valueToString();

    expect(query).toEqual("123,234,345");
  });

  it("should build inner filter for array filter", () => {
    const innerFilter = new ArrayFilter({
      property: "array",
      op: ArrayFilterOperation.In,
      value: "123,234,345",
    }).innerFilterBuild;

    expect(innerFilter).toEqual(`(o=${ArrayFilterOperation.In}&p=_&v=123,234,345)`);
  });

  it("should build query with array filter for every operations", () => {
    // Any is just for inside usage
    const operations = Object.keys(ArrayFilterOperation)
      .filter(e => e !== ArrayFilterOperation.Any);
    operations.forEach((operation: ArrayFilterOperation) => {
      const query = new ArrayFilter({
        property: "array",
        op: operation,
        value: "123,234,345",
      }).build();

      expect(query).toEqual(`o=Any&p=array&v=(o=${operation}&p=_&v=123,234,345)`);
    });
  });

});
