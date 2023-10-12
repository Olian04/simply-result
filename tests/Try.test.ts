import { describe } from 'vitest';

import { Try, TryAsync } from '../src/main';

const Expected = 'Expected';

describe('Try', it => {
  it('should return Ok if no throw', ({ expect }) => {
    const res = Try(() => Expected);
    expect(res.isOk).to.be.true;
  });

  it('should return Err if throw', ({ expect }) => {
    const res = Try(() => {
      throw new Error(Expected);
    });
    expect(res.isErr).to.be.true;
  });
});

describe('TryAsync', it => {
  it('should return Ok if no throw', async ({ expect }) => {
    const res = await TryAsync(async () => Expected);
    expect(res.isOk).to.be.true;
  });

  it('should return Err if throw', async ({ expect }) => {
    const res = await TryAsync(async () => {
      throw new Error(Expected);
    });
    expect(res.isErr).to.be.true;
  });
});
