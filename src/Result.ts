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
  intoErrOption(): None;
  andThen<T>(fn: (ok: V) => T): T;
  elseThen(fn: unknown): Ok<V>;
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
  intoErrOption(): Some<E>;
  andThen(fn: unknown): Err<E>;
  elseThen<T>(fn: (err: E) => T): T;
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
  intoErrOption: () => None,
  andThen: fn => fn(value),
  elseThen: () => Ok(value),
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
  intoErrOption: () => Some(error),
  andThen: () => Err(error),
  elseThen: fn => fn(error),
  toString: () => `Err(${error})`,
});
