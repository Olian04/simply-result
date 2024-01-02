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
  map<T>(fn: (ok: V) => T): Ok<T>;
  mapErr(fn: unknown): Ok<V>;
  chain<T, E>(fn: (ok: V) => Result<T, E>): Result<T, E>;
  chainErr(fn: undefined): Ok<V>;
  unwrapOr(ok: unknown): V;
  unwrapElse(fn: unknown): V;
}

export interface Err<E> {
  readonly isOk: false;
  readonly isErr: true;
  readonly err: E;
  match<T>(cases: {
    Err: (err: E) => T,
  }): T;
  map(fn: unknown): Err<E>;
  mapErr<T>(fn: (err: E) => T): Err<T>;
  chain(fn: unknown): Err<E>;
  chainErr<T, F>(fn: (err: E) => Result<T, F>): Result<T, F>;
  unwrapOr<V>(ok: V): V;
  unwrapElse<V>(fn: (err: E) => V): V;
}

export const Ok = <V>(value: V): Ok<V> => Object.freeze<Ok<V>>({
  ok: value,
  isOk: true as const,
  isErr: false as const,
  match: cases => cases.Ok(value),
  map: fn => Ok(fn(value)),
  mapErr: () => Ok(value),
  chain: fn => fn(value),
  chainErr: () => Ok(value),
  unwrapOr: () => value,
  unwrapElse: () => value,
});

export const Err = <E>(error: E): Err<E> => Object.freeze<Err<E>>({
  err: error,
  isOk: false as const,
  isErr: true as const,
  match: cases => cases.Err(error),
  map: () => Err(error),
  mapErr: fn => Err(fn(error)),
  chain: () => Err(error),
  chainErr: fn => fn(error),
  unwrapOr: ok => ok,
  unwrapElse: fn => fn(error),
});
