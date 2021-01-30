"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.useStoryQuery = exports.storyQuery = void 0;
var client_1 = require("@apollo/client");
var StoryInfo_1 = require("../fragments/StoryInfo");
exports.storyQuery = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query Story($id: String!) {\n    story(id: $id) {\n      ...StoryInfo\n      chapters {\n        id\n        title\n        number\n      }\n    }\n  }\n  ", "\n"], ["\n  query Story($id: String!) {\n    story(id: $id) {\n      ...StoryInfo\n      chapters {\n        id\n        title\n        number\n      }\n    }\n  }\n  ", "\n"])), StoryInfo_1.StoryInfo);
var useStoryQuery = function (options) {
    return client_1.useQuery(exports.storyQuery, options);
};
exports.useStoryQuery = useStoryQuery;
var templateObject_1;
//# sourceMappingURL=useStoryQuery.js.map