import { None, Some } from "./Option";

export type Result<V, E = Error> =
  | Ok<V>
  | Err<E>;

export interface Ok<V> {
  readonly isOk: true;
  readonly isErr: false;
  readonly ok: V;
  match<T>(cases: {
    Ok: (ok: V) => T,
  }): T;
  intoOption(): Some<V>;
  intoErrOption(): None;
  map<T>(fn: (ok: V) => T): Ok<T>;
  mapErr(fn: unknown): Ok<V>;
  andThen<T>(fn: (ok: V) => T): T;
  elseThen(fn: unknown): Ok<V>;
  unwrapOr(ok: unknown): V;
  unwrapElse(fn: unknown): V;
  toString(): string;
}

export interface Err<E> {
  readonly isOk: false;
  readonly isErr: true;
  readonly err: E;
  match<T>(cases: {
    Err: (err: E) => T,
  }): T;
  intoOption(): None;
  intoErrOption(): Some<E>;
  map(fn: unknown): Err<E>;
  mapErr<F>(fn: (err: E) => F): Err<F>;
  andThen(fn: unknown): Err<E>;
  elseThen<T>(fn: (err: E) => T): T;
  unwrapOr<V>(ok: V): V;
  unwrapElse<V>(fn: (err: E) => V): V;
  toString(): string;
}

export const Ok = <V>(value: V): Ok<V> => {
  const self = {
    ok: value,
    isOk: true as const,
    isErr: false as const,
    match: cases => cases.Ok(value),
    intoOption: () => Some(value),
    intoErrOption: () => None,
    map: fn => Ok(fn(value)),
    mapErr: () => self,
    andThen: fn => fn(value),
    elseThen: () => self,
    unwrapOr: () => value,
    unwrapElse: () => value,
    toString: () => `Ok(${value})`,
  };
  return self;
};

export const Err = <E>(error: E): Err<E> => {
  const self = {
    err: error,
    isOk: false as const,
    isErr: true as const,
    match: cases => cases.Err(error),
    intoOption: () => None,
    intoErrOption: () => Some(error),
    map: () => self,
    mapErr: fn => Err(fn(error)),
    andThen: () => self,
    elseThen: fn => fn(error),
    unwrapOr: ok => ok,
    unwrapElse: fn => fn(error),
    toString: () => `Err(${error})`,
  };
  return self;
};
