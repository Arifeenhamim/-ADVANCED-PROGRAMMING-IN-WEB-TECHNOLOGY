"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OptionalCurrentUser = exports.CurrentUser = void 0;
const auth_helper_1 = require("../helpers/auth.helper");
const common_1 = require("@nestjs/common");
exports.CurrentUser = (0, common_1.createParamDecorator)((data, context) => {
    const req = context.switchToHttp().getRequest();
    console.log("[CurrentUser Decorator] Request headers:", {
        authorization: req.headers.authorization ? "Present" : "Missing",
        user: req.user ? "Present" : "Missing",
        userData: req.user,
    });
    const user = (0, auth_helper_1.getCurrentUser)(req);
    console.log("[CurrentUser Decorator] getCurrentUser result:", user);
    if (typeof user === "string") {
        console.log("[CurrentUser Decorator] Error:", user);
        throw new common_1.UnauthorizedException(user);
    }
    if (!user) {
        console.log("[CurrentUser Decorator] No user found");
        throw new common_1.UnauthorizedException("User not authenticated");
    }
    return user;
});
exports.OptionalCurrentUser = (0, common_1.createParamDecorator)((data, context) => {
    const req = context.switchToHttp().getRequest();
    const user = (0, auth_helper_1.getCurrentUser)(req);
    if (typeof user === "string")
        return null;
    return user;
});
//# sourceMappingURL=current-user.decorator.js.map