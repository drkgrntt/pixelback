"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.useUpdateStoryMutation = exports.updateStoryMutation = void 0;
var client_1 = require("@apollo/client");
var StoryInfo_1 = require("../fragments/StoryInfo");
exports.updateStoryMutation = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation UpdateStory(\n    $id: String!\n    $title: String!\n    $summary: String!\n    $body: String!\n    $status: Float!\n    $enableCommenting: Boolean!\n  ) {\n    updateStory(\n      id: $id\n      title: $title\n      summary: $summary\n      body: $body\n      status: $status\n      enableCommenting: $enableCommenting\n    ) {\n      ...StoryInfo\n    }\n  }\n  ", "\n"], ["\n  mutation UpdateStory(\n    $id: String!\n    $title: String!\n    $summary: String!\n    $body: String!\n    $status: Float!\n    $enableCommenting: Boolean!\n  ) {\n    updateStory(\n      id: $id\n      title: $title\n      summary: $summary\n      body: $body\n      status: $status\n      enableCommenting: $enableCommenting\n    ) {\n      ...StoryInfo\n    }\n  }\n  ", "\n"])), StoryInfo_1.StoryInfo);
var options = {
    update: function (cache) {
        cache.evict({ fieldName: 'stories:{}' });
        cache.gc();
    }
};
var useUpdateStoryMutation = function () {
    return client_1.useMutation(exports.updateStoryMutation, options);
};
exports.useUpdateStoryMutation = useUpdateStoryMutation;
var templateObject_1;
//# sourceMappingURL=useUpdateStoryMutation.js.map