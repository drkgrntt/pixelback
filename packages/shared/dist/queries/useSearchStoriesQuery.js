"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.useSearchStoriesQuery = exports.searchStoriesQuery = void 0;
var client_1 = require("@apollo/client");
var StoryInfo_1 = require("../fragments/StoryInfo");
exports.searchStoriesQuery = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query SearchStories($search: String!, $skip: Float, $take: Float) {\n    searchStories(search: $search, skip: $skip, take: $take) {\n      pageData {\n        hasMore\n        skip\n      }\n      stories {\n        ...StoryInfo\n        author {\n          id\n          penName\n        }\n        chapters {\n          id\n          title\n          number\n        }\n      }\n    }\n  }\n  ", "\n"], ["\n  query SearchStories($search: String!, $skip: Float, $take: Float) {\n    searchStories(search: $search, skip: $skip, take: $take) {\n      pageData {\n        hasMore\n        skip\n      }\n      stories {\n        ...StoryInfo\n        author {\n          id\n          penName\n        }\n        chapters {\n          id\n          title\n          number\n        }\n      }\n    }\n  }\n  ", "\n"])), StoryInfo_1.StoryInfo);
var useSearchStoriesQuery = function (options) {
    return client_1.useQuery(exports.searchStoriesQuery, options);
};
exports.useSearchStoriesQuery = useSearchStoriesQuery;
var templateObject_1;
//# sourceMappingURL=useSearchStoriesQuery.js.map