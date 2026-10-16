export {};
declare global {
    function nameof<T>(nameFn: () => T): string;
}
