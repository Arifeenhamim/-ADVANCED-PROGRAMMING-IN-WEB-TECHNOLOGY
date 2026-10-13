"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProcessEnv = void 0;
class ProcessEnv {
    static get(key) {
        return process.env[key];
    }
    static isProduction() {
        return this.get("NODE_ENV") === "production";
    }
}
exports.ProcessEnv = ProcessEnv;
//# sourceMappingURL=process-env.utils.js.map