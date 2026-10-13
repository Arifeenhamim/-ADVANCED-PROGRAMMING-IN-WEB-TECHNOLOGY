"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCurrentUser = void 0;
const getCurrentUser = (req) => {
    if (!req.user)
        return "You are not authenticated";
    const { id } = req.user;
    if (!id)
        return "Invalid token";
    return req.user;
};
exports.getCurrentUser = getCurrentUser;
//# sourceMappingURL=auth.helper.js.map