import React from 'react';

import './App.css';
import 'mdbreact/dist/css/mdb.css';

// import component
import Login from './Components/Login';
import Products from './Components/Products';
import Register from './Components/Register';
import Data from './Components/Data';
import Customers from './Components/Customers';
import Employees from './Components/Employees';

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    let isLogin = true
    if (localStorage.getItem('username') && localStorage.getItem('password')) {
      window.$Connector.Login(localStorage.getItem('username'), localStorage.getItem('password'))
    }

    // console.log(window.$Connector, 'have connector')
    this.state = {
      loginSuccess: isLogin,
      cart: []
    }
    // console.log("constructor !!!")
  }

  logout = () => {
    this.setState({
      loginSuccess: false,
    })
    localStorage.removeItem('cart')
    localStorage.removeItem('username')
    localStorage.removeItem('password')
  }

  onChangeCartValue(productKey, value) {
    let cart = JSON.parse(localStorage.getItem('cart'))
    cart.data[productKey] = { ...cart.data[productKey], ...{ value: value } }
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('modal:', cart)
  }

  addProductToCart = (product) => {
    if (!localStorage.getItem('cart')) {
      localStorage.setItem('cart', JSON.stringify({ data: {}, customer: '', promoCode: '' }));
    }
    let cart = JSON.parse(localStorage.getItem('cart'))
    if (cart.data.hasOwnProperty(product["productCode"])) {
      cart.data[product["productCode"]] = { ...product, ...{ value: cart.data[product["productCode"]].value + 1 } }
    } else {
      cart.data[product["productCode"]] = { ...product, ...{ value: 1 } }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log('change:', cart)
  }

  changeLogin = (e) => {
    this.setState({
      loginSuccess: e.isLoginSuccess,
    })
  }

  renderLogin() {
    if (this.state.loginSuccess) {
      return (<Data />)
    } else {
      return (<div></div>)
    }
  }

  render() {
    let isLoginComponent
    if (this.state.loginSuccess) {
      isLoginComponent = <Data />
    } else {
      isLoginComponent = <Redirect to="/find-jobs/login" />
    }
    return (
      <Router>
        <div className="App">
          <Route exact path={"(/|/find-jobs/home|/find-jobs/products|/find-jobs)"}
            render={
              (props) =>
                this.state.loginSuccess ?
                  <Products loginSuccess={this.state.loginSuccess}
                    logout={this.logout}
                    state={this.state}
                    addProductToCart={this.addProductToCart}
                    onChangeCartValue={this.onChangeCartValue.bind(this)}
                    fn={{
                      onChangeCartValue: this.onChangeCartValue.bind(this),
                      addProductToCart: this.addProductToCart.bind(this),
                      logout: this.logout.bind(this)
                    }} />
                  :
                  <Redirect to="/find-jobs/login" />
            }
          />
          <Route exact path="/find-jobs/login" render={(props) => <Login loginSuccess={this.state.loginSuccess} callBack={this.changeLogin.bind(this)} />} />
          <Route exact path="/find-jobs/register" render={(props) => <Register loginSuccess={this.state.loginSuccess} />} />
          <Route exact path="/find-jobs/data" render={(props) => (isLoginComponent)} />
          <Route exact path="/find-jobs/employees"
            render={
              (props) =>
                this.state.loginSuccess ?
                  <Employees loginSuccess={this.state.loginSuccess}
                    logout={this.logout}
                    state={this.state}
                    addProductToCart={this.addProductToCart}
                    onChangeCartValue={this.onChangeCartValue.bind(this)}
                    fn={{
                      onChangeCartValue: this.onChangeCartValue.bind(this),
                      addProductToCart: this.addProductToCart.bind(this),
                      logout: this.logout.bind(this)
                    }} />
                  :
                  <Redirect to="/find-jobs/login" />
            } />
          <Route exact path="/find-jobs/customers"
            render={
              (props) =>
                this.state.loginSuccess ?
                  <Customers loginSuccess={this.state.loginSuccess}
                    logout={this.logout}
                    state={this.state}
                    addProductToCart={this.addProductToCart}
                    onChangeCartValue={this.onChangeCartValue.bind(this)}
                    fn={{
                      onChangeCartValue: this.onChangeCartValue.bind(this),
                      addProductToCart: this.addProductToCart.bind(this),
                      logout: this.logout.bind(this)
                    }} />
                  :
                  <Redirect to="/find-jobs/login" />
            }
          />
        </div>
      </Router>
    );
  }
}

