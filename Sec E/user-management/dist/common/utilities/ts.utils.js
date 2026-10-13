"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _global = global;
_global.nameof = function (nameFn) {
    return /return (.*);/.exec(nameFn.toString())?.[1] ?? "";
};
//# sourceMappingURL=ts.utils.js.map