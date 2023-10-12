import { describe } from 'vitest';

import { Err, None, Ok, Option, Result, Some, transpose } from '../src/main';

const Expected = 'Expected';

describe('transpose', it => {
  it('should return Some<Ok> for Ok<Some>', ({ expect }) => {
    const before = Ok(Some(Expected)) as Result<Option<string>>;
    const after = transpose(before);
    expect(
      after.isSome
        ? after.some.isOk
          ? after.some.ok
          : expect.fail()
        : expect.fail()
    ).to.equal(Expected);
  });

  it('should return Some<Err> for Err', ({ expect }) => {
    const before = Err(new Error()) as Result<Option<string>>;
    const after = transpose(before);
    expect(
      after.isSome
        ? after.some.isErr
          ? after.some.err
          : expect.fail()
        : expect.fail()
    ).to.be.instanceOf(Error);
  });

  it('should return None for Ok<None>', ({ expect }) => {
    const before = Ok(None) as Result<Option<string>>;
    const after = transpose(before);
    expect(after).to.equal(None);
  });
});

