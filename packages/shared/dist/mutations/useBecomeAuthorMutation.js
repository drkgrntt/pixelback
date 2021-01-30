"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.useBecomeAuthorMutation = exports.becomeAuthorMutation = void 0;
var client_1 = require("@apollo/client");
var UserInfo_1 = require("../fragments/UserInfo");
exports.becomeAuthorMutation = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation BecomeAuthor($price: String!, $sourceId: String!) {\n    becomeAuthor(price: $price, sourceId: $sourceId) {\n      ...UserInfo\n      roleSubscription {\n        id\n        createdAt\n        currentPeriodStart\n        currentPeriodEnd\n        price\n        interval\n      }\n    }\n  }\n  ", "\n"], ["\n  mutation BecomeAuthor($price: String!, $sourceId: String!) {\n    becomeAuthor(price: $price, sourceId: $sourceId) {\n      ...UserInfo\n      roleSubscription {\n        id\n        createdAt\n        currentPeriodStart\n        currentPeriodEnd\n        price\n        interval\n      }\n    }\n  }\n  ", "\n"])), UserInfo_1.UserInfo);
var useBecomeAuthorMutation = function () {
    return client_1.useMutation(exports.becomeAuthorMutation);
};
exports.useBecomeAuthorMutation = useBecomeAuthorMutation;
var templateObject_1;
//# sourceMappingURL=useBecomeAuthorMutation.js.map