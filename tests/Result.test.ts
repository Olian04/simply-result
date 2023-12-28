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

    it('.and should replace Ok', ({ expect }) => {
      const before = Ok(Wrong) as Result<string, string>;
      const after = before.and(() => Ok(Expected));
      expect(after.isOk ? after.ok : expect.fail()).to.equal(Expected);
    });

    it('.else should preserve Ok', ({ expect }) => {
      const before = Ok(Expected) as Result<string, string>;
      const after = before.else(() => Ok(Wrong));
      expect(after.isOk ? after.ok : expect.fail()).to.equal(Expected);
    });

    it('.unwrap should return inner value', ({ expect }) => {
      const before = Ok(Expected) as Result<string, string>;
      const after = before.unwrap(() => Wrong);
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

    it('.toString should return a string starting with Ok', ({ expect }) => {
      expect(Ok(Expected).toString()).toMatch(/^Ok/);
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

    it('.and should preserve Err', ({ expect }) => {
      const before = Err(Expected) as Result<string, string>;
      const after = before.and(() => Err(Wrong));
      expect(after.isErr ? after.err : expect.fail()).to.equal(Expected);
    });

    it('.else should replace Err', ({ expect }) => {
      const before = Err(Wrong) as Result<string, string>;
      const after = before.else(() => Err(Expected));
      expect(after.isErr ? after.err : expect.fail()).to.equal(Expected);
    });

    it('.unwrap should return fn return value', ({ expect }) => {
      const before = Err(Expected) as Result<string, string>;
      const after = before.unwrap(() => Expected);
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

    it('.toString should return a string starting with Err', ({ expect }) => {
      expect(Err(Expected).toString()).toMatch(/^Err/);
    });
  });
});
