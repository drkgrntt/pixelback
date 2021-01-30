"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.useAddGenreToStoryMutation = exports.addGenreToStoryMutation = void 0;
var client_1 = require("@apollo/client");
var StoryInfo_1 = require("../fragments/StoryInfo");
exports.addGenreToStoryMutation = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation AddGenreToStory($genreId: String!, $storyId: String!) {\n    addGenreToStory(genreId: $genreId, storyId: $storyId) {\n      ...StoryInfo\n      chapters {\n        id\n        title\n        number\n      }\n    }\n  }\n  ", "\n"], ["\n  mutation AddGenreToStory($genreId: String!, $storyId: String!) {\n    addGenreToStory(genreId: $genreId, storyId: $storyId) {\n      ...StoryInfo\n      chapters {\n        id\n        title\n        number\n      }\n    }\n  }\n  ", "\n"])), StoryInfo_1.StoryInfo);
var useAddGenreToStoryMutation = function () {
    return client_1.useMutation(exports.addGenreToStoryMutation);
};
exports.useAddGenreToStoryMutation = useAddGenreToStoryMutation;
var templateObject_1;
//# sourceMappingURL=useAddGenreToStoryMutation.js.map