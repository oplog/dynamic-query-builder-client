import * as test from 'tape';
import { QueryBuilder } from '..';

test('build query with no filters', function(t) {
  t.plan(1);
  const builder = new QueryBuilder({filters:[]});
  const query = builder.build();
  t.equal(query, "")
});
