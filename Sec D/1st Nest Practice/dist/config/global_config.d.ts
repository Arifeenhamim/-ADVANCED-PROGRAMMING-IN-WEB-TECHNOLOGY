declare const _default: () => {
    extra: {
        timezone: string;
        is_live: string;
    };
    env: {
        JWT_BEARER_SECRET: string | null;
        EMAIL_URL: string;
        EMAILS: string | undefined;
        REDIS_URL: string | undefined;
    };
    environment: {
        is_production: boolean;
        is_log_active: boolean;
    };
};
export default _default;
