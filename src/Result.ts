import { chainFn, chainKey } from "./private";

export type Result<V, E = Error> = Ok<V> | Err<E>;

export interface Ok<V> {
  isOk: true;
  isErr: false;
  ok: V;
  unwrap(): V;
  unwrapErr(): never;
  unwrapErrOr<E>(defaultError: E): E;
  unwrapOr(defaultValue: unknown): V;
  toString(): string;
  [chainFn](fn: (val?: any) => any): any;
  [chainKey]: 'Ok',
}

export interface Err<E> {
  isOk: false;
  isErr: true;
  err: E;
  unwrap(): never;
  unwrapErr(): E;
  unwrapErrOr(defaultError: unknown): E;
  unwrapOr<V>(defaultValue: V): V;
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
  unwrap: () => value,
  unwrapErr: () => {
    throw new Error('Attempting to unwrapErr on Ok');
  },
  unwrapOr: () => value,
  unwrapErrOr: defaultError => defaultError,
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
  unwrap: () => {
    throw new Error('Attempting to unwrap on Err', {
      cause: error,
    });
  },
  unwrapErr: () => error,
  unwrapOr: defaultValue => defaultValue,
  unwrapErrOr: () => error,
  toString: () => `Err(${error})`,
  [chainFn]: fn => fn(error),
  [chainKey]: 'Err',
});
