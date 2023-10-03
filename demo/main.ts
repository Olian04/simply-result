import { Result, Ok, Some, None } from '..';

const doSomeWork = (): Result<number, Error> => Ok(3);

const str = doSomeWork()
  .mapErr(err => {
    console.error(err);
  })
  .intoOption()
  .andThen(v => v === 0 ? None : Some(v))
  .map(it => 1 / it)
  .map(it => it.toPrecision(3))
  .elseThen(() => Some('0'));

console.log(str.some);
console.log(String(str));
console.log(JSON.stringify(str));
