import { Option, None } from "./Option";
import { Result, Err } from "./Result";
import { match } from "./match";

export function flatten<V>(outerOption: Option<Option<V>>): Option<V>;
export function flatten<V, E>(outerResult: Result<Result<V, E>, E>): Result<V, E>;
export function flatten<V, E>(target: Option<Option<V>> | Result<Result<V, E>, E>) {
    if ('isSome' in target) {
        return match(target, {
            Some: innerOption => innerOption,
            None: () => None,
        });
    }
    return match(target, {
        Ok: innerResult => innerResult,
        Err: err => Err(err),
    });
}
