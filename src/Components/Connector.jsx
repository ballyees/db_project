import ConfigureConnector from './ConfigureConnector';
export default class Connector {
    #username = '';
    #token = '';
    #type = '';
    #isLogin = false;
    static instance = null;
    
    constructor(name){
        this.name = name
        if( Connector.instance === null){
            Connector.instance = this
        }
    }
    get token(){
        return this.#token
    }
    get isLogin(){
        return this.#isLogin
    }

    get type(){
        return this.#type
    }

    toString(){
        return `${this.#username} :: ${this.#type} :: ${this.#token} :: ${this.#isLogin}`
    }
    getInstance(){
        if( Connector.instance === null){
            Connector.instance = this
        }
        return Connector.instance
    }
    setUserLogout(){
        this.#username = ''
        this.#token = ''
        this.#type = ''
        this.#isLogin = false
    }

    async setUserLogin(data){
        // console.log(data)
        this.#username = data[ConfigureConnector.keyResponseData][0].username
        this.#token = data[ConfigureConnector.keyTokenHeader]
        this.#type = data[ConfigureConnector.keyResponseData][0].type
        this.#isLogin = true
        // console.log(this.toString())
    }

    async setRefershtoken(response){
        if (response.hasOwnProperty(ConfigureConnector.keyTokenHeader)) {
            this.#token = response[ConfigureConnector.keyTokenHeader]
        }else{
            console.log(`don't have token`)
        }
    }

    async Login(username, password){
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

    async getProducts(){
        return await fetch(ConfigureConnector.proxyAnywhereAndUrlProducts).then(response => response.json()).then(data => data[ConfigureConnector.keyResponseData])
    }

    async editProduct(data){
        return null
    }

    async deleteProduct(productCode){
        return null
    }

    async getCustomers(){
        return await fetch(ConfigureConnector.proxyAnywhereAndUrlCustomers).then(response => response.json()).then(data => data[ConfigureConnector.keyResponseData])
    }

    async editCustomer(data){
        return null
    }

    async deleteCustomer(customerNumber){
        return null
    }
}