import { Err, Ok } from "./Result";

export type Option<V> =
  | Some<V>
  | None;

export interface Some<V> {
  readonly isSome: true;
  readonly isNone: false;
  readonly some: V;
  match<T>(cases: {
    Some: (some: V) => T,
  }): T;
  intoResult(error: unknown): Ok<V>;
  map<T>(fn: (some: V) => T): Some<T>;
  filter(fn: (some: V) => boolean): Option<V>;
  andThen<T>(fn: (some: V) => T): T;
  elseThen(fn: unknown): Some<V>;
  unwrapOr(some: unknown): V;
  unwrapElse(fn: unknown): V;
  toString(): string;
}

export interface None {
  readonly isSome: false;
  readonly isNone: true;
  match<T>(cases: {
    None: () => T,
  }): T;
  intoResult<E>(error: E): Err<E>;
  map(fn: unknown): None;
  filter(fn: unknown): None;
  andThen(fn: unknown): None;
  elseThen<T>(fn: () => T): T;
  unwrapOr<V>(some: V): V;
  unwrapElse<V>(fn: () => V): V;
  toString(): string;
}

export const Some = <V>(value: V): Some<V> => {
  const self = {
    some: value,
    isSome: true as const,
    isNone: false as const,
    match: cases => cases.Some(value),
    intoResult: () => Ok(value),
    map: fn => Some(fn(value)),
    filter: fn => fn(value) ? self : None,
    andThen: fn => fn(value),
    elseThen: () => self,
    unwrapOr: () => value,
    unwrapElse: () => value,
    toString: () => `Some(${value})`,
  };
  return self;
};

export const None: None = {
  isSome: false as const,
  isNone: true as const,
  match: cases => cases.None(),
  intoResult: error => Err(error),
  map: () => None,
  filter: () => None,
  andThen: () => None,
  elseThen: fn => fn(),
  unwrapOr: some => some,
  unwrapElse: fn => fn(),
  toString: () => `None()`,
};
