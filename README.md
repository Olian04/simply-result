[![Latest released version](https://img.shields.io/npm/v/simply-result)](https://www.npmjs.com/package/simply-result)
[![Minified and gzipped bundle size](https://img.shields.io/bundlephobia/minzip/simply-result)](https://bundlephobia.com/package/simply-result)
![Type support](https://img.shields.io/npm/types/simply-result)
[![Downloads from NPM](https://img.shields.io/npm/dm/simply-result?label=downloads%20npm)](https://www.npmjs.com/package/simply-result)
[![MIT licensed](https://img.shields.io/npm/l/simply-result)](./LICENSE)

# simply-result

Simply typesafe Result and Option monads in typescript and javascript. 1kb minified and gzipped. Branchless implementation, waisting no processing cycles on unnecessary operations.

```ts
import {
    Result, Ok,
    Some, None,
    match, map,
} from 'simply-result';

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
```

## Installation

### NPM

[`npm i simply-result`](https://www.npmjs.com/package/simply-result)

```ts
import {
    Result, Ok, Err,
    Option, Some, None,
    map, mapErr, match,
    Try, Get, transpose,
} from 'simply-result';
```

## Demo

[See `./demo`](./demo/)