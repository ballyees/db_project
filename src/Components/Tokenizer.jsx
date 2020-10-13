import ConfigureTokenizer from './ConfigureTokenizer';
export default class Tokenizer {
    #username = '';
    #token = '';
    #type = '';
    #isLogin = false;
    static instance = null;
    
    constructor(name){
        this.name = name
        if( Tokenizer.instance === null){
            Tokenizer.instance = this
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
        if( Tokenizer.instance === null){
            Tokenizer.instance = this
        }
        return Tokenizer.instance
    }
    setUserLogout(){
        this.#username = ''
        this.#token = ''
        this.#type = ''
        this.#isLogin = false
    }

    async setUserLogin(data){
        // console.log(data)
        this.#username = data[ConfigureTokenizer.keyResponseData][0].username
        this.#token = data[ConfigureTokenizer.keyTokenHeader]
        this.#type = data[ConfigureTokenizer.keyResponseData][0].type
        this.#isLogin = true
        // console.log(this.toString())
    }

    async setRefershtoken(response){
        if (response.hasOwnProperty(ConfigureTokenizer.keyTokenHeader)) {
            this.#token = response[ConfigureTokenizer.keyTokenHeader]
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
                "Content-Length": Buffer.byteLength(data)
            },
            mode: 'cors',
            body: JSON.stringify(data)
        }
        return await fetch(ConfigureTokenizer.proxyAnywhereAndUrlUserLogin, options).then(response => {
            if (response.ok){
                response.json().then(data => {
                    this.setUserLogin(data)
                })
            }
            return response.ok
        })
    }
    async getProducts(){
        return await fetch(ConfigureTokenizer.proxyAnywhereAndUrlProducts).then(response => response.json()).then(data => data[ConfigureTokenizer.keyResponseData])
    }
}