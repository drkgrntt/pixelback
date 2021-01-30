"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.useGenresQuery = exports.genresQuery = void 0;
var client_1 = require("@apollo/client");
exports.genresQuery = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query Genres($search: String!) {\n    genres(search: $search) {\n      id\n      name\n    }\n  }\n"], ["\n  query Genres($search: String!) {\n    genres(search: $search) {\n      id\n      name\n    }\n  }\n"])));
var useGenresQuery = function (options) {
    return client_1.useQuery(exports.genresQuery, options);
};
exports.useGenresQuery = useGenresQuery;
var templateObject_1;
//# sourceMappingURL=useGenresQuery.js.map