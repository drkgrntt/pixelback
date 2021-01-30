"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.useRemovePaymentMethodMutation = exports.removePaymeneMethodMutation = void 0;
var client_1 = require("@apollo/client");
exports.removePaymeneMethodMutation = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation RemovePaymentMethod($sourceId: String!) {\n    removePaymentMethod(sourceId: $sourceId)\n  }\n"], ["\n  mutation RemovePaymentMethod($sourceId: String!) {\n    removePaymentMethod(sourceId: $sourceId)\n  }\n"])));
var useRemovePaymentMethodMutation = function () {
    var options = {
        update: function (cache, result) {
            var _a;
            cache.evict({
                id: "StripeSource:" + ((_a = result.data) === null || _a === void 0 ? void 0 : _a.removePaymentMethod)
            });
            cache.gc();
        }
    };
    return client_1.useMutation(exports.removePaymeneMethodMutation, options);
};
exports.useRemovePaymentMethodMutation = useRemovePaymentMethodMutation;
var templateObject_1;
//# sourceMappingURL=useRemovePaymentMethodMutation.js.map