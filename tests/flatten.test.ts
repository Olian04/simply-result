import { describe } from 'vitest';

import { Err, None, Ok, Option, Result, Some, Try, TryAsync, flatten } from '../src/main';

const Expected = 'Expected';

describe('flatten', it => {
  it('should return inner Option of Option<Option>', ({ expect }) => {
    const before = Some(Some(Expected)) as Option<Option<string>>;
    const after = flatten(before);
    expect(after.isSome ? after.some : expect.fail()).to.equal(Expected);
  });

  it('should return None for None', ({ expect }) => {
    const before = None as Option<Option<string>>;
    const after = flatten(before);
    expect(after).to.equal(None);
  });

  it('should return inner Result of Result<Result>', ({ expect }) => {
    const before = Ok(Ok(Expected)) as Result<Result<string>>;
    const after = flatten(before);
    expect(after.isOk ? after.ok : expect.fail()).to.equal(Expected);
  });

  it('should return inner Err for Err', ({ expect }) => {
    const before = Err(new Error()) as Result<Result<string>>;
    const after = flatten(before);
    expect(after.isErr ? after.err : expect.fail()).to.be.instanceOf(Error);
  });
});

