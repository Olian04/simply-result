import * as Benchmark from 'benchmark';

import { Err } from '..';

const cycles = 5;

const err = new Error();

([
  ['warmup runtime', 1, () => err.message],
  ['baseline', cycles, () => err.message],
  ['Result', cycles, () => Err(err).elseThen(err => err.message)],
  ['try catch', cycles, () => { try { throw err } catch (err) { err.message } }],
] as [string, number, () => void][])
  .reduce((suite, [name, cyclesToRun, fn]) => {
    Array(cyclesToRun).fill(0)
      .forEach((_, i) =>
        suite.add(`(${i + 1}/${cyclesToRun}) ${name}`, fn)
      );
    return suite;
  }, (new Benchmark.Suite))
  .on('cycle', event => console.log(String(event.target)))
  .run({ 'async': true });
