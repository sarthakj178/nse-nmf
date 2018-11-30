import {Customer} from '../model/customer';
import { GetCustomersRequest } from '../model/get-customers-request';
import { Utils } from '../utils';
import { Constants } from '../constants'
import { GetCustomerDetailsRequest } from '../model/get-customer-details-request';

var request = require('request-promise')
var fs = require('fs');
var xml2js = require('xml2js');
var moment = require('moment');

require.extensions['.xml'] = function (module, filename) {
    module.exports = fs.readFileSync(filename, 'utf8');
};

const GET_CUSTOMERS_TEMPLATE_STRING = require("../../resources/get-customers-template.xml");
const GET_CUSTOMER_DETAILS_TEMPLATE_STRING = require("../../resources/get-customer-details-template.xml");
const NMF_SERVICE_URL = "https://www.nsenmf.com/NMFIITrxnService/NMFTrxnService";
const DATE_FORMAT = "DD-MMM-YYYY";

export class NmfServiceAccessor {
    constructor(
    ) {

    }
    getCustomers(getCustomersRequest: GetCustomersRequest): Promise<Customer[]> {
        var GET_CUSTOMERS_PATH = "/ALLIINDETAILS";
        console.log(Utils.replace(GET_CUSTOMERS_TEMPLATE_STRING, JSON.parse(JSON.stringify(getCustomersRequest))));
        var options = {
            body: Utils.replace(GET_CUSTOMERS_TEMPLATE_STRING, JSON.parse(JSON.stringify(getCustomersRequest))),
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
                        customer.activationStatus = item[Constants.ACTIVATION_STATUS][0];
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

    getCustomerDetails(getCustomerDetailsRequest: GetCustomerDetailsRequest): Promise<Customer> {
        var GET_CUSTOMER_DETAILS_PATH = "/IINDETAILS";
        console.log(Utils.replace(GET_CUSTOMER_DETAILS_TEMPLATE_STRING, JSON.parse(JSON.stringify(getCustomerDetailsRequest))));
        var options = {
            body: Utils.replace(GET_CUSTOMER_DETAILS_TEMPLATE_STRING, JSON.parse(JSON.stringify(getCustomerDetailsRequest))),
            headers: {
                'Content-Type': 'application/xml',
            }
        };
         
        return request.post(NMF_SERVICE_URL + GET_CUSTOMER_DETAILS_PATH, options).then((res: any) => {
            return new Promise(function(resolve, reject) {
                xml2js.parseString(res, function(err: any, result: any) {
                    // console.log(result['DataSet']['diffgr:diffgram'][0]['NMFIISERVICES'][0]['service_response']);
                    var item = result['DataSet']['diffgr:diffgram'][0]['NMFIISERVICES'][0]['service_response'][0];
                    var customer = new Customer(item[Constants.CUSTOMER_ID][0], item[Constants.INVESTOR_NAME][0]);
                    customer.fhPanNo = item[Constants.FH_PAN_NO][0];
                    customer.taxStatusCode = item[Constants.TAX_STATUS_CODE][0];
                    customer.taxStatusDesc = item[Constants.TAX_STATUS_DESC][0];
                    customer.holdNCode = item[Constants.HOLD_N_CODE][0];
                    customer.holdNatureDesc = item[Constants.HOLD_NATURE_DESC][0];
                    customer.activationStatus = item[Constants.ACTIVATION_STATUS][0];
                    customer.iinDeactivationReason = item[Constants.IIN_DEACTIVATION_REASON][0];
                    customer.iinDeactivationDate = item[Constants.IIN_DEACTIVATION_DATE][0];
                    customer.createdDate = item[Constants.CREATED_DATE][0] ? moment(item[Constants.CREATED_DATE][0], DATE_FORMAT).valueOf() : null;
                    customer.lastModifiedDate = item[Constants.LAST_MODIFIED_DATE][0] ? moment(item[Constants.LAST_MODIFIED_DATE][0], DATE_FORMAT).valueOf() : null;

                    customer.dateOfBirth  = item[Constants.DATE_OF_BIRTH][0] ? moment(item[Constants.DATE_OF_BIRTH][0], DATE_FORMAT).valueOf() : null;
                    customer.kycStatus  = item[Constants.KYC_STATUS][0];
                    customer.occupation  = item[Constants.OCCUPATION_DESC][0];
                    customer.fathersName  = item[Constants.FATHER_NAME][0];
                    customer.mothersName  = item[Constants.MOTHER_NAME][0];
                    customer.addressLine1  = item[Constants.ADDRESS1][0];
                    customer.addressLine2  = item[Constants.ADDRESS2][0];
                    customer.addressLine3  = item[Constants.ADDRESS3][0];
                    customer.city  = item[Constants.CITY][0];
                    customer.state  = item[Constants.STATE_NAME][0];
                    customer.pinCode  = item[Constants.PINCODE][0];
                    customer.country  = item[Constants.COUNTRY_NAME][0];
                    customer.mobileNo  = item[Constants.MOBILE_NO][0];
                    customer.emailAddress  = item[Constants.EMAIL][0];
                    customer.bankName  = item[Constants.BANK_NAME][0];
                    customer.accountType  = item[Constants.AC_TYPE][0];
                    customer.ifscCode  = item[Constants.IFSC_CODE][0];
                    customer.accountNo  = item[Constants.AC_NO][0];
                    customer.branchName  = item[Constants.BRANCH_NAME][0];
                    customer.nomineeCount  = item[Constants.NOMINEE_COUNT][0] ? Number(item[Constants.NOMINEE_COUNT][0]) : null;
                    customer.nominee1Name  = item[Constants.NOM1_NAME][0];
                    customer.nominee1DateOfBirth  = item[Constants.NOM1_DATE_OF_BIRTH][0] ? moment(item[Constants.NOM1_DATE_OF_BIRTH][0], DATE_FORMAT).valueOf() : null;
                    customer.nominee1Percentage  = item[Constants.NOM1_PERCENTAGE][0] ? Number(item[Constants.NOM1_PERCENTAGE][0]) : null;
                    customer.nominee1Relation  = item[Constants.NOM1_RELATION][0];
                    customer.nominee2Name  = item[Constants.NOM2_NAME][0];
                    customer.nominee2DateOfBirth  = item[Constants.NOM2_DATE_OF_BIRTH][0] ? moment(item[Constants.NOM2_DATE_OF_BIRTH][0], DATE_FORMAT).valueOf() : null;
                    customer.nominee2Percentage  = item[Constants.NOM2_PERCENTAGE][0] ? Number(item[Constants.NOM2_PERCENTAGE][0]) : null;
                    customer.nominee2Relation  = item[Constants.NOM2_RELATION][0];
                    customer.nominee3Name  = item[Constants.NOM3_NAME][0];
                    customer.nominee3DateOfBirth  = item[Constants.NOM3_DATE_OF_BIRTH][0] ? moment(item[Constants.NOM3_DATE_OF_BIRTH][0], DATE_FORMAT).valueOf() : null;
                    customer.nominee3Percentage  = item[Constants.NOM3_PERCENTAGE][0] ? Number(item[Constants.NOM3_PERCENTAGE][0]) : null;
                    customer.nominee3Relation  = item[Constants.NOM3_RELATION][0];
                    customer.guardian  = item[Constants.GUARDIAN][0];
                    customer.guardianPanNo  = item[Constants.GUARDIAN_PAN_NO][0];
                    resolve(customer);
                });
            });
        }, () => {});
    }
}