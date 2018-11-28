export class Customer {
    customerId: string;
    investorName: string;
    fhPanNo?: string;
    taxStatusCode?: string;
    taxStatusDesc?: string;
    holdNCode?: string;
    holdNatureDesc?: string;
    activationStatus?: boolean;
    iinDeactivationReason?: string;
    iinDeactivationDate?: Date;
    createdDate?: Date;
    lastModifiedDate?: Date;
    // <CUSTOMER_ID>5011044482</CUSTOMER_ID>
	// 			<INVESTOR_NAME>Shekhar</INVESTOR_NAME>
	// 			<FH_PAN_NO>AVWPS0518G</FH_PAN_NO>
	// 			<TAX_STATUS_CODE>01</TAX_STATUS_CODE>
	// 			<TAX_STATUS_DESC>Individual</TAX_STATUS_DESC>
	// 			<HOLD_N_CODE>SI</HOLD_N_CODE>
	// 			<HOLD_NATURE_DESC>SINGLE</HOLD_NATURE_DESC>
	// 			<ACTIVATION_STATUS>YES</ACTIVATION_STATUS>
	// 			<IIN_DEACTIVATION_REASON/>
	// 			<IIN_DEACTIVATION_DATE/>
	// 			<CREATED_DATE>27-NOV-2015</CREATED_DATE>
	// 			<LAST_MODIFIED_DATE/>
    // 			<MAPPED_USER_NAME/>

    constructor(
        customerId: string, investorName: string,
    ) {
        this.customerId = customerId;
        this.investorName = investorName;
    }
    
}