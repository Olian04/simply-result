import * as Benchmark from 'benchmark';

import { Err } from '..';

(new Benchmark.Suite)
  .add('baseline', () => {
    String(new Error());
  })
  .add('try catch', () => {
    try {
      throw new Error();
    } catch (err) {
      String(err);
    }
  })
  .add('Result', () => {
    Err(new Error())
      .elseThen(err => {
        String(err);
      });
  })
  .on('cycle', event => console.log(String(event.target)))
  .run({ 'async': false });
