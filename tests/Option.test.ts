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
    });

    it('.map should replace inner value of Some', ({ expect }) => {
      const before = Some(Wrong) as Option<string>;
      const after = before.map(() => Expected);
      expect(after.isSome ? after.some : expect.fail()).to.equal(Expected);
    });

    it('.filter should replace None when predicate is false', ({ expect }) => {
      const before = Some(Expected) as Option<string>;
      const after = before.filter(() => false);
      expect(after).to.equal(None);
    });

    it('.filter should preserve Some when predicate is true', ({ expect }) => {
      const before = Some(Expected) as Option<string>;
      const after = before.filter(() => true);
      expect(after.isSome ? after.some : expect.fail()).to.equal(Expected);
    });

    it('.andThen should replace Some', ({ expect }) => {
      const before = Some(Wrong) as Option<string>;
      const after = before.andThen(() => Some(Expected));
      expect(after.isSome ? after.some : expect.fail()).to.equal(Expected);
    });

    it('.elseThen should preserve Some', ({ expect }) => {
      const before = Some(Expected) as Option<string>;
      const after = before.elseThen(() => Some(Wrong));
      expect(after.isSome ? after.some : expect.fail()).to.equal(Expected);
    });

    it('.unwrapOr should return inner value', ({ expect }) => {
      const before = Some(Expected) as Option<string>;
      const after = before.unwrapOr(Wrong);
      expect(after).to.equal(Expected);
    });

    it('.unwrapElse should return inner value', ({ expect }) => {
      const before = Some(Expected) as Option<string>;
      const after = before.unwrapElse(() => Wrong);
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
      expect(res.some).to.equal(undefined);
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

    it('.unwrapOr should return argument', ({ expect }) => {
      const before = None as Option<string>;
      const after = before.unwrapOr(Expected);
      expect(after).to.equal(Expected);
    });

    it('.unwrapElse should return fn return value', ({ expect }) => {
      const before = None as Option<string>;
      const after = before.unwrapElse(() => Expected);
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
