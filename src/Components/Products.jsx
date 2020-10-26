import React from 'react'
import Navbar from './Navbar'
import ProductsData from './ProductsData';
export default class Products extends React.Component{
    constructor(props){
        super (props)
    }
    render(){
        return (
            <div className="Product">
            <Navbar loginSuccess={this.props.state.loginSuccess} logout={this.props.logout} cart={this.props.state.cart} fn={this.props.fn} onChangeCartValue={this.props.onChangeCartValue} />
            {this.props.state.loginSuccess?<ProductsData addProductToCart={this.props.fn["addProductToCart"]} cart={this.props.state.cart} /> : <></>}
            </div>
        );
    }
}