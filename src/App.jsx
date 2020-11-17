import React from 'react';

import './App.css';
import 'mdbreact/dist/css/mdb.css';
import { createBrowserHistory } from "history";

// import component
import Login from './Components/Login';
import Products from './Components/Products';
import Register from './Components/Register';
import Data from './Components/Data';
import Customers from './Components/Customers';
import Employees from './Components/Employees';
import Bills from './Components/Bills';


import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

export default class App extends React.Component {
	constructor(props) {
		super()

		this.state = {
			loginSuccess: false,
			cart: [],
			history: createBrowserHistory()
		}
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
			isLoginComponent = <Redirect to="/model-figure/login" />
		}
		return (
			<Router>
				<div className="App">
					<Route exact path={"(/|/model-figure/home|/model-figure/products|/model-figure)"}
						render={
							(props) =>
								this.state.loginSuccess ?
									<Products loginSuccess={this.state.loginSuccess}
										history={this.state.history}
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
									<Redirect to="/model-figure/login" />
						}
					/>
					<Route exact path="/model-figure/login" render={(props) => <Login loginSuccess={this.state.loginSuccess} callBack={this.changeLogin.bind(this)} />} />
					<Route exact path="/model-figure/register" render={(props) => <Register loginSuccess={this.state.loginSuccess} />} />
					<Route exact path="/model-figure/data" render={(props) => (isLoginComponent)} />
					<Route exact path="/model-figure/employees"
						render={
							(props) =>
								this.state.loginSuccess ?
									<Employees loginSuccess={this.state.loginSuccess}
										history={this.state.history}
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
									<Redirect to="/model-figure/login" />
						} />
					<Route exact path="/model-figure/bills"
						render={
							(props) =>
								this.state.loginSuccess ?
									<Bills loginSuccess={this.state.loginSuccess}
										history={this.state.history}
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
									<Redirect to="/model-figure/login" />
						} />
					<Route exact path="/model-figure/customers"
						render={
							(props) =>
								this.state.loginSuccess ?
									<Customers loginSuccess={this.state.loginSuccess}
										history={this.state.history}
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
									<Redirect to="/model-figure/login" />
						}
					/>
				</div>
			</Router>
		);
	}
}

