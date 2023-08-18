import { Option, Some, None } from "./Option";
import { match } from "./match";

export const Get = <V>(object: Partial<Record<string | number | symbol, V>>, key: keyof typeof object): Option<V> => {
    if (key in object) {
        return Some(object[key] as V)
    }
    return None;
};

export const GetOr = <V>(object: Partial<Record<string | number | symbol, V>>, key: keyof typeof object, fallbackValue: V): Some<V> =>
    match(Get(object, key), {
        Some: value => Some(value),
        None: () => Some(fallbackValue),
    }) as Some<V>;
