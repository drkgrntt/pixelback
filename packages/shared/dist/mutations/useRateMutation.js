"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.useRateMutation = exports.rateMutation = void 0;
var client_1 = require("@apollo/client");
exports.rateMutation = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation Rate($score: Int!, $storyId: String!, $chapterId: String) {\n    rate(score: $score, storyId: $storyId, chapterId: $chapterId) {\n      id\n    }\n  }\n"], ["\n  mutation Rate($score: Int!, $storyId: String!, $chapterId: String) {\n    rate(score: $score, storyId: $storyId, chapterId: $chapterId) {\n      id\n    }\n  }\n"])));
var useRateMutation = function () {
    return client_1.useMutation(exports.rateMutation);
};
exports.useRateMutation = useRateMutation;
var templateObject_1;
//# sourceMappingURL=useRateMutation.js.map