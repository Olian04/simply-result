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
  map<T>(fn: (some: V) => T): Some<T>;
  chain<T>(fn: (ok: V) => Option<T>): Option<T>;
  unwrapOr(some: unknown): V;
  unwrapElse(fn: unknown): V;
}

export interface None {
  readonly isSome: false;
  readonly isNone: true;
  match<T>(cases: {
    None: () => T,
  }): T;
  map(fn: unknown): None;
  chain(fn: undefined): None;
  unwrapOr<V>(some: V): V;
  unwrapElse<V>(fn: () => V): V;
}

export const Some = <V>(value: V): Some<V> => Object.freeze<Some<V>>({
  some: value,
  isSome: true as const,
  isNone: false as const,
  match: cases => cases.Some(value),
  map: fn => Some(fn(value)),
  chain: fn => fn(value),
  unwrapOr: () => value,
  unwrapElse: () => value,
});

export const None: None = Object.freeze<None>({
  isSome: false as const,
  isNone: true as const,
  match: cases => cases.None(),
  map: () => None,
  chain: () => None,
  unwrapOr: some => some,
  unwrapElse: fn => fn(),
});
