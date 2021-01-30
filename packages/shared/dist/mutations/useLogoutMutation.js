"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.useLogoutMutation = exports.logoutMutation = void 0;
var client_1 = require("@apollo/client");
var useMeQuery_1 = require("../queries/useMeQuery");
exports.logoutMutation = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation Logout {\n    logout\n  }\n"], ["\n  mutation Logout {\n    logout\n  }\n"])));
var useLogoutMutation = function () {
    var options = {
        update: function (cache) {
            cache.writeQuery({
                query: useMeQuery_1.meQuery,
                data: {
                    __typename: 'Query',
                    me: null
                }
            });
        }
    };
    return client_1.useMutation(exports.logoutMutation, options);
};
exports.useLogoutMutation = useLogoutMutation;
var templateObject_1;
//# sourceMappingURL=useLogoutMutation.js.map