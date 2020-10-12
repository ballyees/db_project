export default class ConfigureTokenizer {

    static keyTokenHeader = 'tokenAuthenticate'
    static keyResponseData = 'responseData'
    static keyRequestHeaderLogoutType = 'type'

    static urlUserLogin = 'http://127.0.0.1:8000/v1/api/user/login'
    static urlProducts = 'http://127.0.0.1:8000/v1/api/store/product'
    static proxyHost = 'http://127.0.0.1:8000/'
    static proxyAnywhereLocal = 'http://127.0.0.1:8080/'
    static proxyAnywhere = 'http://cors-anywhere.herokuapp.com/'

    static proxyAnywhereAndUrlUserLogin = ConfigureTokenizer.proxyAnywhereLocal + ConfigureTokenizer.urlUserLogin
    static proxyAnywhereAndUrlProducts = ConfigureTokenizer.proxyAnywhereLocal + ConfigureTokenizer.urlProducts

}