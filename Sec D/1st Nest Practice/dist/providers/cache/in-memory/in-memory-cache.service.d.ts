export declare class InMemoryCacheService {
    private cache;
    constructor();
    get(key: string): unknown;
    set(key: string, value: unknown): void;
    delete(key: string): void;
    clear(): void;
    executeOnce(key: string, callback: () => void | Promise<void>): void;
}
