"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.useDeleteChapterMutation = exports.deleteChapterMutation = void 0;
var client_1 = require("@apollo/client");
exports.deleteChapterMutation = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation DeleteChapter($id: String!) {\n    deleteChapter(id: $id)\n  }\n"], ["\n  mutation DeleteChapter($id: String!) {\n    deleteChapter(id: $id)\n  }\n"])));
var useDeleteChapterMutation = function () {
    var options = {
        update: function (cache, result) {
            var _a;
            cache.evict({ id: "Chapter:" + ((_a = result.data) === null || _a === void 0 ? void 0 : _a.deleteChapter) });
            cache.gc();
        }
    };
    return client_1.useMutation(exports.deleteChapterMutation, options);
};
exports.useDeleteChapterMutation = useDeleteChapterMutation;
var templateObject_1;
//# sourceMappingURL=useDeleteChapterMutation.js.map