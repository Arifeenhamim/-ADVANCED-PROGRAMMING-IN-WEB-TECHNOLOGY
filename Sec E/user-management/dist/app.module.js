"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const provider_module_1 = require("./providers/database/postgres/provider.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const global_config_1 = __importDefault(require("./config/global_config"));
const bull_1 = require("@nestjs/bull");
const user_module_1 = require("./modules/user/user.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            provider_module_1.PostgresDatabaseProviderModule,
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [],
            }),
            bull_1.BullModule.forRoot({
                url: process.env.REDIS_URL,
            }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [global_config_1.default],
            }),
            user_module_1.UserModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map