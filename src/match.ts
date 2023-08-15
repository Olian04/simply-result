import { Result } from "./Result";
import { Option } from "./Option";

export function match<V, T>(target: Option<V>, cases: {
    Some: (value: V) => T,
    None: () => T,
}): T;
export function match<V, E, T>(target: Result<V, E>, cases: {
    Ok: (value: V) => T,
    Err: (error: E) => T,
}): T;
export function match(target: any, cases: any) {
    if (target.isSome) {
        return cases.Some(
            target.unwrapOrThrow()
        );
    }
    if (target.isNone) {
        return cases.None();
    }
    if (target.isOk) {
        return cases.Ok(
            target.unwrapOrThrow()
        );
    }
    if (target.isErr) {
        return cases.Err(
            target.err.unwrapOrThrow()
        );
    }
    throw new Error('Unexpected argument type');
}
