"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.useDeleteCommentMutation = exports.deleteCommentMutation = void 0;
var client_1 = require("@apollo/client");
exports.deleteCommentMutation = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation DeleteComment($id: String!) {\n    deleteComment(id: $id)\n  }\n"], ["\n  mutation DeleteComment($id: String!) {\n    deleteComment(id: $id)\n  }\n"])));
var useDeleteCommentMutation = function () {
    var options = {
        update: function (cache, result) {
            var _a;
            cache.evict({ id: "Comment:" + ((_a = result.data) === null || _a === void 0 ? void 0 : _a.deleteComment) });
            cache.gc();
        }
    };
    return client_1.useMutation(exports.deleteCommentMutation, options);
};
exports.useDeleteCommentMutation = useDeleteCommentMutation;
var templateObject_1;
//# sourceMappingURL=useDeleteCommentMutation.js.map