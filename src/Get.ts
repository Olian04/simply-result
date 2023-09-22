import { Option, Some, None } from "./Option";

export const Get = <V, K>(maplike: {
    get(key: K): V | undefined;
    has(key: K): boolean;
}, key: K): Option<V> => {
    if (maplike.has(key)) {
        return Some(maplike.get(key));
    }
    return None;
};
