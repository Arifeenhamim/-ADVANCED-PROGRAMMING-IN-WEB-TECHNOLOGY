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
exports.dataSourceOptions = exports.SnakeNamingStrategy = void 0;
const typeorm_1 = require("typeorm");
const StringUtils_1 = require("typeorm/util/StringUtils");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
class SnakeNamingStrategy extends typeorm_1.DefaultNamingStrategy {
    tableName(className, customName) {
        if (customName)
            return customName;
        const snakeCasedClassName = (0, StringUtils_1.snakeCase)(className);
        const splittedClassName = snakeCasedClassName.split("_");
        const lastWord = splittedClassName[splittedClassName.length];
        switch (lastWord) {
            case "status":
                return `${snakeCasedClassName}es`;
            default:
                return `${snakeCasedClassName}s`;
        }
    }
    columnName(propertyName, customName, embeddedPrefixes) {
        return ((0, StringUtils_1.snakeCase)(embeddedPrefixes.join("_")) +
            (customName || (0, StringUtils_1.snakeCase)(propertyName)));
    }
    relationName(propertyName) {
        return (0, StringUtils_1.camelCase)(propertyName, true);
    }
    joinColumnName(relationName, referencedColumnName) {
        return (0, StringUtils_1.snakeCase)(`${relationName}_${referencedColumnName}`);
    }
    joinTableName(firstTableName, secondTableName, firstPropertyName) {
        return (0, StringUtils_1.snakeCase)(`${firstTableName}_${firstPropertyName.replace(/\./gi, "_")}_${secondTableName}`);
    }
    joinTableColumnName(tableName, propertyName, columnName) {
        return (0, StringUtils_1.snakeCase)(`${tableName}_${columnName || propertyName}`);
    }
    classTableInheritanceParentColumnName(parentTableName, parentTableIdPropertyName) {
        return (0, StringUtils_1.snakeCase)(`${parentTableName}_${parentTableIdPropertyName}`);
    }
}
exports.SnakeNamingStrategy = SnakeNamingStrategy;
exports.dataSourceOptions = {
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : undefined,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    schema: "public",
    entities: [__dirname + "/../modules/**/entities/*.entity.{ts,js}"],
    namingStrategy: new SnakeNamingStrategy(),
    migrations: [__dirname + "/../database/migrations/*.ts"],
    logging: process.env.NODE_DB_ENV
        ? process.env.NODE_DB_ENV == "development"
            ? false
            : false
        : false,
    synchronize: false,
};
exports.default = exports.dataSourceOptions;
//# sourceMappingURL=database.config.js.map