import { None, Option, Some } from './Option';
import { Err, Ok, Result } from './Result';
import { chainFn, chainKey } from './private';

export function map<V, T>(option: Option<V>, fn: (value: V) => T): Option<T>;
export function map<V, E, T>(result: Result<V, E>, fn: (value: V) => T): Result<T, E>;
export function map(target: Option<unknown> | Result<unknown, unknown>, fn: (val: unknown) => unknown) {
  return target[chainFn]({
    Some: v => Some(fn(v)),
    None: () => None,
    Ok: v => Ok(fn(v)),
    Err: e => Err(e),
  }[target[chainKey]]);
}

export function mapErr<V, E, F>(result: Result<V, E>, fn: (error: E) => F): Result<V, F> {
  return result[chainFn]({
    Ok: v => Ok(v),
    Err: e => Err(fn(e)),
  }[result[chainKey]]);
}
