import ConfigureConnector from './ConfigureConnector';
export default class Connector {
    
    #username = '';
    #type = '';
    #isLogin = false;
    editFn = {
        customer: this.editCustomer,
        product: this.editProduct,
        employee: this.editEmployee
    }
    
    static instance = null;
    
    constructor(name){
        this.name = name
        if( Connector.instance === null){
            Connector.instance = this
        }
    }

    get isLogin(){
        return this.#isLogin
    }

    get type(){
        return this.#type
    }
    
    get username(){
        return this.#username
    }

    toString(){
        return `${this.#username} :: ${this.#type} :: ${this.#isLogin}`
    }
    getInstance(){
        if( Connector.instance === null){
            Connector.instance = this
        }
        return Connector.instance
    }
    
    setUserLogout(){
        this.#username = ''
        this.#type = ''
        this.#isLogin = false
    }

    async setUserLogin(data){
        // console.log(data)
        this.#username = data[ConfigureConnector.keyResponseData][0].username
        this.#type = data[ConfigureConnector.keyResponseData][0].type
        this.#isLogin = true
        // console.log(this.toString())
    }

    async Login(username, password){
        console.log("connect to login")
        let data = {"username": username, "password": password}
        let options = {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Content-Length": Buffer.byteLength(data),
            },
            mode: 'cors',
            body: JSON.stringify(data)
        }
        return await fetch(ConfigureConnector.proxyAnywhereAndUrlUserLogin, options).then(response => {
            if (response.ok){
                response.json().then(data => {
                    this.setUserLogin(data)
                })
            }
            return response.ok
        })
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                          PRODUCT
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    async getProducts(){
        return await fetch(ConfigureConnector.proxyAnywhereAndUrlProducts).then(response => response.json()).then(data => data[ConfigureConnector.keyResponseData])
    }

    async addProduct(data){
        let options = {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Content-Length": Buffer.byteLength(data),
            },
            mode: 'cors',
            body: JSON.stringify(data)
        }
        return await fetch(ConfigureConnector.proxyAnywhereAndUrlProducts, options).then(response => {
            return response.ok
        })
    }


    async editProduct(data){
        let selEditCol = {}
        for(let col in ConfigureConnector.editDataDefaultValue['product']){
            selEditCol[col] = data[col]?data[col]:ConfigureConnector.editDataDefaultValue['product'][col]
        }
        console.log(selEditCol)
        let options = {
            method: 'PUT',
            headers: {
                "Content-Type": 'application/json',
                "Content-Length": Buffer.byteLength(data),
            },
            mode: 'cors',
            body: JSON.stringify(selEditCol)
        }
        return await fetch(ConfigureConnector.proxyAnywhereAndUrlProducts+`${data[ConfigureConnector.productKey]}`, options).then(response => {
            return response.ok
        })
    }

    async deleteProduct(productCode){
        let options = {
            method: 'DELETE'
        }
        return await fetch(ConfigureConnector.proxyAnywhereAndUrlProducts+productCode, options).then(response => {
            return response.ok
        })
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                          CUSTOMER
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async getCustomers(){
        return await fetch(ConfigureConnector.proxyAnywhereAndUrlCustomers).then(response => response.json()).then(data => data[ConfigureConnector.keyResponseData])
    }

    async addCustomer(data){
        let options = {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Content-Length": Buffer.byteLength(data),
            },
            mode: 'cors',
            body: JSON.stringify(data)
        }
        return await fetch(ConfigureConnector.proxyAnywhereAndUrlCustomers, options).then(response => {
            return response.ok
        })
    }

    async editCustomer(data){
        let selEditCol = {}
        for(let col in ConfigureConnector.editDataDefaultValue['customer']){
            selEditCol[col] = data[col]?data[col]:ConfigureConnector.editDataDefaultValue['customer'][col]
        }
        console.log(selEditCol)
        let options = {
            method: 'PUT',
            headers: {
                "Content-Type": 'application/json',
                "Content-Length": Buffer.byteLength(data),
            },
            mode: 'cors',
            body: JSON.stringify(selEditCol)
        }
        return await fetch(ConfigureConnector.proxyAnywhereAndUrlCustomers+`${data[ConfigureConnector.customerKey]}`, options).then(response => {
            return response.ok
        })
    }

    async deleteCustomer(customerNumber){
        let options = {
            method: 'DELETE'
        }
        return await fetch(ConfigureConnector.proxyAnywhereAndUrlCustomers+customerNumber, options).then(response => {
            return response.ok
        })
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                          EMPLOYEE
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async getEmployees(){
        return await fetch(ConfigureConnector.proxyAnywhereAndUrlEmployees).then(response => response.json()).then(data => data[ConfigureConnector.keyResponseData])
    }

    async addEmployee(data){
        let options = {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Content-Length": Buffer.byteLength(data),
            },
            mode: 'cors',
            body: JSON.stringify(data)
        }
        return await fetch(ConfigureConnector.proxyAnywhereAndUrlEmployees, options).then(response => {
            return response.ok
        })
    }

    async deleteEmployee(employeeNumber){
        let options = {
            method: 'DELETE'
        }
        return await fetch(ConfigureConnector.proxyAnywhereAndUrlEmployees+employeeNumber, options).then(response => {
            return response.ok
        })
    }

    async editEmployee(data){
        let selEditCol = {}
        for(let col in ConfigureConnector.editDataDefaultValue['employee']){
            selEditCol[ConfigureConnector.editDataDefaultValue['employee'][col]] = data[col]?data[col]:ConfigureConnector.editDataDefaultValue['employee'][col]
        }
        let options = {
            method: 'PUT',
            headers: {
                "Content-Type": 'application/json',
                "Content-Length": Buffer.byteLength(data),
            },
            mode: 'cors',
            body: JSON.stringify(selEditCol)
        }
        return await fetch(ConfigureConnector.proxyAnywhereAndUrlEmployees+`${data[ConfigureConnector.employeeKey]}`, options).then(response => {
            return response.ok
        })
    }

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    //                                                          BILL
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async addBill(data){
        let cart = data.cart
        let customerNumber = data.cartCustomer.customerNumber
        // let promotion = data.cartPromotion
        console.log(data)
        let options = {
            method: 'POST',
            headers: {
                "Content-Type": 'application/json',
                "Content-Length": Buffer.byteLength({cart: cart, customerNumber: customerNumber}),
            },
            mode: 'cors',
            body: JSON.stringify(data)
        }
        return await fetch(ConfigureConnector.proxyAnywhereAndUrlBill, options).then(response => {
            return response.ok
        })
    }
}