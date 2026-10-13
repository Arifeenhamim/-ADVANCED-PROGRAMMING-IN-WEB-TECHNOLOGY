export type DictionaryKey = string | number;
export type Comparer<T> = (x: T, y: T) => boolean;
export declare class Dictionary<K extends DictionaryKey, V> {
    private record;
    constructor(_record?: Record<K, V>);
    add(key: K, value: V): void;
    includesKey(_key: K): boolean;
    includesValue(_value: V, _comparer?: Comparer<V>): boolean | undefined;
    clear(): void;
    get keys(): K[] | undefined;
    get values(): V[] | undefined;
    valueOf(): Record<K, V> | undefined;
    entries(): IterableIterator<[K, V]>;
    toString(): string;
}
export declare class List<T> extends Array<T> {
    constructor(length: number);
    constructor(...items: Array<T>);
    pushRange(items: Array<T>): number;
    toSet(): Set<T>;
    intersect(second: List<T>, comparer: Comparer<T>): List<T>;
    groupBy<U extends DictionaryKey>(keySelector: (x: T) => U): Dictionary<U, List<T>>;
    distinct(by?: Comparer<T>): List<T>;
    union(second: List<T>): List<T>;
}
