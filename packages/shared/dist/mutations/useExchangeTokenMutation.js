"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.useExchangeTokenMutation = exports.exchangeTokenMutation = void 0;
var client_1 = require("@apollo/client");
exports.exchangeTokenMutation = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation ExchangeToken($token: String) {\n    exchangeToken(token: $token) {\n      value\n    }\n  }\n"], ["\n  mutation ExchangeToken($token: String) {\n    exchangeToken(token: $token) {\n      value\n    }\n  }\n"])));
var useExchangeTokenMutation = function () {
    return client_1.useMutation(exports.exchangeTokenMutation);
};
exports.useExchangeTokenMutation = useExchangeTokenMutation;
var templateObject_1;
//# sourceMappingURL=useExchangeTokenMutation.js.map