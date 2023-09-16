import { Option, None } from "./Option";
import { Result, Err } from "./Result";
import { chainFn, chainKey } from "./private";

export function flatten<V>(outerOption: Option<Option<V>>): Option<V>;
export function flatten<V, E>(outerResult: Result<Result<V, E>, E>): Result<V, E>;
export function flatten<V, E>(target: Option<Option<V>> | Result<Result<V, E>, E>) {
    return target[chainFn]({
        Some: v => v,
        None: () => None,
        Ok: v => v,
        Err: e => Err(e),
    }[target[chainKey]]);
}
