import * as test from 'tape';
import * as parser from 'query-string-parser';
import {
  QueryBuilder,
  NumericFilter,
  StringFilter,
  NumericFilterOperation,
  StringFilterOperation,
  SortDirection,
  SortField,
  Pagination,
} from '..';

test('build query with no filters', function (t) {
  t.plan(1);
  const builder = new QueryBuilder({ filters: [] });
  t.equal(builder.build(), '');
});

test('build query with filters', function (t) {
  t.plan(2);
  const builder = new QueryBuilder({
    filters: [
      new NumericFilter({
        property: 'age',
        value: 25,
        op: NumericFilterOperation.GreaterThan,
      }),
      new StringFilter({
        property: 'name',
        value: 'Y',
        op: StringFilterOperation.StartsWith,
      }),
    ],
    pagination: new Pagination({
      offset: 0,
      count: 10,
    }),
    sortBy: [
      new SortField({
        property: 'name',
        by: SortDirection.DESC,
      }),
      new SortField({
        property: 'age',
        by: SortDirection.ASC
      })],
  });
  const rawQuery = builder.build().toLowerCase(); // toLower to avoid case sensitivity issues.
  const queryParse = parser.fromQuery(rawQuery);
  t.same(queryParse, {
    o: 'startswith',
    p: 'name',
    v: 'y',
    s: 'age,asc',
    offset: '0',
    count: '10',
  });

  /**
   * Apparently, query-string-parser is not able to parse parameters that occur more than once since it converts
   * the parsed query into an object instead of a kv array but we have to be checking the parameters that occur
   * more than once as well.
   */

  t.true(
    rawQuery.indexOf('o=greaterthan') >= 0
    && rawQuery.indexOf('p=age') >= 0
    && rawQuery.indexOf('v=25') >= 0
    && rawQuery.indexOf('s=name,desc') >= 0);
});
