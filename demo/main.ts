import { Result, Ok, Err } from '..';

const doSomeWork = (): Result<number, Error> => Ok(3);

const fraction = doSomeWork()
  .else(err => {
    console.error(err);
    return Err(err);
  })
  .and(it => {
    const strFrac = (1 / it).toPrecision(3);
    return Ok(strFrac);
  })
  .unwrap(() => '0');

console.log(fraction); // '0.333'
