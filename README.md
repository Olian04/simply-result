[![Latest released version](https://img.shields.io/npm/v/simply-result)](https://www.npmjs.com/package/simply-result)
[![Minified and gzipped bundle size](https://img.shields.io/bundlephobia/minzip/simply-result)](https://bundlephobia.com/package/simply-result)
![Type support](https://img.shields.io/npm/types/simply-result)
[![Downloads from NPM](https://img.shields.io/npm/dm/simply-result?label=downloads%20npm)](https://www.npmjs.com/package/simply-result)
[![MIT licensed](https://img.shields.io/npm/l/simply-result)](./LICENSE)

# simply-result

Simply typesafe Result and Option monads in typescript and javascript. Less than 1kb minified and gzipped. Branchless implementation that waists no processing cycles on unnecessary operations.

```ts
import {
    Result, Ok, Err,
    Some, None,
    map, mapErr,
} from 'simply-result';

const doSomeWork = (): Result<number, Error> => Ok(3);

const a = doSomeWork();
const e = mapErr(a, e => e.name);
const b = map(e, v => v === 0 ? None : Some(1 / v));
const d = map(b.unwrap(), v => String(v * 6));

console.log(d.unwrap()); // "2"
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