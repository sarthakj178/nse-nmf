export class Customer {
    customerId: string;
    investorName: string;
    fhPanNo?: string;
    taxStatusCode?: string;
    taxStatusDesc?: string;
    holdNCode?: string;
    holdNatureDesc?: string;
    activationStatus?: string;
    iinDeactivationReason?: string;
    iinDeactivationDate?: number;
    createdDate?: number;
    lastModifiedDate?: number;

    dateOfBirth?: number;
    kycStatus?: string;
    occupation?: string;
    fathersName?: string;
    mothersName?: string;
    addressLine1?: string;
    addressLine2?: string;
    addressLine3?: string;
    city?: string;
    state?: string;
    pinCode?: string;
    country?: string;
    mobileNo?: string;
    emailAddress?: string;
    bankName?: string;
    accountType?: string;
    ifscCode?: string;
    accountNo?: string;
    branchName?: string;

    nomineeCount?: number;
    nominee1Name?: string;
    nominee1DateOfBirth?: number;
    nominee1Percentage?: number;
    nominee1Relation?: string;
    nominee2Name?: string;
    nominee2DateOfBirth?: number;
    nominee2Percentage?: number;
    nominee2Relation?: string;
    nominee3Name?: string;
    nominee3DateOfBirth?: number;
    nominee3Percentage?: number;
    nominee3Relation?: string;

    guardian?: string;
    guardianPanNo?: string;

    constructor(
        customerId: string, investorName: string,
    ) {
        this.customerId = customerId;
        this.investorName = investorName;
    } 
}