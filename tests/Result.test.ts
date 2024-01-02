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
      expect(
        //@ts-expect-error
        res.err
      ).to.equal(undefined);
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

    it('.chain should replace Ok', ({ expect }) => {
      const before = Ok(Wrong) as Result<string, string>;
      const after = before.chain(() => Ok(Expected));
      expect(after.isOk ? after.ok : expect.fail()).to.equal(Expected);
    });

    it('.chainErr should preserve Ok', ({ expect }) => {
      const before = Ok(Expected) as Result<string, string>;
      const after = before.chainErr(() => Ok(Wrong));
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

    it('.match should extract inner value of Err', ({ expect }) => {
      const before = Err(Expected) as Result<string, string>;
      const after = before.match({
        Err: it => it,
        Ok: () => Wrong,
      });
      expect(after).to.equal(Expected);
    });
  });
});
