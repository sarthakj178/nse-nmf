import { GetCustomersHandler} from './lib/handlers/get-customers-handler';
import { NmfServiceAccessor } from './lib/accessors/nmf-service-accessor';
import { Customer } from './lib/model/customer';

const getCustomersHandler = new GetCustomersHandler(new NmfServiceAccessor());

export function getCustomers(credentials: {userId: string, password: string, brokerCode: string}): Promise<Customer[]> {
    return getCustomersHandler.getCustomers(credentials);
}
