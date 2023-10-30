import { Result, Ok } from '..';

const doSomeWork = (): Result<number, Error> => Ok(3);

const fraction = doSomeWork()
  .mapErr(err => console.error(err))
  .intoOption()
  .filter(it => it !== 0)
  .map(it => (1 / it).toPrecision(3))
  .unwrapOr('0');

console.log(fraction); // '0.333'
