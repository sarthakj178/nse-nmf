export class GetCustomerDetailsRequest {
    userId: string;
    password: string;
    brokerCode: string;
    customerId: string;

    constructor(
        userId: string,
        password: string,
        brokerCode: string,
        customerId: string,
    ) {
        this.userId = userId;
        this.password = password;
        this.brokerCode = brokerCode;
        this.customerId = customerId;
    }
}