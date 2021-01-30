"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.useRemoveFavoriteStoryMutation = exports.removeFavoriteStoryMutation = void 0;
var client_1 = require("@apollo/client");
var UserInfo_1 = require("../fragments/UserInfo");
exports.removeFavoriteStoryMutation = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation RemoveFavoriteStory($storyId: String!) {\n    removeFavoriteStory(storyId: $storyId) {\n      ...UserInfo\n    }\n  }\n  ", "\n"], ["\n  mutation RemoveFavoriteStory($storyId: String!) {\n    removeFavoriteStory(storyId: $storyId) {\n      ...UserInfo\n    }\n  }\n  ", "\n"])), UserInfo_1.UserInfo);
var useRemoveFavoriteStoryMutation = function () {
    return client_1.useMutation(exports.removeFavoriteStoryMutation);
};
exports.useRemoveFavoriteStoryMutation = useRemoveFavoriteStoryMutation;
var templateObject_1;
//# sourceMappingURL=useRemoveFavoriteStoryMutation.js.map