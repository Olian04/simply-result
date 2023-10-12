import { describe } from 'vitest';

import { fromPromise } from '../src/main';

const Expected = 'Expected';

describe('fromPromise', it => {
  it('should return Ok if resolve', async ({ expect }) => {
    const res = await fromPromise(Promise.resolve(Expected));
    expect(res.isOk).to.be.true;
  });

  it('should return Err if reject', async ({ expect }) => {
    const res = await fromPromise(Promise.reject(new Error(Expected)));
    expect(res.isErr).to.be.true;
  });
});
