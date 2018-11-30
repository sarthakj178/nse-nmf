import { NmfServiceAccessor } from "../accessors/nmf-service-accessor";
import { Customer } from "../model/customer";
import { GetCustomerDetailsRequest } from "../model/get-customer-details-request";

export class GetCustomerDetailsHandler {
    constructor(
        private nmfServiceAccessor: NmfServiceAccessor
    ) {
    }

    getCustomerDetails(credentials: {userId: string, password: string, brokerCode: string}, customerId: string): Promise<Customer> {
        var getCustomerDetailsReqeust = new GetCustomerDetailsRequest(credentials.userId, credentials.password, credentials.brokerCode, customerId);
        return this.nmfServiceAccessor.getCustomerDetails(getCustomerDetailsReqeust);
    }
}