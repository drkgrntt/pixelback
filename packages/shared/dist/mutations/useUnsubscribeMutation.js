"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.useUnsubscribeMutation = exports.unsubscribeMutation = void 0;
var client_1 = require("@apollo/client");
exports.unsubscribeMutation = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation Unsubscribe($id: String!) {\n    unsubscribe(id: $id)\n  }\n"], ["\n  mutation Unsubscribe($id: String!) {\n    unsubscribe(id: $id)\n  }\n"])));
var useUnsubscribeMutation = function () {
    var options = {
        update: function (cache, result) {
            var _a;
            cache.evict({ id: "Subscription:" + ((_a = result.data) === null || _a === void 0 ? void 0 : _a.unsubscribe) });
            cache.gc();
        }
    };
    return client_1.useMutation(exports.unsubscribeMutation, options);
};
exports.useUnsubscribeMutation = useUnsubscribeMutation;
var templateObject_1;
//# sourceMappingURL=useUnsubscribeMutation.js.map