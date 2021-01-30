"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.useCreateGenreMutation = exports.createGenreMutation = void 0;
var client_1 = require("@apollo/client");
exports.createGenreMutation = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation CreateGenre(\n    $name: String!\n  ) {\n    createGenre(\n      name: $name\n    ) {\n      id\n      name\n    }\n  }\n"], ["\n  mutation CreateGenre(\n    $name: String!\n  ) {\n    createGenre(\n      name: $name\n    ) {\n      id\n      name\n    }\n  }\n"])));
var useCreateGenreMutation = function () {
    return client_1.useMutation(exports.createGenreMutation);
};
exports.useCreateGenreMutation = useCreateGenreMutation;
var templateObject_1;
//# sourceMappingURL=useCreateGenreMutation.js.map