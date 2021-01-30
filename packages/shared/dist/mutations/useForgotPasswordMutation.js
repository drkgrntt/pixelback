"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.useForgotPasswordMutation = exports.forgotPasswordMutation = void 0;
var client_1 = require("@apollo/client");
exports.forgotPasswordMutation = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation ForgotPassword($email: String!) {\n    forgotPassword(email: $email)\n  }\n"], ["\n  mutation ForgotPassword($email: String!) {\n    forgotPassword(email: $email)\n  }\n"])));
var useForgotPasswordMutation = function () {
    return client_1.useMutation(exports.forgotPasswordMutation);
};
exports.useForgotPasswordMutation = useForgotPasswordMutation;
var templateObject_1;
//# sourceMappingURL=useForgotPasswordMutation.js.map