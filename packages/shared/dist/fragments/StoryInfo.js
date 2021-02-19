"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.StoryInfo = void 0;
var client_1 = require("@apollo/client");
var CommentInfo_1 = require("./CommentInfo");
exports.StoryInfo = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  fragment StoryInfo on Story {\n    id\n    title\n    body\n    summary\n    enableCommenting\n    status\n    score\n    authorId\n    author {\n      id\n      penName\n      canAcceptPayments\n    }\n    reads\n    ratings {\n      id\n      score\n    }\n    comments {\n      ...CommentInfo\n    }\n    genres {\n      id\n      name\n    }\n    rateStatus\n    publishedAt\n    createdAt\n    updatedAt\n  }\n  ", "\n"], ["\n  fragment StoryInfo on Story {\n    id\n    title\n    body\n    summary\n    enableCommenting\n    status\n    score\n    authorId\n    author {\n      id\n      penName\n      canAcceptPayments\n    }\n    reads\n    ratings {\n      id\n      score\n    }\n    comments {\n      ...CommentInfo\n    }\n    genres {\n      id\n      name\n    }\n    rateStatus\n    publishedAt\n    createdAt\n    updatedAt\n  }\n  ", "\n"])), CommentInfo_1.CommentInfo);
var templateObject_1;
//# sourceMappingURL=StoryInfo.js.map