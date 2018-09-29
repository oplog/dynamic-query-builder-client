import * as test from 'tape';
import * as parser from 'query-string-parser';
import { NumericFilter, NumericFilterOperation } from '..';

test('build query with numeric filter', function(t) {
  t.plan(1);
  const query = new NumericFilter({
    property: 'age',
    value: 25,
  }).build();
  t.same(parser.fromQuery(query),  { o: 'Equals', p: 'age', v: '25' });
});

test('build query with numeric filter for array', function(t) {
  t.plan(1);
  const query = new NumericFilter({
    property: 'age',
    value: [25, 26],
  }).build();
  t.same(parser.fromQuery(query), { o: 'Equals', p: 'age', v: '25,26' });
});

test('build query with numeric filter for valueToString', function(t) {
  t.plan(1);
  const query = new NumericFilter({
    property: 'age',
    value: [25, 26],
  }).valueToString();
  t.same(query, '25,26');
});

test('build query with numeric filter for valueToString', function(t) {
  t.plan(1);
  const query = new NumericFilter({
    property: 'age',
    value: 25,
  }).valueToString();
  t.same(query, '25');
});

test('build query with numeric filter for every operations', function(t) {
  const operations = Object.keys(NumericFilterOperation);
  t.plan(operations.length);
  operations.forEach((operation: string) => {
    const query = new NumericFilter({
      property: 'age',
      value: 25,
      op: <NumericFilterOperation>operation,
    }).build();
    t.same(parser.fromQuery(query), { o: operation, p: 'age', v: '25' });
  });
});
