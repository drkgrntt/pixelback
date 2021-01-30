"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.useReadMutation = exports.readMutation = void 0;
var client_1 = require("@apollo/client");
exports.readMutation = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation Read(\n    $storyId: String!\n    $chapterId: String\n  ) {\n    read(\n      storyId: $storyId\n      chapterId: $chapterId\n    ) {\n      id\n    }\n  }\n"], ["\n  mutation Read(\n    $storyId: String!\n    $chapterId: String\n  ) {\n    read(\n      storyId: $storyId\n      chapterId: $chapterId\n    ) {\n      id\n    }\n  }\n"])));
var useReadMutation = function () {
    return client_1.useMutation(exports.readMutation);
};
exports.useReadMutation = useReadMutation;
var templateObject_1;
//# sourceMappingURL=useReadMutation.js.map