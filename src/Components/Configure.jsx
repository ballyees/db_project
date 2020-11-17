export default class Configure {

    static jobTitle = ["President", "VP Marketing", "VP Sales", "Sales Manager (APAC)", "Sales Manager (EMEA)", "Sales Manager (NA)", "Sales Rep"]
    static requireColCustomer = [ 
        "customerName", "contactLastName",
        "contactFirstName", "phone", "addressLine1", "city", "country"
    ]
    static requireColEmployee = [
        "employeeNumber", "lastName", "firstName",
        "extension", "email", "officeCode", "reportsTo", "jobTitle"
    ]
    static requireColProduct = ["productName", "productLine", "productScale", "productVendor", "productDescription"]
    
    static getProductLines(){
        return ["Classic Cars", "Motorcycles", "Planes", "Ships", "Trains", "Trucks and Buses", "Vintage Cars"]
    }
    
    static addData(type){
        //validate data: customer, product, employee
        switch(type){
            case "customer":
                return {
                    "state": '',
                    "postalCode": '',
                    "addressLine2": '',
                    "creditLimit": 0,
                    "salesRepEmployeeNumber": window.$Connector.username
                }
            case "product":
                return {
                    "quantityInStock": 0,
                    "buyPrice": 0,
                    "MSRP":0,
                    "productScale": 1
                }
            case "promotion":
                let date = new Date()
                let formatDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
                return {
                    is1get1: false,
                    startDate: formatDate,
                    endDate: formatDate
                    // promoCode, startDate, endDate, discount, description, is1get1
                }
            case "employee":
                return {

                }
            default:
                return {

                }
        }
    }
    static userPermission = {
        "President": 4,
        "VP Marketing": 3,
        "VP Sales": 3,
        "Sales Manager (APAC)": 2,
        "Sales Manager (EMEA)": 2,
        "Sales Manager (NA)": 2,
        "Sales Rep": 1
    }

}