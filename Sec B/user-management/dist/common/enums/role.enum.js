"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleHierarchy = exports.Role = void 0;
var Role;
(function (Role) {
    Role["SUPER_ADMIN"] = "ROLE_SUPER_ADMIN";
    Role["ADMIN"] = "ROLE_ADMIN";
    Role["USER"] = "ROLE_USER";
    Role["DEPARTMENT_HEAD"] = "ROLE_DEPARTMENT_HEAD";
    Role["COURSE_CONVENOR"] = "ROLE_COURSE_CONVENOR";
    Role["THESIS_ADMIN"] = "ROLE_THESIS_ADMIN";
    Role["THESIS_CONVENER"] = "ROLE_THESIS_CONVENER";
    Role["THESIS_MEMBER"] = "ROLE_THESIS_MEMBER";
    Role["THESIS_SUPERVISOR"] = "ROLE_USER";
    Role["OPERATOR"] = "OPERATOR";
})(Role || (exports.Role = Role = {}));
exports.RoleHierarchy = {
    [Role.SUPER_ADMIN]: 8,
    [Role.ADMIN]: 7,
    [Role.DEPARTMENT_HEAD]: 6,
    [Role.COURSE_CONVENOR]: 5,
    [Role.THESIS_ADMIN]: 4,
    [Role.THESIS_CONVENER]: 3,
    [Role.THESIS_MEMBER]: 2,
    [Role.OPERATOR]: 2,
    [Role.USER]: 1,
};
//# sourceMappingURL=role.enum.js.map