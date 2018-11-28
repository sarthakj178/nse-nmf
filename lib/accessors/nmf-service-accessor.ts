import {Customer} from '../model/customer';
import { GetCustomersRequest } from '../model/get-customers-request';
import { Utils } from '../utils';
import { Constants } from '../constants'

var request = require('request-promise')
var fs = require('fs');
var xml2js = require('xml2js');
var moment = require('moment');

require.extensions['.xml'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

var getCustomersTemplateString = require("../../resources/get-customers-template.xml");
const NMF_SERVICE_URL = "https://www.nsenmf.com/NMFIITrxnService/NMFTrxnService";
const DATE_FORMAT = "DD-MMM-YYYY";

export class NmfServiceAccessor {
    constructor(
    ) {

    }
    getCustomers(getCustomersRequest: GetCustomersRequest): Promise<Customer[]> {
        var GET_CUSTOMERS_PATH = "/ALLIINDETAILS";
        console.log(Utils.replace(getCustomersTemplateString, JSON.parse(JSON.stringify(getCustomersRequest))));
        var options = {
            body: Utils.replace(getCustomersTemplateString, JSON.parse(JSON.stringify(getCustomersRequest))),
            headers: {
                'Content-Type': 'application/xml',
            }
        };
         
        return request.post(NMF_SERVICE_URL + GET_CUSTOMERS_PATH, options).then((res: any) => {
            return new Promise(function(resolve, reject) {
                xml2js.parseString(res, function(err: any, result: any) {
                    var customers: Customer[] = [];
                    result = result['DataSet']['diffgr:diffgram'][0]['NMFIISERVICES'][0]['service_response']
                    result.forEach((item: any) => {
                        var customer = new Customer(item[Constants.CUSTOMER_ID][0], item[Constants.INVESTOR_NAME][0]);
                        customer.fhPanNo = item[Constants.FH_PAN_NO][0];
                        customer.taxStatusCode = item[Constants.TAX_STATUS_CODE][0];
                        customer.taxStatusDesc = item[Constants.TAX_STATUS_DESC][0];
                        customer.holdNCode = item[Constants.HOLD_N_CODE][0];
                        customer.holdNatureDesc = item[Constants.HOLD_NATURE_DESC][0];
                        customer.activationStatus = item[Constants.ACTIVATION_STATUS][0] == 'YES' ? true: false;
                        customer.iinDeactivationReason = item[Constants.IIN_DEACTIVATION_REASON][0];
                        customer.iinDeactivationDate = item[Constants.IIN_DEACTIVATION_DATE][0];
                        customer.createdDate = item[Constants.CREATED_DATE][0] ? moment(item[Constants.CREATED_DATE][0], DATE_FORMAT).valueOf() : null;
                        customer.lastModifiedDate = item[Constants.LAST_MODIFIED_DATE][0] ? moment(item[Constants.LAST_MODIFIED_DATE][0], DATE_FORMAT).valueOf() : null;
                        customers.push(customer);
                    })
                    resolve(customers);
                });
            });
        }, () => {});
    }
}