import { Err, ErrImpl, Ok, OkImpl } from "./Result";

export type Option<V> =
  | Some<V>
  | None;

export interface Some<V> {
  readonly isSome: true;
  readonly isNone: false;
  readonly some: V;
  match<T>(cases: {
    Some: (some: V) => T,
  }): T;
  intoResult(error: unknown): Ok<V>;
  map<T>(fn: (some: V) => T): Some<T>;
  filter(fn: (some: V) => boolean): Option<V>;
  andThen<T>(fn: (some: V) => T): T;
  elseThen(fn: unknown): Some<V>;
  unwrapOr(some: unknown): V;
  unwrapElse(fn: unknown): V;
  toString(): string;
}

export interface None {
  readonly isSome: false;
  readonly isNone: true;
  match<T>(cases: {
    None: () => T,
  }): T;
  intoResult<E>(error: E): Err<E>;
  map(fn: unknown): None;
  filter(fn: unknown): None;
  andThen(fn: unknown): None;
  elseThen<T>(fn: () => T): T;
  unwrapOr<V>(some: V): V;
  unwrapElse<V>(fn: () => V): V;
  toString(): string;
}

export class SomeImpl<V> implements Some<V> {
  isSome = true as const;
  isNone = false as const;
  constructor(
    public some: V,
  ) {}

  intoResult(error: unknown): Ok<V> {
    return new OkImpl(this.some);
  }
  filter(fn: (some: V) => boolean): Option<V> {
    if (fn(this.some)) {
      return this;
    }
    return None;
  }
  match<T>(cases: { Some: (some: V) => T; }): T {
    return cases.Some(this.some);
  }
  map<T>(fn: (some: V) => T): Some<T> {
    return new SomeImpl(fn(this.some));
  }
  andThen<T>(fn: (some: V) => T): T {
    return fn(this.some);
  }
  elseThen(fn: unknown): Some<V> {
    return this;
  }
  unwrapOr(some: unknown): V {
    return this.some;
  }
  unwrapElse(fn: unknown): V {
    return this.some;
  }
  toString(): string {
    return `Some(${this.some})`;
  }
}

export const Some = <V>(value: V): Some<V> => new SomeImpl(value);
export const None: None = {
  isSome: false as const,
  isNone: true as const,
  match: cases => cases.None(),
  intoResult: err => new ErrImpl(err),
  filter: () => None,
  map: () => None,
  andThen: () => None,
  elseThen: fn => fn(),
  unwrapOr: some => some,
  unwrapElse: fn => fn(),
  toString: () => `None()`,
};
