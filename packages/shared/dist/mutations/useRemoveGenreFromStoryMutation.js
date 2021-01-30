"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.useRemoveGenreFromStoryMutation = exports.removeGenreFromStoryMutation = void 0;
var client_1 = require("@apollo/client");
var StoryInfo_1 = require("../fragments/StoryInfo");
exports.removeGenreFromStoryMutation = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation RemoveGenreFromStory(\n    $genreId: String!\n    $storyId: String!\n  ) {\n    removeGenreFromStory(genreId: $genreId, storyId: $storyId) {\n      ...StoryInfo\n      chapters {\n        id\n        title\n        number\n      }\n    }\n  }\n  ", "\n"], ["\n  mutation RemoveGenreFromStory(\n    $genreId: String!\n    $storyId: String!\n  ) {\n    removeGenreFromStory(genreId: $genreId, storyId: $storyId) {\n      ...StoryInfo\n      chapters {\n        id\n        title\n        number\n      }\n    }\n  }\n  ", "\n"])), StoryInfo_1.StoryInfo);
var useRemoveGenreFromStoryMutation = function () {
    return client_1.useMutation(exports.removeGenreFromStoryMutation);
};
exports.useRemoveGenreFromStoryMutation = useRemoveGenreFromStoryMutation;
var templateObject_1;
//# sourceMappingURL=useRemoveGenreFromStoryMutation.js.map