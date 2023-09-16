import { None, Some } from "./Option";
import { chainFn, chainKey } from "./private";

export type Result<V, E> = Ok<V> | Err<E>;

export interface Ok<V> {
  isOk: true;
  isErr: false;
  ok: Some<V>;
  err: None;
  unwrap(): V;
  unwrapOr(defaultValue: unknown): V;
  toString(): string;
  [chainFn](fn: (val?: any) => any): any;
  [chainKey]: 'Ok',
}

export interface Err<E> {
  isOk: false;
  isErr: true;
  ok: None;
  err: Some<E>;
  unwrap(): never;
  unwrapOr<V>(defaultValue: V): V;
  toString(): string;
  [chainFn](fn: (val?: any) => any): any;
  [chainKey]: 'Err',
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
  [chainFn]: fn => fn(value),
  [chainKey]: 'Ok',
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
  [chainFn]: fn => fn(error),
  [chainKey]: 'Err',
});
