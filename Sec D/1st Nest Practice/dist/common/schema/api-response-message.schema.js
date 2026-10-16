"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiResponseMessage = exports.apiResponseMessageDtoSchema = void 0;
const nestjs_zod_1 = require("nestjs-zod");
const zod_1 = require("zod");
exports.apiResponseMessageDtoSchema = zod_1.z.object({ message: zod_1.z.string() });
class ApiResponseMessage extends (0, nestjs_zod_1.createZodDto)(exports.apiResponseMessageDtoSchema) {
}
exports.ApiResponseMessage = ApiResponseMessage;
//# sourceMappingURL=api-response-message.schema.js.map