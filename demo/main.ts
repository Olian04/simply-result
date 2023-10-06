import { Result, Ok, Some, None, Err } from '..';

const doSomeWork = (): Result<number, Error> => Ok(3);

const str = doSomeWork()
  .elseThen(err => {
    console.error(err);
    return Err(err);
  })
  .intoOption()
  .andThen(it => it === 0 ? None : Some(it))
  .andThen(it => Some(1 / it))
  .match({
    Some: it => Some(it.toPrecision(3)),
    None: () => Some('0')
  });

console.log(str.some); // '0.333'
console.log(String(str)); // 'Some(0.333)'
console.log(JSON.stringify(str)); // '{"some":"0.333","isSome":true,"isNone":false}'
