import { describe } from 'vitest';

import { Err, None, Ok, Result } from '../src/main';

const Expected = 'Expected';
const Wrong = 'Wrong';

describe('Result', () => {
  describe('Ok', it => {
    it('should expose correct property values', ({ expect }) => {
      const res = Ok(Expected);
      expect(res.isOk).to.be.true;
      expect(res.isErr).to.be.false;
      expect(res.ok).to.equal(Expected);
      expect(res.err).to.equal(undefined);
    });

    it('.map should replace inner value of Ok', ({ expect }) => {
      const before = Ok(Wrong) as Result<string, string>;
      const after = before.map(() => Expected);
      expect(after.isOk ? after.ok : expect.fail()).to.equal(Expected);
    });

    it('.mapErr should preserve Ok', ({ expect }) => {
      const before = Ok(Expected) as Result<string, string>;
      const after = before.mapErr(() => Wrong);
      expect(after.isOk ? after.ok : expect.fail()).to.equal(Expected);
    });

    it('.andThen should replace Ok', ({ expect }) => {
      const before = Ok(Wrong) as Result<string, string>;
      const after = before.andThen(() => Ok(Expected));
      expect(after.isOk ? after.ok : expect.fail()).to.equal(Expected);
    });

    it('.elseThen should preserve Ok', ({ expect }) => {
      const before = Ok(Expected) as Result<string, string>;
      const after = before.elseThen(() => Ok(Wrong));
      expect(after.isOk ? after.ok : expect.fail()).to.equal(Expected);
    });

    it('.unwrapOr should return inner value', ({ expect }) => {
      const before = Ok(Expected) as Result<string, string>;
      const after = before.unwrapOr(Wrong);
      expect(after).to.equal(Expected);
    });

    it('.unwrapElse should return inner value', ({ expect }) => {
      const before = Ok(Expected) as Result<string, string>;
      const after = before.unwrapElse(() => Wrong);
      expect(after).to.equal(Expected);
    });

    it('.match should extract inner value of Ok', ({ expect }) => {
      const before = Ok(Expected) as Result<string, string>;
      const after = before.match({
        Ok: it => it,
        Err: () => Wrong,
      });
      expect(after).to.equal(Expected);
    });

    it('.intoOption should be Some', ({ expect }) => {
      const before = Ok(Expected) as Result<string, string>;
      const after = before.intoOption();
      expect(after.isSome ? after.some : expect.fail()).to.equal(Expected);
    });

    it('.intoErrOption should be None', ({ expect }) => {
      const before = Ok(Expected) as Result<string, string>;
      const after = before.intoErrOption();
      expect(after).to.equal(None);
    });

    it('.toString should return a string', ({ expect }) => {
      expect(Ok(Expected).toString()).toBeTypeOf('string');
    });
  });

  describe('Err', it => {
    it('should expose correct property values', ({ expect }) => {
      const res = Err(Expected);
      expect(res.isOk).to.be.false;
      expect(res.isErr).to.be.true;
      expect(res.err).to.equal(Expected);
      expect(res.ok).to.equal(undefined);
    });

    it('.map should preserve Err', ({ expect }) => {
      const before = Err(Expected) as Result<string, string>;
      const after = before.map(() => Wrong);
      expect(after.isErr ? after.err : expect.fail()).to.equal(Expected);
    });

    it('.mapErr should replace inner value of Err', ({ expect }) => {
      const before = Err(Wrong) as Result<string, string>;
      const after = before.mapErr(() => Expected);
      expect(after.isErr ? after.err : expect.fail()).to.equal(Expected);
    });

    it('.andThen should preserve Err', ({ expect }) => {
      const before = Err(Expected) as Result<string, string>;
      const after = before.andThen(() => Err(Wrong));
      expect(after.isErr ? after.err : expect.fail()).to.equal(Expected);
    });

    it('.elseThen should replace Err', ({ expect }) => {
      const before = Err(Wrong) as Result<string, string>;
      const after = before.elseThen(() => Err(Expected));
      expect(after.isErr ? after.err : expect.fail()).to.equal(Expected);
    });

    it('.unwrapOr should return argument', ({ expect }) => {
      const before = Err(Expected) as Result<string, string>;
      const after = before.unwrapOr(Expected);
      expect(after).to.equal(Expected);
    });

    it('.unwrapElse should return fn return value', ({ expect }) => {
      const before = Err(Expected) as Result<string, string>;
      const after = before.unwrapElse(() => Expected);
      expect(after).to.equal(Expected);
    });

    it('.match should extract inner value of Err', ({ expect }) => {
      const before = Err(Expected) as Result<string, string>;
      const after = before.match({
        Err: it => it,
        Ok: () => Wrong,
      });
      expect(after).to.equal(Expected);
    });

    it('.intoOption should be None', ({ expect }) => {
      const before = Err(Expected) as Result<string, string>;
      const after = before.intoOption();
      expect(after).to.equal(None);
    });

    it('.intoErrOption should be Some', ({ expect }) => {
      const before = Err(Expected) as Result<string, string>;
      const after = before.intoErrOption();
      expect(after.isSome ? after.some : expect.fail()).to.equal(Expected);
    });

    it('.toString should return a string', ({ expect }) => {
      expect(Err(Expected).toString()).toBeTypeOf('string');
    });
  });
});
