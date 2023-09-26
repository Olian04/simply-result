import { Option, Some, None } from "./Option";
import { Result, Ok, Err } from "./Result";

export const transpose = <V, E>(result: Result<Option<V>, E>) => result.match({
  Ok: option => option.match<Option<Result<V, E>>>({
    Some: value => Some(Ok(value)),
    None: () => None,
  }),
  Err: err => Some(Err(err)),
});
