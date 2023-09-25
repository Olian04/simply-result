import { chainFn, chainKey } from "./private";

export type Option<V = unknown> =
  | Some<V>
  | None;

export interface Some<V> {
  isSome: true;
  isNone: false;
  value: V;
  match<T>(cases: {
    Some: (value: V) => T,
  }): T;
  map<T>(fn: (value: V) => T): Some<T>;
  toString(): string;
  [chainFn](fn: (val?: any) => any): any;
  [chainKey]: 'Some',
}

export interface None {
  isSome: false;
  isNone: true;
  match<T>(cases: {
    None: () => T,
  }): T;
  map(fn: unknown): None;
  toString(): string;
  [chainFn](fn: (val?: any) => any): any;
  [chainKey]: 'None',
}

export const Some = <V>(value: V): Some<V> => ({
  get isSome() {
    return true as const;
  },
  get isNone() {
    return false as const;
  },
  get value() {
    return value;
  },
  match: cases => cases.Some(value),
  map: fn => Some(fn(value)),
  toString: () => `Some(${value})`,
  [chainFn]: fn => fn(value),
  [chainKey]: 'Some',
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
  [chainFn]: fn => fn(),
  [chainKey]: 'None',
};
