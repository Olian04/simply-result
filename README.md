[![Latest released version](https://img.shields.io/npm/v/simply-result)](https://www.npmjs.com/package/simply-result)
![Minified and gzipped bundle size](./assets/size.badge.svg)
![Type support](https://img.shields.io/npm/types/simply-result)
[![Downloads from NPM](https://img.shields.io/npm/dm/simply-result?label=downloads%20npm)](https://www.npmjs.com/package/simply-result)
[![MIT licensed](https://img.shields.io/npm/l/simply-result)](./LICENSE)

# simply-result

Simply typesafe Result and Option monads in typescript and javascript. 1kb minified and gzipped. Branchless implementation, waisting no processing cycles on unnecessary operations.

```ts
import { Result, Ok, Some, None } from 'simply-result';

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
    Try, TryAsync, Get, 
    transpose, flatten, 
    fromPromise,
} from 'simply-result';
```

## Demo

[TS Playground](https://www.typescriptlang.org/play?ts=5.2.2#code/JYWwDg9gTgLgBAbzgJQKYGcCuAbGAaOAeQGsCBlCEVAgOQgDtU4BfOAMykrgHJ1QxsATwC0UDDhjcA3AFgAUPIDGDdPAAmEClQDq0YnAC8cABQBKAFwpxuADz1MIAEaooBAKJROUAHyHfJYwBmU1kFOWV6VThVKEM4DS1UXShiM3k4DLgAOhAAQxhFAAtjBHTM8pJLADc-OBqDBrgABjgAfjg6RjhLROMq0zwy8oyPKEszWs7qIZZTGZzcsGNgeANfAEY4AHo4Fbm5coWlldqVrJgIAAUxRWA+BiDTEPl5YDYTGKy7xNNEGYj0BBsKgstgIABzYyfKq5bCYVAhbY7ABETSygQxyPkzCAA)

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

### Helpers

```ts
function Try<V, E = Error>(fn: () => V): Result<V, E>

function TryAsync<V, E = Error>(fn: () => Promise<V>): Promise<Result<V, E>>

function Get<V, K>(maplike: {
  get(key: K): V
  has(key: K): boolean
}, key: K): Option<V>

function transpose<V, E>(result: Result<Option<V>, E>): Option<Result<V, E>>

function flatten<V>(outerOption: Option<Option<V>>): Option<V>
function flatten<V, E>(outerResult: Result<Result<V, E>, E>): Result<V, E>

function fromPromise<T, E = Error>(promiselike: PromiseLike<T>): Promise<Result<T, E>>
```
