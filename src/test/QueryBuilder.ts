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

test('build query with no filters', function(t) {
  t.plan(1);
  const builder = new QueryBuilder({ filters: [] });
  t.equal(builder.build(), '');
});

test('build query with filters', function(t) {
  t.plan(1);
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
    sortBy: new SortField({
      property: 'name',
      by: SortDirection.DESC,
    }),
  });
  const queryParse = parser.fromQuery(builder.build());

  t.same(queryParse, {
      p: 'name',
      o: 'StartsWith',
      v: 'Y',
      s: 'name,desc',
      offset: '0',
      count: '10',
    });
});
