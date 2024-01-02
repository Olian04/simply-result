import * as Benchmark from 'benchmark';

import { Err } from '..';


const addTest = (suite: Benchmark.Suite, name: string, fn: () => any, cyclesToRun: number = 5) => {
  for (let i = 0; i < cyclesToRun; i++) {
    suite.add(`(${i + 1}/${cyclesToRun}) ${name}`, fn)
  }
}

const suite = new Benchmark.Suite()
  .on('cycle', event => console.log(String(event.target)));

addTest(suite, 'warmup runtime', () => String(new Error()), 1);
addTest(suite, 'baseline', () => String(new Error()));
addTest(suite, 'Result', () => Err(new Error()).elseThen(err => String(err)));
addTest(suite, 'try catch', () => { try { throw new Error() } catch (err) { String(err) } });

suite.run({ 'async': true });

