export type Result<V, E = Error> =
  | Ok<V>
  | Err<E>;

export interface Ok<V> {
  isOk: true;
  isErr: false;
  ok: V;
  match<T>(cases: {
    Ok: (value: V) => T,
  }): T;
  map<T>(fn: (value: V) => T): Ok<T>;
  mapErr(fn: unknown): Ok<V>;
  toString(): string;
}

export interface Err<E> {
  isOk: false;
  isErr: true;
  err: E;
  match<T>(cases: {
    Err: (error: E) => T,
  }): T;
  map(fn: unknown): Err<E>;
  mapErr<F>(fn: (error: E) => F): Err<F>;
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
  map: () => Err(error),
  mapErr: fn => Err(fn(error)),
  toString: () => `Err(${error})`,
});
