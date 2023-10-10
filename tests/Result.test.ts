import { describe } from 'vitest';

import { Err, None, Ok, Result } from '../dist/main';

const Expected = 'Expected';
const Wrong = 'Wrong';

describe('Result', it => {
  describe('Ok', it => {
    it('should expose correct property values', ({ expect }) => {
      const res = Ok(Expected);
      expect(res.isOk).to.be.true;
      expect(res.isErr).to.be.false;
      expect(res.ok).to.equal(Expected);
      expect(
        //@ts-expect-error
        res.err
      ).to.equal(undefined);
    });
  });

  describe('Err', it => {
    it('should expose correct property values', ({ expect }) => {
      const res = Err(Expected);
      expect(res.isOk).to.be.false;
      expect(res.isErr).to.be.true;
      expect(res.err).to.equal(Expected);
      expect(
        //@ts-expect-error
        res.ok
      ).to.equal(undefined);
    });
  });

  it('andThen to replace Ok', ({ expect }) => {
    const before = Ok(Expected) as Result<string, string>;
    const after = before.andThen(() => Ok(Wrong));
    expect(after.isOk ? after.ok : expect.fail()).to.equal(Wrong);
  });

  it('andThen to preserve Err', ({ expect }) => {
    const before = Err(Expected) as Result<string, string>;
    const after = before.andThen(() => Err(Wrong));
    expect(after.isErr ? after.err : expect.fail()).to.equal(Expected);
  });

  it('elseThen to preserve Ok', ({ expect }) => {
    const before = Ok(Expected) as Result<string, string>;
    const after = before.elseThen(() => Ok(Wrong));
    expect(after.isOk ? after.ok : expect.fail()).to.equal(Expected);
  });

  it('elseThen to replace Err', ({ expect }) => {
    const before = Err(Expected) as Result<string, string>;
    const after = before.elseThen(() => Err(Wrong));
    expect(after.isErr ? after.err : expect.fail()).to.equal(Wrong);
  });

  it('match to extract inner value of Ok', ({ expect }) => {
    const before = Ok(Expected) as Result<string, string>;
    const after = before.match({
      Ok: it => it,
      Err: () => Wrong,
    });
    expect(after).to.equal(Expected);
  });

  it('match to extract inner value of Err', ({ expect }) => {
    const before = Err(Expected) as Result<string, string>;
    const after = before.match({
      Err: it => it,
      Ok: () => Wrong,
    });
    expect(after).to.equal(Expected);
  });

  it('intoOption of Ok to be Some', ({ expect }) => {
    const before = Ok(Expected) as Result<string, string>;
    const after = before.intoOption();
    expect(after.isSome ? after.some : expect.fail()).to.equal(Expected);
  });

  it('intoOption of Err to be None', ({ expect }) => {
    const before = Err(Expected) as Result<string, string>;
    const after = before.intoOption();
    expect(after).to.equal(None);
  });

  it('intoErrOption of Ok to be None', ({ expect }) => {
    const before = Ok(Expected) as Result<string, string>;
    const after = before.intoErrOption();
    expect(after).to.equal(None);
  });

  it('intoErrOption of Err to be Some', ({ expect }) => {
    const before = Err(Expected) as Result<string, string>;
    const after = before.intoErrOption();
    expect(after.isSome ? after.some : expect.fail()).to.equal(Expected);
  });
});
