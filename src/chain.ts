import { Option } from './Option';
import { Result } from './Result';

export function chain<V, T>(option: Option<V>, some: (value: V) => Option<T>, none: () => Option<T>): Option<T>;
export function chain<V, T, F>(option: Option<V>, some: (value: V) => Result<T, F>, none: () => Result<T, F>): Result<T, F>;
export function chain<V, E, T>(result: Result<V, E>, ok: (value: V) => Option<T>, err: (error: E) => Option<T>): Option<T>;
export function chain<V, E, T, F>(result: Result<V, E>, ok: (value: V) => Result<T, F>, err: (error: E) => Result<T, F>): Result<T, F>;
export function chain(target: any, okOrSome: (val: any) => any, errOrNone: (val?: any) => any) {
    if (target.isSome || target.isOk) {
        return okOrSome(target.unwrap());
    }
    if (target.isNone) {
        return errOrNone();
    }
    if (target.isErr) {
        return errOrNone(target.err.unwrap());
    }
    throw new Error('Unexpected argument type');
}
