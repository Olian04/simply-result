import { Option, Some, None } from "./Option";
import { Result, Ok, Err } from "./Result";
import { match } from "./match";

export const transpose = <V, E>(result: Result<Option<V>, E>) => match(result, {
  Ok: option => match(option, {
    Some: value => Some(Ok(value) as Result<V, E>),
    None: () => None,
  }),
  Err: err => Some(Err(err)),
});
