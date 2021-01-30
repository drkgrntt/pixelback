"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.useLoginMutation = exports.loginMutation = void 0;
var client_1 = require("@apollo/client");
var UserInfo_1 = require("../fragments/UserInfo");
var useMeQuery_1 = require("../queries/useMeQuery");
exports.loginMutation = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      user {\n        ...UserInfo\n        roleSubscription {\n          id\n          createdAt\n          currentPeriodStart\n          currentPeriodEnd\n          price\n          interval\n        }\n        paymentMethods {\n          id\n          brand\n          last4\n          expMonth\n          expYear\n          name\n        }\n        stories {\n          id\n          title\n        }\n        ratings {\n          id\n        }\n        subscriptions {\n          id\n        }\n        subscribers {\n          id\n          level\n        }\n      }\n      token {\n        value\n      }\n    }\n  }\n  ", "\n"], ["\n  mutation Login($email: String!, $password: String!) {\n    login(email: $email, password: $password) {\n      user {\n        ...UserInfo\n        roleSubscription {\n          id\n          createdAt\n          currentPeriodStart\n          currentPeriodEnd\n          price\n          interval\n        }\n        paymentMethods {\n          id\n          brand\n          last4\n          expMonth\n          expYear\n          name\n        }\n        stories {\n          id\n          title\n        }\n        ratings {\n          id\n        }\n        subscriptions {\n          id\n        }\n        subscribers {\n          id\n          level\n        }\n      }\n      token {\n        value\n      }\n    }\n  }\n  ", "\n"])), UserInfo_1.UserInfo);
var useLoginMutation = function () {
    var options = {
        update: function (cache, result) {
            var _a;
            cache.writeQuery({
                query: useMeQuery_1.meQuery,
                data: {
                    __typename: 'Query',
                    me: (_a = result.data) === null || _a === void 0 ? void 0 : _a.login.user
                }
            });
        }
    };
    return client_1.useMutation(exports.loginMutation, options);
};
exports.useLoginMutation = useLoginMutation;
var templateObject_1;
//# sourceMappingURL=useLoginMutation.js.map