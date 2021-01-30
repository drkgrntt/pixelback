"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.useChapterQuery = exports.chapterQuery = void 0;
var client_1 = require("@apollo/client");
var ChapterInfo_1 = require("../fragments/ChapterInfo");
exports.chapterQuery = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query Chapter($id: String!) {\n    chapter(id: $id) {\n      ...ChapterInfo\n    }\n  }\n  ", "\n"], ["\n  query Chapter($id: String!) {\n    chapter(id: $id) {\n      ...ChapterInfo\n    }\n  }\n  ", "\n"])), ChapterInfo_1.ChapterInfo);
var useChapterQuery = function (options) {
    return client_1.useQuery(exports.chapterQuery, options);
};
exports.useChapterQuery = useChapterQuery;
var templateObject_1;
//# sourceMappingURL=useChapterQuery.js.map