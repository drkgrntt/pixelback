"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.useResetPasswordMutation = exports.resetPasswordMutation = void 0;
var client_1 = require("@apollo/client");
exports.resetPasswordMutation = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation ResetPassword(\n    $oldPassword: String!\n    $newPassword: String!\n  ) {\n    resetPassword(\n      oldPassword: $oldPassword\n      newPassword: $newPassword\n    )\n  }\n"], ["\n  mutation ResetPassword(\n    $oldPassword: String!\n    $newPassword: String!\n  ) {\n    resetPassword(\n      oldPassword: $oldPassword\n      newPassword: $newPassword\n    )\n  }\n"])));
var useResetPasswordMutation = function () {
    return client_1.useMutation(exports.resetPasswordMutation);
};
exports.useResetPasswordMutation = useResetPasswordMutation;
var templateObject_1;
//# sourceMappingURL=useResetPasswordMutation.js.map