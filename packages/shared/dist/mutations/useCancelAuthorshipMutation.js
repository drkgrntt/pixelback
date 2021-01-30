"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.useCancelAuthorshipMutation = exports.cancelAuthorshipMutation = void 0;
var client_1 = require("@apollo/client");
var UserInfo_1 = require("../fragments/UserInfo");
exports.cancelAuthorshipMutation = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation CancelAuthorship {\n    cancelAuthorship {\n      ...UserInfo\n      roleSubscription {\n        id\n        createdAt\n        currentPeriodStart\n        currentPeriodEnd\n        price\n        interval\n      }\n    }\n  }\n  ", "\n"], ["\n  mutation CancelAuthorship {\n    cancelAuthorship {\n      ...UserInfo\n      roleSubscription {\n        id\n        createdAt\n        currentPeriodStart\n        currentPeriodEnd\n        price\n        interval\n      }\n    }\n  }\n  ", "\n"])), UserInfo_1.UserInfo);
var useCancelAuthorshipMutation = function () {
    return client_1.useMutation(exports.cancelAuthorshipMutation);
};
exports.useCancelAuthorshipMutation = useCancelAuthorshipMutation;
var templateObject_1;
//# sourceMappingURL=useCancelAuthorshipMutation.js.map