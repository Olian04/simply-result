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
  andThen<T>(fn: (some: V) => T): T;
  elseThen(fn: unknown): Some<V>;
  toString(): string;
}

export interface None {
  readonly isSome: false;
  readonly isNone: true;
  match<T>(cases: {
    None: () => T,
  }): T;
  intoResult<E>(error: E): Err<E>;
  andThen(fn: unknown): None;
  elseThen<T>(fn: () => T): T;
  toString(): string;
}

export const Some = <V>(value: V): Some<V> => Object.freeze<Some<V>>({
  some: value,
  isSome: true as const,
  isNone: false as const,
  match: cases => cases.Some(value),
  intoResult: () => Ok(value),
  andThen: fn => fn(value),
  elseThen: () => Some(value),
  toString: () => `Some(${value})`,
});

export const None: None = Object.freeze<None>({
  isSome: false as const,
  isNone: true as const,
  match: cases => cases.None(),
  intoResult: error => Err(error),
  andThen: () => None,
  elseThen: fn => fn(),
  toString: () => `None()`,
});
