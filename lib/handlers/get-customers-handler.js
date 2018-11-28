"use strict";
exports.__esModule = true;
var get_customers_request_1 = require("../model/get-customers-request");
var GetCustomersHandler = /** @class */ (function () {
    function GetCustomersHandler(nmfServiceAccessor) {
        this.nmfServiceAccessor = nmfServiceAccessor;
    }
    GetCustomersHandler.prototype.getCustomers = function (credentials) {
        var getCustomersReqeust = new get_customers_request_1.GetCustomersRequest(credentials.userId, credentials.password, credentials.brokerCode);
        return this.nmfServiceAccessor.getCustomers(getCustomersReqeust);
    };
    return GetCustomersHandler;
}());
exports.GetCustomersHandler = GetCustomersHandler;
