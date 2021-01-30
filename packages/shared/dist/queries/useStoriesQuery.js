"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.useStoriesQuery = exports.storiesQuery = void 0;
var client_1 = require("@apollo/client");
var StoryInfo_1 = require("../fragments/StoryInfo");
exports.storiesQuery = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query Stories($skip: Float, $take: Float, $newest: Boolean) {\n    stories(skip: $skip, take: $take, newest: $newest) {\n      pageData {\n        hasMore\n        skip\n      }\n      stories {\n        ...StoryInfo\n        author {\n          id\n          penName\n        }\n        chapters {\n          id\n          title\n          number\n        }\n      }\n    }\n  }\n  ", "\n"], ["\n  query Stories($skip: Float, $take: Float, $newest: Boolean) {\n    stories(skip: $skip, take: $take, newest: $newest) {\n      pageData {\n        hasMore\n        skip\n      }\n      stories {\n        ...StoryInfo\n        author {\n          id\n          penName\n        }\n        chapters {\n          id\n          title\n          number\n        }\n      }\n    }\n  }\n  ", "\n"])), StoryInfo_1.StoryInfo);
var useStoriesQuery = function (options) {
    return client_1.useQuery(exports.storiesQuery, options);
};
exports.useStoriesQuery = useStoriesQuery;
var templateObject_1;
//# sourceMappingURL=useStoriesQuery.js.map