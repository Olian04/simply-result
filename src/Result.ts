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
  and<T>(fn: (ok: V) => T): T;
  else(fn: unknown): Ok<V>;
  unwrap(fn: unknown): V;
}

export interface Err<E> {
  readonly isOk: false;
  readonly isErr: true;
  readonly err: E;
  match<T>(cases: {
    Err: (err: E) => T,
  }): T;
  and(fn: unknown): Err<E>;
  else<T>(fn: (err: E) => T): T;
  unwrap<V>(fn: (err: E) => V): V;
}

export const Ok = <V>(value: V): Ok<V> => Object.freeze<Ok<V>>({
  ok: value,
  isOk: true as const,
  isErr: false as const,
  match: cases => cases.Ok(value),
  and: fn => fn(value),
  else: () => Ok(value),
  unwrap: () => value,
  //@ts-expect-error implemented for debug readability
  toString: () => `Ok(${value})`,
});

export const Err = <E>(error: E): Err<E> => Object.freeze<Err<E>>({
  err: error,
  isOk: false as const,
  isErr: true as const,
  match: cases => cases.Err(error),
  and: () => Err(error),
  else: fn => fn(error),
  unwrap: fn => fn(error),
  //@ts-expect-error implemented for debug readability
  toString: () => `Err(${error})`,
});
