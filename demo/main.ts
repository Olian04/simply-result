import { Result, Ok, Err } from '..';

const doSomeWork = (): Result<number, Error> => Ok(3);

const fraction = doSomeWork()
  .chain(it => {
    if (it === 0) {
      return Err(new Error('Unable to devide by zero'));
    }
    return Ok(it);
  })
  .mapErr(console.error)
  .map(it => (1 / it).toPrecision(3))
  .unwrapOr('0');

console.log(fraction); // '0.333'
