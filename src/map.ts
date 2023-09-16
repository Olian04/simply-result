import { None, Option, Some } from './Option';
import { Err, Ok, Result } from './Result';
import { match } from './match';

export function map<V, T>(option: Option<V>, fn: (value: V) => T): Option<T>;
export function map<V, E, T>(result: Result<V, E>, fn: (value: V) => T): Result<T, E>;
export function map(target: Option<unknown> | Result<unknown, unknown>, fn: (val: unknown) => unknown) {
    if ('isSome' in target) {
        return match(target, {
            Some: v => Some(fn(v)),
            None: () => None,
        });
    }
    return match(target, {
        Ok: v => Ok(fn(v)),
        Err: e => Err(e),
    });
}

export function mapErr<V, E, F>(result: Result<V, E>, fn: (error: E) => F): Result<V, F> {
    return match(result, {
        Ok: v => Ok(v),
        Err: e => Err(fn(e)),
    });
}
