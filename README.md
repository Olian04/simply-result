[![Latest released version](https://img.shields.io/npm/v/simply-result)](https://www.npmjs.com/package/simply-result)
![Minified and gzipped bundle size](./assets/size.badge.svg)
![Type support](https://img.shields.io/npm/types/simply-result)
[![CI status](https://img.shields.io/github/actions/workflow/status/olian04/simply-result/ci.yml?event=push&label=tests)](https://github.com/Olian04/simply-result/actions/workflows/ci.yml)
[![Code coverage](https://img.shields.io/codecov/c/gh/olian04/simply-result?token=54HYINU8yj&label=test%20coverage)](https://codecov.io/gh/Olian04/simply-result)
[![Downloads from NPM](https://img.shields.io/npm/dm/simply-result?label=downloads%20npm)](https://www.npmjs.com/package/simply-result)
[![MIT licensed](https://img.shields.io/npm/l/simply-result)](./LICENSE)

# simply-result

Simply typesafe Result and Option monads in typescript and javascript. Only about 700b minified and gzipped. Branchless implementation, waisting no processing cycles on unnecessary operations. On average [~15% faster than try-catch](#performance).

See also the sister library [simply-result-util](https://github.com/Olian04/simply-result-util) for useful monadic helper functions such as `Try`, `transpose`, and `flatten`.

```ts
import { Result, Ok, Err, Some, None } from 'simply-result';

const doSomeWork = (): Result<number, Error> => Ok(3);

const fraction = doSomeWork()
  .elseThen(err => {
    console.error(err);
    return Err(err);
  })
  .intoOption()
  .andThen(it => it === 0 ? None : Some(it))
  .andThen(it => Some(1 / it))
  .match({
    Some: it => it.toPrecision(3),
    None: () => '0'
  });

console.log(fraction); // "0.333"
```

## Installation

### NPM

[`npm i simply-result`](https://www.npmjs.com/package/simply-result)

```ts
import {
    Result, Ok, Err,
    Option, Some, None,
} from 'simply-result';
```

## Demo

[See `./demo`](./demo/)

## Type Docs

### Result

```ts
type Result<V, E = Error> =
  | Ok<V>
  | Err<E>

interface Ok<V> {
  isOk: true
  isErr: false
  ok: V
  match<T>(cases: {
    Ok: (ok: V) => T,
  }): T
  intoOption(): Some<V>
  intoErrOption(): None
  andThen<T>(fn: (ok: V) => T): T
  elseThen(fn: unknown): Ok<V>
  toString(): string
}

interface Err<E> {
  isOk: false
  isErr: true
  err: E
  match<T>(cases: {
    Err: (err: E) => T,
  }): T
  intoOption(): None
  intoErrOption(): Some<E>
  andThen(fn: unknown): Err<E>
  elseThen<T>(fn: (err: E) => T): T
  toString(): string
}

function Ok<V>(value: V): Ok<V>

function Err<E>(error: E): Err<E>
```

### Option

```ts
type Option<V> =
  | Some<V>
  | None

interface Some<V> {
  isSome: true
  isNone: false
  some: V
  match<T>(cases: {
    Some: (some: V) => T,
  }): T
  intoResult(error: unknown): Ok<V>
  andThen<T>(fn: (some: V) => T): T
  elseThen(fn: unknown): Some<V>
  toString(): string
}

interface None {
  isSome: false
  isNone: true
  match<T>(cases: {
    None: () => T,
  }): T
  intoResult<E>(error: E): Err<E>
  andThen(fn: unknown): None
  elseThen<T>(fn: () => T): T
  toString(): string
}

function Some<V>(value: V): Some<V>

const None: None
```

## Performance

|           | Code                                                    | Result                                     |
|:---------:|:-------------------------------------------------------:|:------------------------------------------:|
| Result    | `Err(new Error()).elseThen(err => { String(err) })`     | `210,625 ops/sec ±0.26% (91 runs sampled)` |
| Try Catch | `try { throw new Error() } catch (err) { String(err) }` | `183,401 ops/sec ±0.57% (89 runs sampled)` |
| Baseline  | `String(new Error())`                                   | `211,627 ops/sec ±0.39% (89 runs sampled)` |

Tests were ran on a `32gb MacBook M1 Pro` running `macOS 14.0`. The test code can be found [here](./demo/perf.ts).
