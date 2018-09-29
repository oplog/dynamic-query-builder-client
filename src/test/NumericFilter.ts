import * as test from 'tape';
import { NumericFilter, NumericFilterOperation } from '..';

test('build query with numeric filter', function(t) {
  t.plan(1);
  t.equal(new NumericFilter({
      property: 'age',
      value: 25,
    }).build(), 'o=Equals&p=age&v=25');
});

test('build query with numeric filter for array', function(t) {
  t.plan(1);
  t.equal(new NumericFilter({
      property: 'age',
      value: [25, 26],
    }).build(), 'o=Equals&p=age&v=25,26');
});

test('build query with numeric filter for every operations', function(t) {
  const operations = Object.keys(NumericFilterOperation);
  t.plan(operations.length);
  operations.forEach((operation: string) => {
    t.equal(
      new NumericFilter({
        property: 'age',
        value: 25,
        op: <NumericFilterOperation>operation,
      }).build(),
      `o=${operation}&p=age&v=25`
    );
  });
});
