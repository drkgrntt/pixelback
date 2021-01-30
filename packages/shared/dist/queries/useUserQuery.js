"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.useUserQuery = exports.userQuery = void 0;
var client_1 = require("@apollo/client");
var UserInfo_1 = require("../fragments/UserInfo");
exports.userQuery = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query User($id: String!) {\n    user(id: $id) {\n      ...UserInfo\n      stories {\n        id\n        title\n        genres {\n          id\n          name\n        }\n        author {\n          id\n          penName\n        }\n      }\n      subscribers {\n        id\n        level\n      }\n    }\n  }\n  ", "\n"], ["\n  query User($id: String!) {\n    user(id: $id) {\n      ...UserInfo\n      stories {\n        id\n        title\n        genres {\n          id\n          name\n        }\n        author {\n          id\n          penName\n        }\n      }\n      subscribers {\n        id\n        level\n      }\n    }\n  }\n  ", "\n"])), UserInfo_1.UserInfo);
var useUserQuery = function (options) {
    return client_1.useQuery(exports.userQuery, options);
};
exports.useUserQuery = useUserQuery;
var templateObject_1;
//# sourceMappingURL=useUserQuery.js.map