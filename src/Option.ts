export type Option<V> =
  | Some<V>
  | None;

export interface Some<V> {
  isSome: true;
  isNone: false;
  some: V;
  match<T>(cases: {
    Some: (some: V) => T,
  }): T;
  map<T>(fn: (some: V) => T): Some<T>;
  toString(): string;
  toJSON(): unknown;
}

export interface None {
  isSome: false;
  isNone: true;
  match<T>(cases: {
    None: () => T,
  }): T;
  map(fn: unknown): None;
  toString(): string;
  toJSON(): unknown;
}

export const Some = <V>(value: V): Some<V> => ({
  get some() {
    return value;
  },
  get isSome() {
    return true as const;
  },
  get isNone() {
    return false as const;
  },
  match: cases => cases.Some(value),
  map: fn => Some(fn(value)),
  toString: () => `Some(${value})`,
  toJSON: () => value,
});

export const None: None = {
  get isSome() {
    return false as const;
  },
  get isNone() {
    return true as const;
  },
  match: cases => cases.None(),
  map: () => None,
  toString: () => `None()`,
  toJSON: () => undefined,
};
