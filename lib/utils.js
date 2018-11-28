"use strict";
exports.__esModule = true;
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.replace = function (inputStr, parameters) {
        var outputStr = inputStr;
        for (var key in parameters) {
            outputStr = outputStr.replace("{" + key + "}", parameters[key]);
        }
        return outputStr;
    };
    return Utils;
}());
exports.Utils = Utils;
