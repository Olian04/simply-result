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

    it('.and should replace Some', ({ expect }) => {
      const before = Some(Wrong) as Option<string>;
      const after = before.and(() => Some(Expected));
      expect(after.isSome ? after.some : expect.fail()).to.equal(Expected);
    });

    it('.else should preserve Some', ({ expect }) => {
      const before = Some(Expected) as Option<string>;
      const after = before.else(() => Some(Wrong));
      expect(after.isSome ? after.some : expect.fail()).to.equal(Expected);
    });

    it('.unwrap should return inner value', ({ expect }) => {
      const before = Some(Expected) as Option<string>;
      const after = before.unwrap(() => Wrong);
      expect(after).to.equal(Expected);
    });

    it('.match should extract inner value of Some', ({ expect }) => {
      const before = Some(Expected) as Option<string>;
      const after = before.match({
        Some: it => it,
        None: () => Wrong,
      });
      expect(after).to.equal(Expected);
    });

    it('.toString should return a string starting with Some', ({ expect }) => {
      expect(Some(Expected).toString()).toMatch(/^Some/);
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

    it('.and should preserve None', ({ expect }) => {
      const before = None as Option<string>;
      const after = before.and(() => Expected);
      expect(after).to.equal(None);
    });

    it('.else should replace None', ({ expect }) => {
      const before = None as Option<string>;
      const after = before.else(() => Expected);
      expect(after).to.equal(Expected);
    });

    it('.unwrap should return fn return value', ({ expect }) => {
      const before = None as Option<string>;
      const after = before.unwrap(() => Expected);
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

    it('.toString should return a string starting with None', ({ expect }) => {
      expect(None.toString()).toMatch(/^None/);
    });
  });
});
