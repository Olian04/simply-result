import { Option, Some, None } from "./Option";
import { Result, Ok, Err } from "./Result";
import { match } from "./match";

export const transpose = <V, E>(result: Result<Option<V>, E>) => match<Option<V>, E, Option<Result<V, E>>>(result, {
    Ok: option => match<V, Option<Result<V, E>>>(option, {
        Some: value => Some(Ok(value)),
        None: () => None,
    }),
    Err: err => Some(Err(err)),
});
