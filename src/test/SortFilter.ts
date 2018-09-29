import * as test from 'tape';
import * as parser from 'query-string-parser';
import { SortField, SortDirection } from '../SortField';

test('build query with sorting filter', function(t) {
  t.plan(1);
  const query = new SortField({
    property: "sort",
    by: SortDirection.NONE
  })
  t.same(parser.fromQuery(query.build()),  {});
});


test('build query with numeric filter for every operations', function(t) {
  const operations = Object.keys(SortDirection);
  operations.pop();
  t.plan(operations.length);
  operations.forEach((operation: string) => {
    const query = new SortField({
      property: 'sort',
      by: <SortDirection>operation,
    }).build();
    t.same(parser.fromQuery(query), { s: `sort,${operation.toLowerCase()}` });
  });
});
