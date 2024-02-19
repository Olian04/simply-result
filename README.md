[![Latest released version](https://img.shields.io/npm/v/simply-result)](https://www.npmjs.com/package/simply-result)
![Minified and gzipped bundle size](./assets/size.badge.svg)
![Type support](https://img.shields.io/npm/types/simply-result)
[![CI status](https://img.shields.io/github/actions/workflow/status/olian04/simply-result/ci.yml?event=push&label=tests)](https://github.com/Olian04/simply-result/actions/workflows/ci.yml)
[![Code coverage](https://img.shields.io/codecov/c/gh/olian04/simply-result?token=54HYINU8yj&label=test%20coverage)](https://codecov.io/gh/Olian04/simply-result)
[![Downloads from NPM](https://img.shields.io/npm/dm/simply-result?label=downloads%20npm)](https://www.npmjs.com/package/simply-result)
[![MIT licensed](https://img.shields.io/npm/l/simply-result)](./LICENSE)

# simply-result

Simply result is a Result and Option monad library for typescript and javascript. Its more than [100 times faster than try-catch](#performance) with a total package size of ~700b minified and gzipped.

See also the sister library [simply-result-util](https://github.com/Olian04/simply-result-util) for useful monadic helper functions such as `Try`, `transpose`, and `flatten`.

```ts
import { Result, Ok } from 'simply-result';

const doSomeWork = (): Result<number, Error> => Ok(3);

const fraction = doSomeWork()
  .mapErr(err => console.error(err))
  .intoOption()
  .filter(it => it !== 0)
  .map(it => (1 / it).toPrecision(3))
  .unwrapOr('0');

console.log(fraction); // '0.333'
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
    Ok: (ok: V) => T
  }): T
  intoOption(): Some<V>
  intoErrOption(): None
  map<T>(fn: (ok: V) => T): Ok<T>
  mapErr(fn: unknown): Ok<V>
  andThen<T>(fn: (ok: V) => T): T
  elseThen(fn: unknown): Ok<V>
  unwrapOr(ok: unknown): V
  unwrapElse(fn: unknown): V
  toString(): string
}

interface Err<E> {
  isOk: false
  isErr: true
  err: E
  match<T>(cases: {
    Err: (err: E) => T
  }): T
  intoOption(): None
  intoErrOption(): Some<E>
  map(fn: unknown): Err<E>
  mapErr<F>(fn: (err: E) => F): Err<F>
  andThen(fn: unknown): Err<E>
  elseThen<T>(fn: (err: E) => T): T
  unwrapOr<T>(ok: T): T
  unwrapElse<T>(fn: () => T): T
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
    Some: (some: V) => T
  }): T
  intoResult(error: unknown): Ok<V>
  map<T>(fn: (some: V) => T): Some<T>
  filter(fn: (some: V) => boolean): Option<V>
  andThen<T>(fn: (some: V) => T): T
  elseThen(fn: unknown): Some<V>
  unwrapOr(some: unknown): V
  unwrapElse(fn: unknown): V
  toString(): string
}

interface None {
  isSome: false
  isNone: true
  match<T>(cases: {
    None: () => T
  }): T
  intoResult<E>(error: E): Err<E>
  map(fn: unknown): None
  filter(fn: unknown): None
  andThen(fn: unknown): None
  elseThen<T>(fn: () => T): T
  unwrapOr<T>(some: T): T
  unwrapElse<T>(fn: () => T): T
  toString(): string
}

function Some<V>(value: V): Some<V>

const None: None
```

## Performance

|           | Code                                                    | Result                                            |
|:---------:|:-------------------------------------------------------:|:-------------------------------------------------:|
| Result    | `Err(new Error()).elseThen(err => { err.message })`     | `123,901,767 ops/sec ±0.15% (100 runs sampled)`   |
| Try Catch | `try { throw new Error() } catch (err) { err.message }` | `1,125,735 ops/sec ±0.29% (67  runs sampled)`     |
| Baseline  | `new Error().message`                                   | `1,027,606,577 ops/sec ±0.10% (101 runs sampled)` |

All performance tests use the same `Error` object which is created before testing as to minimize the impact of creating an error object on the measurements.
Tests were ran on a `32gb MacBook M1 Pro` running `macOS 14.3`. The test code can be found [here](./demo/perf.ts).

```log
(1/5) baseline  x 1,026,512,662 ops/sec ±0.13% (102 runs sampled)
(2/5) baseline  x 1,025,374,916 ops/sec ±0.46% (94  runs sampled)
(3/5) baseline  x 1,027,606,577 ops/sec ±0.10% (101 runs sampled)
(4/5) baseline  x 1,027,408,614 ops/sec ±0.11% (100 runs sampled)
(5/5) baseline  x 1,027,220,720 ops/sec ±0.15% (101 runs sampled)
(1/5) Result    x   123,762,745 ops/sec ±0.21% (101 runs sampled)
(2/5) Result    x   123,725,903 ops/sec ±0.20% (100 runs sampled)
(3/5) Result    x   123,690,424 ops/sec ±0.21% (99  runs sampled)
(4/5) Result    x   123,901,767 ops/sec ±0.15% (100 runs sampled)
(5/5) Result    x   123,781,206 ops/sec ±0.25% (100 runs sampled)
(1/5) try catch x     1,108,408 ops/sec ±0.34% (59  runs sampled)
(2/5) try catch x     1,122,301 ops/sec ±0.37% (66  runs sampled)
(3/5) try catch x     1,124,218 ops/sec ±0.37% (67  runs sampled)
(4/5) try catch x     1,125,735 ops/sec ±0.29% (67  runs sampled)
(5/5) try catch x     1,116,800 ops/sec ±0.39% (67  runs sampled)
```
