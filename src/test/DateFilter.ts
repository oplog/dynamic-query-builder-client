import * as test from 'tape';
import * as parser from 'query-string-parser';
import * as Moment from 'moment';
import { DateFilter } from '../DateFilter';
import { DateFilterOperation } from '../FilterOperation';

test('build query with date filter', function(t) {
  t.plan(1);
  const query = new DateFilter({
    property: 'date',
    op: DateFilterOperation.Equals,
    value: Moment('2018-09-29', 'YYYY-MM-DD'),
  }).build();
  t.same(parser.fromQuery(query), { o: 'Equals', p: 'date', v: '2018-09-29' });
});

test('build query with date filter format', function(t) {
  t.plan(1);
  const query = new DateFilter({
    property: 'date',
    op: DateFilterOperation.Equals,
    value: Moment('2018-09-29', 'YYYY-MM-DD'),
    dateFormat: 'DD/MM/YYYY',
  }).build();
  t.same(parser.fromQuery(query), { o: 'Equals', p: 'date', v: '29/09/2018' });
});

test('build query with date filter for valueToString', function(t) {
  t.plan(1);
  const query = new DateFilter({
    property: 'date',
    op: DateFilterOperation.Equals,
    value: Moment('2018-09-29', 'YYYY-MM-DD'),
    dateFormat: 'DD/MM/YYYY',
  }).valueToString();
  t.same(query, '29/09/2018');
});

test('build query with date filter for every operations', function(t) {
  const operations = Object.keys(DateFilterOperation);
  t.plan(operations.length);
  operations.forEach((operation: string) => {
    const query = new DateFilter({
      property: 'date',
      value: Moment('2018-09-29'),
      op: <DateFilterOperation>operation,
    }).build();
    t.same(parser.fromQuery(query), {
      o: operation,
      p: 'date',
      v: '2018-09-29',
    });
  });
});
