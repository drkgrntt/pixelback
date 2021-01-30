"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.useEditCommentMutation = exports.editCommentMutation = void 0;
var client_1 = require("@apollo/client");
var CommentInfo_1 = require("../fragments/CommentInfo");
exports.editCommentMutation = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation Comment($body: String!, $id: String!) {\n    editComment(body: $body, id: $id) {\n      ...CommentInfo\n    }\n  }\n  ", "\n"], ["\n  mutation Comment($body: String!, $id: String!) {\n    editComment(body: $body, id: $id) {\n      ...CommentInfo\n    }\n  }\n  ", "\n"])), CommentInfo_1.CommentInfo);
var useEditCommentMutation = function () {
    return client_1.useMutation(exports.editCommentMutation);
};
exports.useEditCommentMutation = useEditCommentMutation;
var templateObject_1;
//# sourceMappingURL=useEditCommentMutation.js.map