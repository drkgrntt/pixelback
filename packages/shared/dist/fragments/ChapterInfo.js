"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.ChapterInfo = void 0;
var client_1 = require("@apollo/client");
var CommentInfo_1 = require("./CommentInfo");
exports.ChapterInfo = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  fragment ChapterInfo on Chapter {\n    id\n    number\n    title\n    body\n    summary\n    enableCommenting\n    status\n    score\n    reads\n    author {\n      id\n    }\n    previous {\n      id\n    }\n    next {\n      id\n    }\n    ratings {\n      id\n    }\n    comments {\n      ...CommentInfo\n    }\n    rateStatus\n    publishedAt\n    createdAt\n    updatedAt\n  }\n  ", "\n"], ["\n  fragment ChapterInfo on Chapter {\n    id\n    number\n    title\n    body\n    summary\n    enableCommenting\n    status\n    score\n    reads\n    author {\n      id\n    }\n    previous {\n      id\n    }\n    next {\n      id\n    }\n    ratings {\n      id\n    }\n    comments {\n      ...CommentInfo\n    }\n    rateStatus\n    publishedAt\n    createdAt\n    updatedAt\n  }\n  ", "\n"])), CommentInfo_1.CommentInfo);
var templateObject_1;
//# sourceMappingURL=ChapterInfo.js.map