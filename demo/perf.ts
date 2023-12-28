import * as Benchmark from 'benchmark';

import { Err } from '..';

const cycles = 5;

([
  ['warmup runtime', 1, () => String(new Error())],
  ['baseline', cycles, () => String(new Error())],
  ['Result', cycles, () => Err(new Error()).else(err => String(err))],
  ['try catch', cycles, () => { try { throw new Error() } catch (err) { String(err) } }],
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
