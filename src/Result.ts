import { None, Some, SomeImpl } from "./Option";

export type Result<V, E = Error> =
  | Ok<V>
  | Err<E>;

export interface Ok<V> {
  readonly isOk: true;
  readonly isErr: false;
  readonly ok: V;
  readonly err: never;
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
  readonly ok: never;
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

export class OkImpl<V> implements Ok<V> {
  isOk = true as const;
  isErr = false as const;
  err: never;
  constructor(
    public ok: V,
  ) {}

  intoOption(): Some<V> {
    return new SomeImpl(this.ok);
  }
  intoErrOption(): None {
    return None;
  }
  match<T>(cases: { Ok: (ok: V) => T; }): T {
    return cases.Ok(this.ok);
  }
  map<T>(fn: (ok: V) => T): Ok<T> {
    return new OkImpl(fn(this.ok));
  }
  mapErr(fn: unknown): Ok<V> {
    return this;
  }
  andThen<T>(fn: (ok: V) => T): T {
    return fn(this.ok);
  }
  elseThen(fn: unknown): Ok<V> {
    return this;
  }
  unwrapOr(ok: unknown): V {
    return this.ok;
  }
  unwrapElse(fn: unknown): V {
    return this.ok;
  }
  toString(): string {
    return `Ok(${this.ok})`;
  }
}

export class ErrImpl<E> implements Err<E> {
  isOk = false as const;
  isErr = true as const;
  ok: never;
  constructor(
    public err: E,
  ) {}

  intoOption(): None {
    return None;
  }
  intoErrOption(): Some<E> {
    return new SomeImpl(this.err);
  }
  match<T>(cases: { Err: (err: E) => T; }): T {
    return cases.Err(this.err);
  }
  map(fn: unknown): Err<E> {
    return this;
  }
  mapErr<F>(fn: (err: E) => F): Err<F> {
    return new ErrImpl(fn(this.err));
  }
  andThen(fn: unknown): Err<E> {
    return this;
  }
  elseThen<T>(fn: (err: E) => T): T {
    return fn(this.err);
  }
  unwrapOr<V>(ok: V): V {
    return ok;
  }
  unwrapElse<V>(fn: (err: E) => V): V {
    return fn(this.err);
  }
  toString(): string {
    return `Err(${this.err})`;
  }
}

export const Ok = <V>(value: V): Ok<V> => new OkImpl(value);
export const Err = <E>(error: E): Err<E> => new ErrImpl(error);
