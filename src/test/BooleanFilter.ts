import * as test from 'tape';
import * as parser from 'query-string-parser';
import { BooleanFilter } from '../BooleanFilter';
import { BooleanFilterOperation } from '../FilterOperation';

test('build query with boolean filter', function(t) {
  t.plan(1);
  const query = new BooleanFilter({
    property: 'boolean',
    op: BooleanFilterOperation.Equals,
    value: true,
  }).build();
  t.same(parser.fromQuery(query), { o: 'Equals', p: 'boolean', v: 'true' });
});


test('build query with boolean filter for valueToString', function(t) {
  t.plan(1);
  const query = new BooleanFilter({
    property: 'boolean',
    op: BooleanFilterOperation.Equals,
    value: true,
  }).valueToString();
  t.same(query, 'true');
});

test('build query with date boolean for every operations', function(t) {
  const operations = Object.keys(BooleanFilterOperation);
  t.plan(operations.length);
  operations.forEach((operation: string) => {
    const query = new BooleanFilter({
      property: 'boolean',
      value: true,
      op: <BooleanFilterOperation>operation,
    }).build();
    t.same(parser.fromQuery(query), { o: operation, p: 'boolean', v: 'true' });
  });
});
