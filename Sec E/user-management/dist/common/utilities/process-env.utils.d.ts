export declare class ProcessEnv {
    static get<T extends string | number>(key: keyof NodeJS.ProcessEnv): T;
    static isProduction(): boolean;
}
