"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.useLogoutEverywhereMutation = exports.logoutEverywhereMutation = void 0;
var client_1 = require("@apollo/client");
exports.logoutEverywhereMutation = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation LogoutEverywhere {\n    logoutEverywhere {\n      value\n    }\n  }\n"], ["\n  mutation LogoutEverywhere {\n    logoutEverywhere {\n      value\n    }\n  }\n"])));
var useLogoutEverywhereMutation = function () {
    return client_1.useMutation(exports.logoutEverywhereMutation);
};
exports.useLogoutEverywhereMutation = useLogoutEverywhereMutation;
var templateObject_1;
//# sourceMappingURL=useLogoutEverywhereMutation.js.map