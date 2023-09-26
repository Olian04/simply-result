import { Option, None } from "./Option";
import { Result, Err } from "./Result";

export function flatten<V>(outerOption: Option<Option<V>>): Option<V>;
export function flatten<V, E>(outerResult: Result<Result<V, E>, E>): Result<V, E>;
export function flatten<V, E>(target: Option<Option<V>> | Result<Result<V, E>, E>) {
  return target.match<Option<V> | Result<V, E>>({
    Some: v => v,
    None: () => None,
    Ok: v => v,
    Err: e => Err(e),
  });
}
