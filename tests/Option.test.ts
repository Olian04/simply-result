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

    it('.map should replace inner value of Some', ({ expect }) => {
      const before = Some(Wrong) as Option<string>;
      const after = before.map(() => Expected);
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

    it('.map should preserve None', ({ expect }) => {
      const before = None as Option<string>;
      const after = before.map(() => Wrong);
      expect(after).to.equal(None);
    });

    it('.filter should preserve None when predicate is false', ({ expect }) => {
      const before = None as Option<string>;
      const after = before.filter(() => false);
      expect(after).to.equal(None);
    });

    it('.filter should preserve None when predicate is true', ({ expect }) => {
      const before = None as Option<string>;
      const after = before.filter(() => true);
      expect(after).to.equal(None);
    });

    it('.match should extract inner value of None', ({ expect }) => {
      const before = None as Option<string>;
      const after = before.match({
        None: () => Expected,
        Some: () => Wrong,
      });
      expect(after).to.equal(Expected);
    });
  });
});
