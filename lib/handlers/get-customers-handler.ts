import { NmfServiceAccessor } from "../accessors/nmf-service-accessor";
import { Customer } from "../model/customer";
import { GetCustomersRequest } from "../model/get-customers-request";

export class GetCustomersHandler {
    constructor(
        private nmfServiceAccessor: NmfServiceAccessor
    ) {
    }

    getCustomers(credentials: {userId: string, password: string, brokerCode: string}): Promise<Customer[]> {
        var getCustomersReqeust = new GetCustomersRequest(credentials.userId, credentials.password, credentials.brokerCode);
        return this.nmfServiceAccessor.getCustomers(getCustomersReqeust);
    }
}