# nse-nmf
Utility functions to interact with NSE NMF XML-based APIs, https://www.nsenmf.com/

# Installation
```npm install --save nse-nmf```

# Usage

``` const nse = require('nse-nmf'); ```

## GetCustomers
```
nse.getCustomers({
  userId: "MFS*****", 
  password: "****", 
  brokerCode: "ARN-*****"
}).then((customers) => {
        console.log(customers.map((customer) => {
          return {
            customerId: customer.customerId,
            investorName: customer.investorName
          }
        });
});
```

## GetCustomerDetails
```
nse.getCustomerDetails({
  userId: "MFS*****", 
  password: "****", 
  brokerCode: "ARN-*****"
}, "123412341234").then((customer) => {
    console.log(customer.customerId, customer.investorName, customer.dateOfBirth, customer.emailAddress, customer.mobileNo);
})
```
