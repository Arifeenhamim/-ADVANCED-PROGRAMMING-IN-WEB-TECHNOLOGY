"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.throwAxiosHttpException = throwAxiosHttpException;
const axios_1 = __importDefault(require("axios"));
const common_1 = require("@nestjs/common");
function throwAxiosHttpException(error, fallbackMessage = "External API error") {
    if (axios_1.default.isAxiosError(error) && error.response) {
        const axiosError = error;
        const status = axiosError.response?.status || 500;
        const data = axiosError.response?.data || {};
        const description = data.description || data.message || fallbackMessage;
        throw new common_1.HttpException({
            statusCode: status,
            message: description,
            original: data,
        }, status);
    }
    throw new common_1.HttpException({
        statusCode: 500,
        message: fallbackMessage,
    }, 500);
}
//# sourceMappingURL=axios-error.utils.js.map