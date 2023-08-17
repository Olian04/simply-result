import { None, Option, Some } from './Option';
import { Err, Ok, Result } from './Result';

export function map<V, T>(option: Option<V>, fn: (value: V) => T): Option<T>;
export function map<V, E, T>(result: Result<V, E>, fn: (value: V) => T): Result<T, E>;
export function map(target: any, fn: (val: any) => any) {
    if (target.isSome) {
        return Some(fn(target.unwrap()));
    }
    if (target.isNone) {
        return None;
    }
    if (target.isOk) {
        return Ok(fn(target.unwrap()));
    }
    if (target.isErr) {
        return target;
    }
    throw new Error('Unexpected argument type');
}

export function mapErr<V, E, F>(result: Result<V, E>, fn: (error: E) => F): Result<V, F> {
    if (result.isOk) {
        return result;
    }
    if (result.isErr) {
        return Err(fn(result.err.unwrap()));
    }
    throw new Error('Unexpected argument type');
}
