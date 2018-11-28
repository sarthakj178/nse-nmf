export class GetCustomersRequest {
    userId: string;
    password: string;
    brokerCode: string;

    constructor(
        userId: string,
        password: string,
        brokerCode: string,
    ) {
        this.userId = userId;
        this.password = password;
        this.brokerCode = brokerCode;
    }
}