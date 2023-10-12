import { describe } from 'vitest';

import { Get, None } from '../src/main';

const Expected = 'Expected';
const Key = 'Key';
const WeakKey = {};

describe('Get', it => {
  it('should return Some if key is in Map', ({ expect }) => {
    const map = new Map();
    map.set(Key, Expected);
    const res = Get(map, Key);
    expect(
      res.isSome
       ? res.some
       : expect.fail()
    ).to.equal(Expected);
  });

  it('should return None if key is missing in Map', ({ expect }) => {
    const map = new Map();
    const res = Get(map, Key);
    expect(res).to.equal(None);
  });

  it('should return Some if key is in WeakMap', ({ expect }) => {
    const map = new WeakMap();
    map.set(WeakKey, Expected);
    const res = Get(map, WeakKey);
    expect(
      res.isSome
       ? res.some
       : expect.fail()
    ).to.equal(Expected);
  });

  it('should return None if key is missing in WeakMap', ({ expect }) => {
    const map = new WeakMap();
    const res = Get(map, WeakKey);
    expect(res).to.equal(None);
  });
});
