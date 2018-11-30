import { GetCustomersHandler} from './lib/handlers/get-customers-handler';
import { GetCustomerDetailsHandler} from './lib/handlers/get-customer-details-handler';
import { NmfServiceAccessor } from './lib/accessors/nmf-service-accessor';
import { Customer } from './lib/model/customer';

const nmfServiceAccessor = new NmfServiceAccessor();
const getCustomersHandler = new GetCustomersHandler(nmfServiceAccessor);
const getCustomerDetailsHandler = new GetCustomerDetailsHandler(nmfServiceAccessor);

export function getCustomers(credentials: {userId: string, password: string, brokerCode: string}): Promise<Customer[]> {
    return getCustomersHandler.getCustomers(credentials);
}

export function getCustomerDetails(credentials: {userId: string, password: string, brokerCode: string}, customerId: string): Promise<Customer> {
    return getCustomerDetailsHandler.getCustomerDetails(credentials, customerId);
}
