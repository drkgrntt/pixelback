"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.useUpdatePenNameMutation = exports.updatePenNameMutation = void 0;
var client_1 = require("@apollo/client");
exports.updatePenNameMutation = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation UpdatePenName($penName: String!) {\n    updatePenName(penName: $penName) {\n      id\n      penName\n    }\n  }\n"], ["\n  mutation UpdatePenName($penName: String!) {\n    updatePenName(penName: $penName) {\n      id\n      penName\n    }\n  }\n"])));
var useUpdatePenNameMutation = function () {
    return client_1.useMutation(exports.updatePenNameMutation);
};
exports.useUpdatePenNameMutation = useUpdatePenNameMutation;
var templateObject_1;
//# sourceMappingURL=useUpdatePenNameMutation.js.map