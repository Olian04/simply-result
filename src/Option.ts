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
  and<T>(fn: (some: V) => T): T;
  else(fn: unknown): Some<V>;
  unwrap(fn: unknown): V;
}

export interface None {
  readonly isSome: false;
  readonly isNone: true;
  match<T>(cases: {
    None: () => T,
  }): T;
  and(fn: unknown): None;
  else<T>(fn: () => T): T;
  unwrap<V>(fn: () => V): V;
}

export const Some = <V>(value: V): Some<V> => Object.freeze<Some<V>>({
  some: value,
  isSome: true as const,
  isNone: false as const,
  match: cases => cases.Some(value),
  and: fn => fn(value),
  else: () => Some(value),
  unwrap: () => value,
  //@ts-expect-error implemented for debug readability
  toString: () => `Some(${value})`,
});

export const None: None = Object.freeze<None>({
  isSome: false as const,
  isNone: true as const,
  match: cases => cases.None(),
  and: () => None,
  else: fn => fn(),
  unwrap: fn => fn(),
  //@ts-expect-error implemented for debug readability
  toString: () => `None()`,
});
