"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.CommentInfo = void 0;
var client_1 = require("@apollo/client");
exports.CommentInfo = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  fragment CommentInfo on Comment {\n    id\n    body\n    updatedAt\n    createdAt\n    author {\n      id\n      penName\n    }\n  }\n"], ["\n  fragment CommentInfo on Comment {\n    id\n    body\n    updatedAt\n    createdAt\n    author {\n      id\n      penName\n    }\n  }\n"])));
var templateObject_1;
//# sourceMappingURL=CommentInfo.js.map