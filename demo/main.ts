import { Result, Ok, Some, None } from '..';

const doSomeWork = (): Result<number, Error> => Ok(3);

const str = doSomeWork()
  .match({
    Ok: v => v === 0 ? None : Some(v),
    Err: () => None,
  })
  .map(it => 1 / it)
  .map(it => it.toPrecision(3));

if (str.isSome) {
  console.log(str.value); // "0.333"
}
