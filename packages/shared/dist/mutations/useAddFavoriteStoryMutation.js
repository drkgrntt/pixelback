"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.useAddFavoriteStoryMutation = exports.addFavoriteStoryMutation = void 0;
var client_1 = require("@apollo/client");
var UserInfo_1 = require("../fragments/UserInfo");
exports.addFavoriteStoryMutation = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation AddFavoriteStory($storyId: String!) {\n    addFavoriteStory(storyId: $storyId) {\n      ...UserInfo\n    }\n  }\n  ", "\n"], ["\n  mutation AddFavoriteStory($storyId: String!) {\n    addFavoriteStory(storyId: $storyId) {\n      ...UserInfo\n    }\n  }\n  ", "\n"])), UserInfo_1.UserInfo);
var useAddFavoriteStoryMutation = function () {
    return client_1.useMutation(exports.addFavoriteStoryMutation);
};
exports.useAddFavoriteStoryMutation = useAddFavoriteStoryMutation;
var templateObject_1;
//# sourceMappingURL=useAddFavoriteStoryMutation.js.map