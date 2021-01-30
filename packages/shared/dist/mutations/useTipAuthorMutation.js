"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.useTipAuthorMutation = exports.tipAuthorMutation = void 0;
var client_1 = require("@apollo/client");
exports.tipAuthorMutation = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation TipAuthor(\n    $authorId: String!\n    $sourceId: String!\n    $amount: Float!\n  ) {\n    tipAuthor(\n      authorId: $authorId\n      sourceId: $sourceId\n      amount: $amount\n    )\n  }\n"], ["\n  mutation TipAuthor(\n    $authorId: String!\n    $sourceId: String!\n    $amount: Float!\n  ) {\n    tipAuthor(\n      authorId: $authorId\n      sourceId: $sourceId\n      amount: $amount\n    )\n  }\n"])));
var useTipAuthorMutation = function () {
    return client_1.useMutation(exports.tipAuthorMutation);
};
exports.useTipAuthorMutation = useTipAuthorMutation;
var templateObject_1;
//# sourceMappingURL=useTipAuthorMutation.js.map