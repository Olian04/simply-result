export type Option<V> =
    | Some<V>
    | None;

export interface Some<V> {
    isSome: true;
    isNone: false;
    unwrap(): V;
    unwrapOr(defaultValue: V): V;
    toString(): string;
}

export interface None {
    isSome: false;
    isNone: true;
    unwrap(): never;
    unwrapOr<V>(defaultValue: V): V;
    toString(): string;
}

export const Some = <V>(value: V): Some<V> => ({
    get isSome() {
        return true as const;
    },
    get isNone() {
        return false as const;
    },
    unwrap: () => value,
    unwrapOr: () => value,
    toString: () => `Some(${value})`,
});

export const None: None = {
    get isSome() {
        return false as const;
    },
    get isNone() {
        return true as const;
    },
    unwrap: () => {
        throw new Error('Attempting to unwrap None value');
    },
    unwrapOr: defaultValue => defaultValue,
    toString: () => `None()`,
};