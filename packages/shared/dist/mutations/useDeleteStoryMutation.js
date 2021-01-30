"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.useDeleteStoryMutation = exports.deleteStoryMutation = void 0;
var client_1 = require("@apollo/client");
exports.deleteStoryMutation = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation DeleteStory($id: String!) {\n    deleteStory(id: $id)\n  }\n"], ["\n  mutation DeleteStory($id: String!) {\n    deleteStory(id: $id)\n  }\n"])));
var useDeleteStoryMutation = function () {
    var options = {
        update: function (cache, result) {
            var _a;
            cache.evict({ id: "Story:" + ((_a = result.data) === null || _a === void 0 ? void 0 : _a.deleteStory) });
            cache.gc();
        }
    };
    return client_1.useMutation(exports.deleteStoryMutation, options);
};
exports.useDeleteStoryMutation = useDeleteStoryMutation;
var templateObject_1;
//# sourceMappingURL=useDeleteStoryMutation.js.map