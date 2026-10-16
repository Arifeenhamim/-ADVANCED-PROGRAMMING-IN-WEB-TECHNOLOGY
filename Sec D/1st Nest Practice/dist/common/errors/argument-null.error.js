"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArgumentNullError = void 0;
class ArgumentNullError extends Error {
    constructor(paramName) {
        super("Value can not be null or undefined");
        this.paramName = paramName ?? "";
    }
}
exports.ArgumentNullError = ArgumentNullError;
//# sourceMappingURL=argument-null.error.js.map