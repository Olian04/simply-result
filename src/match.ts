import { Result } from "./Result";
import { Option } from "./Option";

export function match<V, E, T>(result: Result<V, E>, cases: {
    Ok: (value: V) => Option<T>,
    Err: (error: E) => Option<T>
}): Option<T>;
export function match<V, E, T, F>(result: Result<V, E>, cases: {
    Ok: (value: V) => Result<T, F>,
    Err: (error: E) => Result<T, F>
}): Result<T, F>;
export function match<V, E, T>(result: Result<V, E>, cases: {
    Ok: (value: V) => T,
    Err: (error: E) => T
}): T extends Result<unknown, unknown> ? never : T extends Option<unknown> ? never : T;

export function match<V, T>(option: Option<V>, cases: {
    Some: (value: V) => Option<T>;
    None: () => Option<T>;
}): Option<T>;
export function match<V, T, F>(option: Option<V>, cases: {
    Some: (value: V) => Result<T, F>;
    None: () => Result<T, F>;
}): Result<T, F>;
export function match<V, T>(option: Option<V>, cases: {
    Some: (value: V) => T,
    None: () => T
}): T extends Result<unknown, unknown> ? never : T extends Option<unknown> ? never : T;

export function match(target: Option<unknown> | Result<unknown, unknown>, cases: Record<string, any>) {
    return target._chain(cases.Ok || cases.Some, cases.Err || cases.None);
}
