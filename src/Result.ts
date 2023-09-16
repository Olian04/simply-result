import { None, Some } from "./Option";

export type Result<V, E> = Ok<V> | Err<E>;

export interface Ok<V> {
  isOk: true;
  isErr: false;
  ok: Some<V>;
  err: None;
  unwrap(): V;
  unwrapOr(defaultValue: unknown): V;
  toString(): string;
  _chain(ok: (val: any) => any, err: (err: any) => any): any;
}

export interface Err<E> {
  isOk: false;
  isErr: true;
  ok: None;
  err: Some<E>;
  unwrap(): never;
  unwrapOr<V>(defaultValue: V): V;
  toString(): string;
  _chain(ok: (val: any) => any, err: (err: any) => any): any;
}

export const Ok = <V>(value: V): Ok<V> => ({
  get ok() {
    return Some(value);
  },
  get err() {
    return None;
  },
  get isOk() {
    return true as const;
  },
  get isErr() {
    return false as const;
  },
  unwrap: () => value,
  unwrapOr: () => value,
  toString: () => `Ok(${value})`,
  _chain: (fn, _) => fn(value),
});

export const Err = <E>(error: E): Err<E> => ({
  get ok() {
    return None;
  },
  get err() {
    return Some(error);
  },
  get isOk() {
    return false as const;
  },
  get isErr() {
    return true as const;
  },
  unwrap: () => {
    throw error;
  },
  unwrapOr: (defaultValue) => defaultValue,
  toString: () => `Err(${error})`,
  _chain: (_, fn) => fn(error),
});
