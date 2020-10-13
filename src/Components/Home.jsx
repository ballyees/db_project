import React from 'react'
import Navbar from './Navbar'
import ProductsData from './ProductsData';
export default class Home extends React.Component{
    constructor(props){
        super (props)
    }
    render(){
        return (
            <div className="Home">
            <Navbar loginSuccess={this.props.state.loginSuccess} logout={this.props.logout} Tokenizer={this.props.state.tokenizer} cart={this.props.state.cart} fn={this.props.fn} onChangeCartValue={this.props.onChangeCartValue} />
            <ProductsData Tokenizer={this.props.state.tokenizer} addToCart={this.props.fn["addToCart"]} cart={this.props.state.cart} />
            </div>
        );
    }
}