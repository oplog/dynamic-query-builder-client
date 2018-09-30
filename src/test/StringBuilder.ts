import * as test from 'tape';
import * as parser from 'query-string-parser';
import { StringFilter, StringFilterOperation } from '..';

test('build query with string filter', function(t) {
  t.plan(1);
  const query = new StringFilter({
    property: 'string',
    op: StringFilterOperation.Equals,
    value: 'test',
  }).build();
  t.same(parser.fromQuery(query), { o: 'Equals', p: 'string', v: 'test' });
});

test('build query with string filter for array', function(t) {
  t.plan(1);
  const query = new StringFilter({
    property: 'string',
    op: StringFilterOperation.Equals,
    value: ['one', 'two'],
  }).build();
  t.same(parser.fromQuery(query),  { o: 'Equals', p: 'string', v: 'one,two' });
});

test('build query with string filter for valueToString', function(t) {
  t.plan(1);
  const query = new StringFilter({
    property: 'string',
    op: StringFilterOperation.Equals,
    value: ['one', 'two'],
  }).valueToString();
  t.same(query, 'one,two');
});

test('build query with numeric filter for valueToString', function(t) {
  t.plan(1);
  const query = new StringFilter({
    property: 'string',
    op: StringFilterOperation.Equals,
    value: 'one',
  }).valueToString();
  t.same(query, 'one');
});

test('build query with string filter for every operations', function(t) {
  const operations = Object.keys(StringFilterOperation);
  t.plan(operations.length);
  operations.forEach((operation: string) => {
    const query = new StringFilter({
      property: 'string',
      value: 'test',
      op: <StringFilterOperation>operation,
    }).build();
    t.same(parser.fromQuery(query), { o: operation, p: 'string', v: 'test' });
  });
});
