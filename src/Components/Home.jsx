import React from 'react'
import Navbar from './Navbar'
import ProductsData from './ProductsData';
export default class Home extends React.Component{

    render(){
        return (
            <div className="Home">
            <Navbar loginSuccess={this.props.loginSuccess} logout={this.props.logout} Tokenizer={this.props.Tokenizer} />
            <ProductsData Tokenizer={this.props.Tokenizer} />
            </div>
        );
    }
}