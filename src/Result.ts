import { None, Some } from "./Option";

export type Result<V, E = Error> =
  | Ok<V>
  | Err<E>;

export interface Ok<V> {
  isOk: true;
  isErr: false;
  ok: V;
  match<T>(cases: {
    Ok: (ok: V) => T,
  }): T;
  intoOption(): Some<V>;
  andThen<T>(fn: (ok: V) => T): T;
  elseThen(fn: unknown): Ok<V>;
  map<T>(fn: (ok: V) => T): Ok<T>;
  mapErr(fn: unknown): Ok<V>;
  toString(): string;
}

export interface Err<E> {
  isOk: false;
  isErr: true;
  err: E;
  match<T>(cases: {
    Err: (err: E) => T,
  }): T;
  intoOption(): None;
  andThen(fn: unknown): Err<E>;
  elseThen<T>(fn: (err: E) => T): T;
  map(fn: unknown): Err<E>;
  mapErr<F>(fn: (err: E) => F): Err<F>;
  toString(): string;
}

export const Ok = <V>(value: V): Ok<V> => ({
  get ok() {
    return value;
  },
  get isOk() {
    return true as const;
  },
  get isErr() {
    return false as const;
  },
  match: cases => cases.Ok(value),
  intoOption: () => Some(value),
  andThen: fn => fn(value),
  elseThen: () => Ok(value),
  map: fn => Ok(fn(value)),
  mapErr: () => Ok(value),
  toString: () => `Ok(${value})`,
});

export const Err = <E>(error: E): Err<E> => ({
  get err() {
    return error;
  },
  get isOk() {
    return false as const;
  },
  get isErr() {
    return true as const;
  },
  match: cases => cases.Err(error),
  intoOption: () => None,
  andThen: () => Err(error),
  elseThen: fn => fn(error),
  map: () => Err(error),
  mapErr: fn => Err(fn(error)),
  toString: () => `Err(${error})`,
});
