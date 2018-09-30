# Dynamic Query Builder Client

[![CircleCI](https://circleci.com/gh/emrekeskinmac/dynamic-query-builder-client/tree/feature%2Funit-tests.svg?style=svg)](https://circleci.com/gh/emrekeskinmac/dynamic-query-builder-client/tree/feature%2Funit-tests)

![istanbul coverange](https://img.shields.io/badge/code%20coverange-93.04-green.svg)

Dynamic query builder is able to build http query string for `filtering`, `sorting`, `pagination` operations. It works with [DynamicQueryBuilder](https://oplog.visualstudio.com/RnD/Omni%20Code/_git/OmniServices?path=%2Fsrc%2Fbackend%2FDynamicQueryBuilder%2FREADME.md&version=GBmaster&_a=preview) library.

#### NOTE: QueryBuilder is not able to perform http requests. It is only responsible to build query string.

#### NOTE: To perform http requests with query string, the builded query must be url encoded

## Getting Started
All query building operations are done by `QueryBuilder` class. To create a new instance. Here's the constructor parameters;

```ts
export interface QueryBuilderParams {
  filters: Array<Filter>;
  sortBy?: SortField;
  pagination?: Pagination;
}
```

A full example would be the following;
```ts
import {
    QueryBuilder,

} from "@dynamic-query-builder";

export interface User {
    name: string;
    age: number;
}

const builder = new QueryBuilder({
    filters: [
      new NumericFilter({
        property: "age",
        value: 25,
        op: NumericFilterOperation.GreaterThan
      }),
      new StringFilter({
        property: "name",
        value: "Y",
        op: StringFilterOperation.StartsWith
      })
    ],
    pagination: new Pagination({
        offset: 0,
        count: 10
    }),
    sortBy: new SortField({
        property: "name",
        by: SortDirection.DESC
    })
});

const query = builder.build();
// Query will hold the following string
// o=GreaterThan&p=age&v=25&o=StartsWith&p=name&v=Y&offset=0&count=10&s=name,desc

// Give me 10 users sorted by name descending from offset 0
// whose age is greater than 25 AND
// whose names starts with Y
```

## Filters
The possible filters in dynamic query builder is the following;
### StringFilter
String Filter is able to make string filtering;
#### Possible Operations
```ts
export enum StringFilterOperation {
  In = "In",
  Equals = "Equals",
  Contains = "Contains",
  NotEqual = "NotEqual",
  EndsWith = "EndsWith",
  StartsWith = "StartsWith"
}

// example
const filter = new StringFilter({
    property: "name",
    op: StringFilterOperation.StartsWith,
    value: "s"
});
```

### Numeric Filter
Numeric Filter is able to make numeric filtering;
#### Possible Operations
```ts
export enum NumericFilterOperation {
  In = "In",
  Equals = "Equals",
  NotEqual = "NotEqual",
  LessThan = "LessThan",
  LessThanOrEqual = "LessThanOrEqual",
  GreaterThan = "GreaterThan",
  GreaterThanOrEqual = "GreaterThanOrEqual"
}

// example
const filter = new NumericFilter({
    property: "age",
    op: NumericFilterOperation.GreaterThan,
    value: 25
})
```


### Boolean Filter
Boolean Filter is able to make boolean/option filtering;
#### Possible Operations
```ts
export enum BooleanFilterOperation {
  Equals = "Equals",
  NotEqual = "NotEqual"
}

// example
const filter = new BooleanFilter({
    property: "isPremium",
    op: BooleanFilterOperation.Equals,
    value: true
})
```

### Date Filter
Date Filter is able to make date filtering;
#### Possible Operations
```ts
export enum DateFilterOperation {
  Equals = "Equals",
  NotEqual = "NotEqual",
  GreaterThan = "GreaterThan",
  GreaterThanOrEqual = "GreaterThanOrEqual",
  LessThan = "LessThan",
  LessThanOrEqual = "LessThanOrEqual"
}

// example
const filter = new DateFilter({
    property: "birthDate",
    op: DateFilterOperation.GreaterThan,
    value: moment("12/25/1995", "MM-DD-YYYY")
})

// NOTE: Moment library is required for dynamic query builder
```

## Sorting
Sorting can be done by creating `SortField` instance;

```ts
const field = new SortField({
    property: "age",
    by: SortDirection.DESC
});
// The default by parameter is Ascending
```

## Pagination
Pagination can be done by creating `Pagination` instance;
```ts
const pagination = new Pagination({
    offset: 10, // default value is 0
    count: 25 // default value is 25
})
```

## Best Practices
- Always use `QueryBuilder` instance `build()` function for building query string.
- Do not use `filter.build()`, `sortfield.build()` or `pagination.build()` separately
