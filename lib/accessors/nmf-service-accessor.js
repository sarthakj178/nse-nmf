"use strict";
exports.__esModule = true;
var customer_1 = require("../model/customer");
var utils_1 = require("../utils");
var constants_1 = require("../constants");
var request = require('request-promise');
var fs = require('fs');
var xml2js = require('xml2js');
var moment = require('moment');
require.extensions['.xml'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};
var getCustomersTemplateString = require("../resources/get-customers-template.xml");
var NMF_SERVICE_URL = "https://www.nsenmf.com/NMFIITrxnService/NMFTrxnService";
var DATE_FORMAT = "DD-MMM-YYYY";
var NmfServiceAccessor = /** @class */ (function () {
    function NmfServiceAccessor() {
    }
    NmfServiceAccessor.prototype.getCustomers = function (getCustomersRequest) {
        var GET_CUSTOMERS_PATH = "/ALLIINDETAILS";
        console.log(utils_1.Utils.replace(getCustomersTemplateString, JSON.parse(JSON.stringify(getCustomersRequest))));
        var options = {
            body: utils_1.Utils.replace(getCustomersTemplateString, JSON.parse(JSON.stringify(getCustomersRequest))),
            headers: {
                'Content-Type': 'application/xml'
            }
        };
        return request.post(NMF_SERVICE_URL + GET_CUSTOMERS_PATH, options).then(function (res) {
            return new Promise(function (resolve, reject) {
                xml2js.parseString(res, function (err, result) {
                    var customers = [];
                    result = result['DataSet']['diffgr:diffgram'][0]['NMFIISERVICES'][0]['service_response'];
                    result.forEach(function (item) {
                        var customer = new customer_1.Customer(item[constants_1.Constants.CUSTOMER_ID][0], item[constants_1.Constants.INVESTOR_NAME][0]);
                        customer.fhPanNo = item[constants_1.Constants.FH_PAN_NO][0];
                        customer.taxStatusCode = item[constants_1.Constants.TAX_STATUS_CODE][0];
                        customer.taxStatusDesc = item[constants_1.Constants.TAX_STATUS_DESC][0];
                        customer.holdNCode = item[constants_1.Constants.HOLD_N_CODE][0];
                        customer.holdNatureDesc = item[constants_1.Constants.HOLD_NATURE_DESC][0];
                        customer.activationStatus = item[constants_1.Constants.ACTIVATION_STATUS][0] == 'YES' ? true : false;
                        customer.iinDeactivationReason = item[constants_1.Constants.IIN_DEACTIVATION_REASON][0];
                        customer.iinDeactivationDate = item[constants_1.Constants.IIN_DEACTIVATION_DATE][0];
                        customer.createdDate = item[constants_1.Constants.CREATED_DATE][0] ? moment(item[constants_1.Constants.CREATED_DATE][0], DATE_FORMAT).valueOf() : null;
                        customer.lastModifiedDate = item[constants_1.Constants.LAST_MODIFIED_DATE][0] ? moment(item[constants_1.Constants.LAST_MODIFIED_DATE][0], DATE_FORMAT).valueOf() : null;
                        customers.push(customer);
                    });
                    resolve(customers);
                });
            });
        }, function () { });
    };
    return NmfServiceAccessor;
}());
exports.NmfServiceAccessor = NmfServiceAccessor;
