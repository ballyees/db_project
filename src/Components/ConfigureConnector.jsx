export default class ConfigureConnector {

    static keyTokenHeader = "tokenAuthenticate"
    static keyResponseData = "responseData"
    static keyRequestHeaderLogoutType = "type"

    static urlUserLogin = "http://127.0.0.1:8000/v1/api/user/login/"
    static urlProducts = "http://127.0.0.1:8000/v1/api/store/product/"
    static urlCustomers = "http://127.0.0.1:8000/v1/api/store/customer/"
    static urlEmployees = "http://127.0.0.1:8000/v1/api/store/employee/"
    static urlBill = "http://127.0.0.1:8000/v1/api/store/bill/"
    static urlProductsStock = "http://127.0.0.1:8000/v1/api/store/stock/"
    
    static proxyHost = "http://127.0.0.1:8000/"
    static proxyAnywhereLocal = "http://127.0.0.1:8080/"
    static proxyAnywhere = "http://cors-anywhere.herokuapp.com/"

    static proxyAnywhereAndUrlUserLogin = ConfigureConnector.proxyAnywhereLocal + ConfigureConnector.urlUserLogin
    static proxyAnywhereAndUrlProducts = ConfigureConnector.proxyAnywhereLocal + ConfigureConnector.urlProducts
    static proxyAnywhereAndUrlProductsStock = ConfigureConnector.proxyAnywhereLocal + ConfigureConnector.urlProductsStock
    static proxyAnywhereAndUrlCustomers = ConfigureConnector.proxyAnywhereLocal + ConfigureConnector.urlCustomers
    static proxyAnywhereAndUrlEmployees = ConfigureConnector.proxyAnywhereLocal + ConfigureConnector.urlEmployees
    static proxyAnywhereAndUrlBill = ConfigureConnector.proxyAnywhereLocal + ConfigureConnector.urlBill

    static customerKey = "customerNumber"
    static productKey = "productCode"
    static employeeKey = "employeeNumber"
    static billKey = "orderNumber"
    static selEditColCustomer = ["customerNumber", "customerName", "contactLastName", "contactFirstName", "phone", "addressLine1", "addressLine2", "city", "state", "postalCode", "country", "salesRepEmployeeNumber", "creditLimit"]
    static selEditColProduct = ["productCode", "productName", "productLine", "productScale", "productVendor", "productDescription", "quantityInStock", "buyPrice", "MSRP"]
    static selEditColEmployee = ["employeeNumber", "lastName", "firstName", "extension", "email", "officeCode", "reportsTo", "jobTitle"]
    static selEditCol = {customer: ConfigureConnector.selColCustomer, product: ConfigureConnector.selColProduct, employee: ConfigureConnector.selColEmployee}
    static editDataDefaultValue = {
            "customer": {
                    customerNumber: 0, customerName: "",
                    contactLastName: "", contactFirstName: "",
                    phone: "", addressLine1: "", addressLine2: "", city: "",
                    state: "", postalCode: "", country: "", salesRepEmployeeNumber: 0, creditLimit: 0
                },
            "product": {
                productCode: "", productName: "", productLine: "", productScale: 1,
                productVendor: "", productDescription: "", quantityInStock: 0, buyPrice: 0, MSRP: 0
                },
            // "promotion":
            //     let date = new Date()
            //     let formatDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
            //      {
            //         is1get1: false,
            //         startDate: formatDate,
            //         endDate: formatDate
            //         // promoCode, startDate, endDate, discount, description, is1get1
            //     },
            "employee": {
                employeeNumber: 0, lastName: "", firstName: "", extension: "",
                email: "", officeCode: 0, reportsTo: 0, jobTitle: ""
                },
            }
}