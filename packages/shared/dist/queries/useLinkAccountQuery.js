"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.useLinkAccountQuery = exports.linkAccountQuery = void 0;
var client_1 = require("@apollo/client");
exports.linkAccountQuery = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query LinkAccount {\n    linkAccount\n  }\n"], ["\n  query LinkAccount {\n    linkAccount\n  }\n"])));
var useLinkAccountQuery = function (options) {
    if (options === void 0) { options = {}; }
    return client_1.useQuery(exports.linkAccountQuery, options);
};
exports.useLinkAccountQuery = useLinkAccountQuery;
var templateObject_1;
//# sourceMappingURL=useLinkAccountQuery.js.map