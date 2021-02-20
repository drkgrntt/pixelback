"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.useMeQuery = exports.meQuery = void 0;
var client_1 = require("@apollo/client");
var UserInfo_1 = require("../fragments/UserInfo");
exports.meQuery = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query Me {\n    me {\n      ...UserInfo\n      roleSubscription {\n        id\n        createdAt\n        currentPeriodStart\n        currentPeriodEnd\n        price\n        interval\n      }\n      paymentMethods {\n        id\n        brand\n        last4\n        expMonth\n        expYear\n        name\n      }\n      stories {\n        id\n        title\n        author {\n          id\n          penName\n        }\n        genres {\n          id\n          name\n        }\n      }\n      ratings {\n        id\n      }\n      subscriptions {\n        id\n        level\n        subscribedTo {\n          id\n          penName\n        }\n      }\n      subscribers {\n        id\n        level\n      }\n      comments {\n        id\n        author {\n          id\n        }\n        body\n        story {\n          id\n          title\n        }\n        chapter {\n          id\n          title\n          story {\n            id\n          }\n        }\n        createdAt\n        updatedAt\n      }\n    }\n  }\n  ", "\n"], ["\n  query Me {\n    me {\n      ...UserInfo\n      roleSubscription {\n        id\n        createdAt\n        currentPeriodStart\n        currentPeriodEnd\n        price\n        interval\n      }\n      paymentMethods {\n        id\n        brand\n        last4\n        expMonth\n        expYear\n        name\n      }\n      stories {\n        id\n        title\n        author {\n          id\n          penName\n        }\n        genres {\n          id\n          name\n        }\n      }\n      ratings {\n        id\n      }\n      subscriptions {\n        id\n        level\n        subscribedTo {\n          id\n          penName\n        }\n      }\n      subscribers {\n        id\n        level\n      }\n      comments {\n        id\n        author {\n          id\n        }\n        body\n        story {\n          id\n          title\n        }\n        chapter {\n          id\n          title\n          story {\n            id\n          }\n        }\n        createdAt\n        updatedAt\n      }\n    }\n  }\n  ", "\n"])), UserInfo_1.UserInfo);
var useMeQuery = function (options) {
    if (options === void 0) { options = {}; }
    return client_1.useQuery(exports.meQuery, options);
};
exports.useMeQuery = useMeQuery;
var templateObject_1;
//# sourceMappingURL=useMeQuery.js.map