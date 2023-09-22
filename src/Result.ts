import { chainFn, chainKey } from "./private";

export type Result<V, E = Error> = Ok<V> | Err<E>;

export interface Ok<V> {
  isOk: true;
  isErr: false;
  ok: V;
  toString(): string;
  [chainFn](fn: (val?: any) => any): any;
  [chainKey]: 'Ok',
}

export interface Err<E> {
  isOk: false;
  isErr: true;
  err: E;
  toString(): string;
  [chainFn](fn: (val?: any) => any): any;
  [chainKey]: 'Err',
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
  toString: () => `Ok(${value})`,
  [chainFn]: fn => fn(value),
  [chainKey]: 'Ok',
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
  toString: () => `Err(${error})`,
  [chainFn]: fn => fn(error),
  [chainKey]: 'Err',
});
