import { Result, Ok, Err } from "./Result";

export const Try = <V, E = Error>(fn: () => V): Result<V, E> => {
    try {
        return Ok(fn());
    } catch (err) {
        return Err(err as E);
    }
};

export const TryAsync = async <V, E = Error>(fn: () => Promise<V>): Promise<Result<V, E>> => {
    try {
        return Ok(await fn());
    } catch (err) {
        return Err(err as E);
    }
};
