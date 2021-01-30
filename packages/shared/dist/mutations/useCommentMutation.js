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
exports.useCommentMutation = exports.commentMutation = void 0;
var client_1 = require("@apollo/client");
var CommentInfo_1 = require("../fragments/CommentInfo");
var useStoryQuery_1 = require("../queries/useStoryQuery");
var useChapterQuery_1 = require("../queries/useChapterQuery");
exports.commentMutation = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation Comment(\n    $body: String!\n    $chapterId: String\n    $storyId: String\n  ) {\n    comment(body: $body, chapterId: $chapterId, storyId: $storyId) {\n      ...CommentInfo\n    }\n  }\n  ", "\n"], ["\n  mutation Comment(\n    $body: String!\n    $chapterId: String\n    $storyId: String\n  ) {\n    comment(body: $body, chapterId: $chapterId, storyId: $storyId) {\n      ...CommentInfo\n    }\n  }\n  ", "\n"])), CommentInfo_1.CommentInfo);
var useCommentMutation = function (_a) {
    var storyId = _a.storyId, chapterId = _a.chapterId;
    var options = {
        update: function (cache, result) {
            var _a;
            // Depending on if this is for a story or comment, update its cache
            var id, query, field;
            if (storyId) {
                id = storyId;
                query = useStoryQuery_1.storyQuery;
                field = 'story';
            }
            else {
                id = chapterId;
                query = useChapterQuery_1.chapterQuery;
                field = 'chapter';
            }
            var queryRes = cache.readQuery({
                query: query,
                variables: { id: id }
            });
            if (!queryRes)
                return;
            cache.writeQuery({
                query: query,
                data: (_a = {
                        __typename: 'Query'
                    },
                    _a[field] = __assign(__assign({}, queryRes[field]), { comments: __spreadArrays(queryRes[field].comments, [
                            result.data.comment,
                        ]) }),
                    _a)
            });
        }
    };
    return client_1.useMutation(exports.commentMutation, options);
};
exports.useCommentMutation = useCommentMutation;
var templateObject_1;
//# sourceMappingURL=useCommentMutation.js.map