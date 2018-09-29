import * as test from 'tape';
import * as parser from 'query-string-parser';
import { Pagination } from '..';

test('build query with pagination filter', function(t) {
  t.plan(2);
  const query = new Pagination({
    offset: 0,
    count: 10,
  })
  t.same(parser.fromQuery(query.build()), { offset: '0', count: '10' });
  t.equals(query.currentPage, 1)
});

