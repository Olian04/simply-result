import { Option, Some, None } from "./Option";

export const Get = <V>(object: Partial<Record<string | number | symbol, V>>, key: keyof typeof object): Option<V> => {
    if (key in object) {
        return Some(object[key] as V)
    }
    return None;
};
