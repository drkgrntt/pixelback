"use strict";
exports.__esModule = true;
exports.SubLevel = exports.PublishStatus = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole[UserRole["None"] = 0] = "None";
    UserRole[UserRole["Reader"] = 1] = "Reader";
    UserRole[UserRole["Writer"] = 2] = "Writer";
    UserRole[UserRole["Author"] = 3] = "Author";
    UserRole[UserRole["Admin"] = 4] = "Admin";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
var PublishStatus;
(function (PublishStatus) {
    PublishStatus[PublishStatus["None"] = 0] = "None";
    PublishStatus[PublishStatus["Published"] = 1] = "Published";
    PublishStatus[PublishStatus["Draft"] = 2] = "Draft";
})(PublishStatus = exports.PublishStatus || (exports.PublishStatus = {}));
var SubLevel;
(function (SubLevel) {
    SubLevel[SubLevel["None"] = 0] = "None";
    SubLevel[SubLevel["Free"] = 1] = "Free";
    SubLevel[SubLevel["Paid"] = 2] = "Paid";
})(SubLevel = exports.SubLevel || (exports.SubLevel = {}));
//# sourceMappingURL=types.js.map