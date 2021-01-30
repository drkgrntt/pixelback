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
exports.useCreateStoryMutation = exports.createStoryMutation = void 0;
var client_1 = require("@apollo/client");
var StoryInfo_1 = require("../fragments/StoryInfo");
var useMeQuery_1 = require("../queries/useMeQuery");
exports.createStoryMutation = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation CreateStory(\n    $title: String!\n    $summary: String!\n    $body: String!\n    $status: Float!\n    $enableCommenting: Boolean!\n  ) {\n    createStory(\n      title: $title\n      summary: $summary\n      body: $body\n      status: $status\n      enableCommenting: $enableCommenting\n    ) {\n      ...StoryInfo\n    }\n  }\n  ", "\n"], ["\n  mutation CreateStory(\n    $title: String!\n    $summary: String!\n    $body: String!\n    $status: Float!\n    $enableCommenting: Boolean!\n  ) {\n    createStory(\n      title: $title\n      summary: $summary\n      body: $body\n      status: $status\n      enableCommenting: $enableCommenting\n    ) {\n      ...StoryInfo\n    }\n  }\n  ", "\n"])), StoryInfo_1.StoryInfo);
var useCreateStoryMutation = function () {
    var options = {
        update: function (cache, result) {
            cache.evict({ fieldName: 'stories:{}' });
            cache.gc();
            var meRes = cache.readQuery({ query: useMeQuery_1.meQuery });
            if (!meRes)
                return;
            cache.writeQuery({
                query: useMeQuery_1.meQuery,
                data: {
                    __typename: 'Query',
                    me: __assign(__assign({}, meRes.me), { stories: __spreadArrays(meRes.me.stories, [result.data.createStory]) })
                }
            });
        }
    };
    return client_1.useMutation(exports.createStoryMutation, options);
};
exports.useCreateStoryMutation = useCreateStoryMutation;
var templateObject_1;
//# sourceMappingURL=useCreateStoryMutation.js.map