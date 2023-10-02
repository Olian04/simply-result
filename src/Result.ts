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
  map<T>(fn: (ok: V) => T): Ok<T>;
  mapErr(fn: unknown): Ok<V>;
  toString(): string;
  toJSON(): unknown;
}

export interface Err<E> {
  isOk: false;
  isErr: true;
  err: E;
  match<T>(cases: {
    Err: (err: E) => T,
  }): T;
  map(fn: unknown): Err<E>;
  mapErr<F>(fn: (err: E) => F): Err<F>;
  toString(): string;
  toJSON(): unknown;
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
  toJSON: () => value,
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
  toJSON: () => error,
});
