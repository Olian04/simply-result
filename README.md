[![Latest released version](https://img.shields.io/npm/v/simply-result)](https://www.npmjs.com/package/simply-result)
![Minified and gzipped bundle size](./assets/size.badge.svg)
![Type support](https://img.shields.io/npm/types/simply-result)
[![CI status](https://img.shields.io/github/actions/workflow/status/olian04/simply-result/ci.yml?event=push&label=tests)](https://github.com/Olian04/simply-result/actions/workflows/ci.yml)
[![Code coverage](https://img.shields.io/codecov/c/gh/olian04/simply-result?token=54HYINU8yj&label=test%20coverage)](https://codecov.io/gh/Olian04/simply-result)
[![Downloads from NPM](https://img.shields.io/npm/dm/simply-result?label=downloads%20npm)](https://www.npmjs.com/package/simply-result)
[![MIT licensed](https://img.shields.io/npm/l/simply-result)](./LICENSE)

# simply-result

Result and Option monads for typescript. Optimized for:

* __Execution speed:__ [80x faster than try-catch].
* __Memory usage:__
* __Type safety:__
* __Disk footprint:__ Entire library is ~700b minified and gzipped.

Simply typesafe Result and Option monads in typescript and javascript. Only ~700b minified and gzipped. Branchless implementation, waisting no processing cycles on unnecessary operations. Low memory foot print and on average [~13% faster than try-catch](#performance).

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

|           | Code                                                    | Result                                     |
|:---------:|:-------------------------------------------------------:|:------------------------------------------:|
| Result    | `Err(new Error()).elseThen(err => { String(err) })`     | `212,515 ops/sec ±0.25% (91 runs sampled)` |
| Try Catch | `try { throw new Error() } catch (err) { String(err) }` | `188,485 ops/sec ±0.44% (92 runs sampled)` |
| Baseline  | `String(new Error())`                                   | `213,844 ops/sec ±0.39% (91 runs sampled)` |

Tests were ran on a `32gb MacBook M1 Pro` running `macOS 14.0`. The test code can be found [here](./demo/perf.ts).

```
(1/5) baseline x 1,016,410,915 ops/sec ±0.31% (97 runs sampled)
(2/5) baseline x 1,018,794,747 ops/sec ±0.11% (97 runs sampled)
(3/5) baseline x 1,018,375,173 ops/sec ±0.19% (100 runs sampled)
(4/5) baseline x 1,017,797,993 ops/sec ±0.16% (98 runs sampled)
(5/5) baseline x 1,019,196,091 ops/sec ±0.08% (95 runs sampled)
(1/5) Result x 127,682,145 ops/sec ±0.25% (98 runs sampled)
(2/5) Result x 86,331,024 ops/sec ±4.48% (68 runs sampled)
(3/5) Result x 78,626,610 ops/sec ±1.73% (92 runs sampled)
(4/5) Result x 78,381,785 ops/sec ±1.44% (88 runs sampled)
(5/5) Result x 78,719,327 ops/sec ±1.53% (92 runs sampled)
(1/5) try catch x 1,030,889 ops/sec ±0.20% (55 runs sampled)
(2/5) try catch x 1,055,859 ops/sec ±0.49% (62 runs sampled)
(3/5) try catch x 1,044,346 ops/sec ±0.26% (66 runs sampled)
(4/5) try catch x 1,057,609 ops/sec ±0.44% (66 runs sampled)
(5/5) try catch x 1,042,217 ops/sec ±0.46% (63 runs sampled)
```
