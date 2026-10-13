"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = exports.envSchema = void 0;
const zod_1 = __importStar(require("zod"));
const dotenv = __importStar(require("dotenv"));
const zod_validation_error_1 = require("zod-validation-error");
dotenv.config();
exports.envSchema = zod_1.default
    .object({
    REDIS_HOST: zod_1.default.string().default("localhost"),
    REDIS_PORT: zod_1.default.coerce.number().default(6379),
    REDIS_PASSWORD: zod_1.default.string().optional(),
    DEBUG_LOG: zod_1.default.coerce.boolean().default(false),
    WARN_LOG: zod_1.default.coerce.boolean().default(true),
    ERROR_LOG: zod_1.default.coerce.boolean().default(true),
    REQ_LOG: zod_1.default.coerce.boolean().default(true),
    LOG_FILE: zod_1.default.coerce.boolean().default(true),
    JWT_BEARER_SECRET: zod_1.default.string(),
    AUTH_SERVER_AUDIENCE: zod_1.default.string().optional(),
    JWT_TTL: zod_1.default.coerce.number().default(86400 * 365),
    PORT: zod_1.default.coerce.number().default(5000),
    NODE_ENV: zod_1.default.enum(["development", "production"]).default("development"),
    APP_ENV: zod_1.default.enum(["local", "dev", "prod"]).default("local"),
    MAILER_HOST: zod_1.default.string(),
    MAILER_PORT: zod_1.default.coerce.number(),
    MAILER_SECURE: zod_1.default.coerce.boolean(),
    MAILER_USER: zod_1.default.string(),
    MAILER_PASSWORD: zod_1.default.string(),
    MAILER_FROM: zod_1.default.string(),
    BULB_REWARD_INTERVAL_SECOND: zod_1.default.coerce.number().default(7 * 86400),
    BLOCK_QUERY_INTERVAL: zod_1.default.coerce.number().default(10000),
    LONG_BREAK_THRESHOLD_IN_SECONDS: zod_1.default.coerce.number().default(18 * 60 * 60),
    FRONTEND_URL: zod_1.default.string().default("http://localhost:3000"),
    RTC_PORT_MIN: zod_1.default.coerce.number().default(10000),
    RTC_PORT_MAX: zod_1.default.coerce.number().default(10100),
    NETWORK_NAME: zod_1.default.string().default("mainnet"),
    CHAIN_ID: zod_1.default.coerce.number().default(1),
    PRIVATE_KEY: zod_1.default.string().optional(),
})
    .transform((envs) => {
    return {
        ...envs,
        REDIS_URL: !!envs.REDIS_PASSWORD
            ? `redis://:${envs.REDIS_PASSWORD}@${envs.REDIS_HOST}:${envs.REDIS_PORT}`
            : `redis://${envs.REDIS_HOST}:${envs.REDIS_PORT}`,
    };
});
const env = (() => {
    try {
        return exports.envSchema.parse(Object.entries(process.env).reduce((prev, [key, val]) => ({
            ...prev,
            [key]: (() => {
                try {
                    if (val)
                        return JSON.parse(val);
                    return val;
                }
                catch (error) {
                    return val;
                }
            })(),
        }), {}));
    }
    catch (error) {
        if (error instanceof zod_1.ZodError)
            throw new Error(`ENV ${(0, zod_validation_error_1.fromZodError)(error).message}`);
        else
            throw new Error(`ENV ${error}`);
    }
})();
exports.appConfig = {
    default_schema_identifier: "public",
    default_migrations_folder: __dirname + "/../database/migrations",
    default_seeders_folder: __dirname + "/../database/seeders",
    tenant_migrations_folder: __dirname + "/../database/tenant_migrations",
    tenant_seeders_folder: __dirname + "/../database/tenant_seeders",
    recommended_bycrypt_rounds: 12,
    email_from: "mailer@schmserver.com",
    env,
};
//# sourceMappingURL=app.config.js.map