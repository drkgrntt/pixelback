"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
exports.__esModule = true;
exports.useGiveFeedbackMutation = exports.giveFeedbackMutation = void 0;
var client_1 = require("@apollo/client");
exports.giveFeedbackMutation = client_1.gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  mutation GiveFeedback(\n    $type: Float!\n    $firstName: String!\n    $lastName: String!\n    $email: String!\n    $summary: String!\n    $details: String!\n  ) {\n    giveFeedback(\n      type: $type\n      firstName: $firstName\n      lastName: $lastName\n      email: $email\n      summary: $summary\n      details: $details\n    )\n  }\n"], ["\n  mutation GiveFeedback(\n    $type: Float!\n    $firstName: String!\n    $lastName: String!\n    $email: String!\n    $summary: String!\n    $details: String!\n  ) {\n    giveFeedback(\n      type: $type\n      firstName: $firstName\n      lastName: $lastName\n      email: $email\n      summary: $summary\n      details: $details\n    )\n  }\n"])));
var useGiveFeedbackMutation = function () {
    return client_1.useMutation(exports.giveFeedbackMutation);
};
exports.useGiveFeedbackMutation = useGiveFeedbackMutation;
var templateObject_1;
//# sourceMappingURL=useGiveFeedbackMutation.js.map