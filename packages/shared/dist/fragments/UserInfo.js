"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.UserInfo = void 0;
var client_1 = require("@apollo/client");
exports.UserInfo = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  fragment UserInfo on User {\n    id\n    email\n    role\n    penName\n    canAcceptPayments\n    favoriteStories {\n      id\n      title\n      author {\n        id\n        penName\n      }\n      genres {\n        id\n        name\n      }\n    }\n    createdAt\n    updatedAt\n  }\n"], ["\n  fragment UserInfo on User {\n    id\n    email\n    role\n    penName\n    canAcceptPayments\n    favoriteStories {\n      id\n      title\n      author {\n        id\n        penName\n      }\n      genres {\n        id\n        name\n      }\n    }\n    createdAt\n    updatedAt\n  }\n"])));
var templateObject_1;
//# sourceMappingURL=UserInfo.js.map