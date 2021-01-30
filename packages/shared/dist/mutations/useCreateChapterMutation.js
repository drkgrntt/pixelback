"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.useCreateChapterMutation = exports.createChapterMutation = void 0;
var client_1 = require("@apollo/client");
var ChapterInfo_1 = require("../fragments/ChapterInfo");
var useStoryQuery_1 = require("../queries/useStoryQuery");
exports.createChapterMutation = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation CreateChapter(\n    $storyId: String!\n    $number: Float!\n    $title: String!\n    $summary: String!\n    $body: String!\n    $status: Float!\n    $enableCommenting: Boolean!\n  ) {\n    createChapter(\n      storyId: $storyId\n      number: $number\n      title: $title\n      summary: $summary\n      body: $body\n      status: $status\n      enableCommenting: $enableCommenting\n    ) {\n      ...ChapterInfo\n    }\n  }\n  ", "\n"], ["\n  mutation CreateChapter(\n    $storyId: String!\n    $number: Float!\n    $title: String!\n    $summary: String!\n    $body: String!\n    $status: Float!\n    $enableCommenting: Boolean!\n  ) {\n    createChapter(\n      storyId: $storyId\n      number: $number\n      title: $title\n      summary: $summary\n      body: $body\n      status: $status\n      enableCommenting: $enableCommenting\n    ) {\n      ...ChapterInfo\n    }\n  }\n  ", "\n"])), ChapterInfo_1.ChapterInfo);
var useCreateChapterMutation = function (storyId) {
    var options = {
        update: function (cache, result) {
            var storyRes = cache.readQuery({
                query: useStoryQuery_1.storyQuery,
                variables: { id: storyId }
            });
            if (!storyRes)
                return;
            cache.writeQuery({
                query: useStoryQuery_1.storyQuery,
                data: {
                    __typename: 'Query',
                    story: __assign(__assign({}, storyRes.story), { chapters: __spreadArrays(storyRes.story.chapters, [
                            result.data.createChapter,
                        ]) })
                }
            });
        }
    };
    return client_1.useMutation(exports.createChapterMutation, options);
};
exports.useCreateChapterMutation = useCreateChapterMutation;
var templateObject_1;
//# sourceMappingURL=useCreateChapterMutation.js.map