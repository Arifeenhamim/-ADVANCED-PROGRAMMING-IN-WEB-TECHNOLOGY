"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nestjs_seeder_1 = require("nestjs-seeder");
const typeorm_1 = require("@nestjs/typeorm");
const database_config_1 = __importDefault(require("./config/database.config"));
(0, nestjs_seeder_1.seeder)({
    imports: [
        typeorm_1.TypeOrmModule.forRoot({
            ...database_config_1.default,
            entities: [__dirname + "/database/factories/*.factory.{ts,js}"],
        }),
        typeorm_1.TypeOrmModule.forFeature([]),
    ],
}).run([]);
//# sourceMappingURL=seeder.js.map