import { Err, Ok } from "./Result";

export type Option<V> =
  | Some<V>
  | None;

export interface Some<V> {
  isSome: true;
  isNone: false;
  some: V;
  match<T>(cases: {
    Some: (some: V) => T,
  }): T;
  intoResult(error: unknown): Ok<V>;
  andThen<T>(fn: (some: V) => T): T;
  elseThen(fn: unknown): Some<V>;
  map<T>(fn: (some: V) => T): Some<T>;
  toString(): string;
}

export interface None {
  isSome: false;
  isNone: true;
  match<T>(cases: {
    None: () => T,
  }): T;
  intoResult<E>(error: E): Err<E>;
  andThen(fn: unknown): None;
  elseThen<T>(fn: () => T): T;
  map(fn: unknown): None;
  toString(): string;
}

export const Some = <V>(value: V): Some<V> => ({
  get some() {
    return value;
  },
  get isSome() {
    return true as const;
  },
  get isNone() {
    return false as const;
  },
  match: cases => cases.Some(value),
  intoResult: () => Ok(value),
  andThen: fn => fn(value),
  elseThen: () => Some(value),
  map: fn => Some(fn(value)),
  toString: () => `Some(${value})`,
});

export const None: None = {
  get isSome() {
    return false as const;
  },
  get isNone() {
    return true as const;
  },
  match: cases => cases.None(),
  intoResult: error => Err(error),
  andThen: () => None,
  elseThen: fn => fn(),
  map: () => None,
  toString: () => `None()`,
};
