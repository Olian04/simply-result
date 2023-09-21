import { None, Ok, Result, Some, map, match } from '..';

const doSomeWork = (): Result<number, Error> => Ok(3);

const res = doSomeWork();

const numb = match(res, {
    Ok: v => v === 0
        ? None
        : Some(1 / v),
    Err: () => Some(0),
});

const str = map(numb, String);

if (str.isSome) {
    console.log(str.value); // 0.33...
}

