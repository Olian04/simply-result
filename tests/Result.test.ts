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

    it('.andThen should replace Ok', ({ expect }) => {
      const before = Ok(Expected) as Result<string, string>;
      const after = before.andThen(() => Ok(Wrong));
      expect(after.isOk ? after.ok : expect.fail()).to.equal(Wrong);
    });

    it('.elseThen should preserve Ok', ({ expect }) => {
      const before = Ok(Expected) as Result<string, string>;
      const after = before.elseThen(() => Ok(Wrong));
      expect(after.isOk ? after.ok : expect.fail()).to.equal(Expected);
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

    it('.andThen should preserve Err', ({ expect }) => {
      const before = Err(Expected) as Result<string, string>;
      const after = before.andThen(() => Err(Wrong));
      expect(after.isErr ? after.err : expect.fail()).to.equal(Expected);
    });

    it('.elseThen should replace Err', ({ expect }) => {
      const before = Err(Expected) as Result<string, string>;
      const after = before.elseThen(() => Err(Wrong));
      expect(after.isErr ? after.err : expect.fail()).to.equal(Wrong);
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
  });
});
