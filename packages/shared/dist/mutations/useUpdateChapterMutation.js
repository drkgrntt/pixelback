"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.useUpdateChapterMutation = exports.updateChapterMutation = void 0;
var client_1 = require("@apollo/client");
var ChapterInfo_1 = require("../fragments/ChapterInfo");
exports.updateChapterMutation = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation UpdateChapter(\n    $id: String!\n    $number: Float!\n    $title: String!\n    $summary: String!\n    $body: String!\n    $status: Float!\n    $enableCommenting: Boolean!\n  ) {\n    updateChapter(\n      id: $id\n      number: $number\n      title: $title\n      summary: $summary\n      body: $body\n      status: $status\n      enableCommenting: $enableCommenting\n    ) {\n      ...ChapterInfo\n    }\n  }\n  ", "\n"], ["\n  mutation UpdateChapter(\n    $id: String!\n    $number: Float!\n    $title: String!\n    $summary: String!\n    $body: String!\n    $status: Float!\n    $enableCommenting: Boolean!\n  ) {\n    updateChapter(\n      id: $id\n      number: $number\n      title: $title\n      summary: $summary\n      body: $body\n      status: $status\n      enableCommenting: $enableCommenting\n    ) {\n      ...ChapterInfo\n    }\n  }\n  ", "\n"])), ChapterInfo_1.ChapterInfo);
var useUpdateChapterMutation = function () {
    return client_1.useMutation(exports.updateChapterMutation);
};
exports.useUpdateChapterMutation = useUpdateChapterMutation;
var templateObject_1;
//# sourceMappingURL=useUpdateChapterMutation.js.map