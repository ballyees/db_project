export default class ConfigureConnector {

    static keyTokenHeader = 'tokenAuthenticate'
    static keyResponseData = 'responseData'
    static keyRequestHeaderLogoutType = 'type'

    static urlUserLogin = 'http://127.0.0.1:8000/v1/api/user/login/'
    static urlProducts = 'http://127.0.0.1:8000/v1/api/store/product/'
    static urlCustomers = 'http://127.0.0.1:8000/v1/api/store/customer/'
    static urlEmployees = 'http://127.0.0.1:8000/v1/api/store/employee/'
    
    static proxyHost = 'http://127.0.0.1:8000/'
    static proxyAnywhereLocal = 'http://127.0.0.1:8080/'
    static proxyAnywhere = 'http://cors-anywhere.herokuapp.com/'

    static proxyAnywhereAndUrlUserLogin = ConfigureConnector.proxyAnywhereLocal + ConfigureConnector.urlUserLogin
    static proxyAnywhereAndUrlProducts = ConfigureConnector.proxyAnywhereLocal + ConfigureConnector.urlProducts
    static proxyAnywhereAndUrlCustomers = ConfigureConnector.proxyAnywhereLocal + ConfigureConnector.urlCustomers
    static proxyAnywhereAndUrlEmployees = ConfigureConnector.proxyAnywhereLocal + ConfigureConnector.urlEmployees

}