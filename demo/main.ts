import { None, Ok, Result, Some, map, match } from '..';

const doSomeWork = (): Result<number, Error> => Ok(3);

const res = doSomeWork();

const num = match(res, {
    Ok: v => v === 0
        ? None
        : Some(1 / v),
    Err: () => None,
});

const str = map(num, it => it.toPrecision(3));

if (str.isSome) {
    console.log(str.value); // "0.333"
}

