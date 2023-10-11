import { describe } from 'vitest';

import { None, Some, Option } from '../src/main';

const Expected = 'Expected';
const Wrong = 'Wrong';

describe('Option', () => {
  describe('Some', it => {
    it('should expose correct property values', ({ expect }) => {
      const res = Some(Expected);
      expect(res.isSome).to.be.true;
      expect(res.isNone).to.be.false;
      expect(res.some).to.equal(Expected);
      expect(
        //@ts-expect-error
        res.none
      ).to.equal(undefined);
    });

    it('.andThen should replace Some', ({ expect }) => {
      const before = Some(Expected) as Option<string>;
      const after = before.andThen(() => Some(Wrong));
      expect(after.isSome ? after.some : expect.fail()).to.equal(Wrong);
    });

    it('.elseThen should preserve Some', ({ expect }) => {
      const before = Some(Expected) as Option<string>;
      const after = before.elseThen(() => Some(Wrong));
      expect(after.isSome ? after.some : expect.fail()).to.equal(Expected);
    });

    it('.match should extract inner value of Some', ({ expect }) => {
      const before = Some(Expected) as Option<string>;
      const after = before.match({
        Some: it => it,
        None: () => Wrong,
      });
      expect(after).to.equal(Expected);
    });

    it('.intoResult should be Ok', ({ expect }) => {
      const before = Some(Expected) as Option<string>;
      const after = before.intoResult(Wrong);
      expect(after.isOk ? after.ok : expect.fail()).to.equal(Expected);
    });

    it('.toString should return a string', ({ expect }) => {
      expect(Some(Expected).toString()).toBeTypeOf('string');
    });
  });

  describe('None', it => {
    it('should expose correct property values', ({ expect }) => {
      const res = None;
      expect(res.isSome).to.be.false;
      expect(res.isNone).to.be.true;
      expect(
        //@ts-expect-error
        res.Some
      ).to.equal(undefined);
    });

    it('.andThen should preserve None', ({ expect }) => {
      const before = None as Option<string>;
      const after = before.andThen(() => Expected);
      expect(after).to.equal(None);
    });

    it('.elseThen should replace None', ({ expect }) => {
      const before = None as Option<string>;
      const after = before.elseThen(() => Expected);
      expect(after).to.equal(Expected);
    });

    it('.match should extract inner value of None', ({ expect }) => {
      const before = None as Option<string>;
      const after = before.match({
        None: () => Expected,
        Some: () => Wrong,
      });
      expect(after).to.equal(Expected);
    });

    it('.intoOption should be None', ({ expect }) => {
      const before = None as Option<string>;
      const after = before.intoResult(Expected);
      expect(after.isErr ? after.err : expect.fail()).to.equal(Expected);
    });

    it('.toString should return a string', ({ expect }) => {
      expect(None.toString()).toBeTypeOf('string');
    });
  });
});
