import React from 'react'
import Navbar from './Navbar'
import CustomersData from './CustomersData';
export default class Customers extends React.Component{
    // constructor(props){
    //     super (props)
    // }
    componentDidMount(){
        document.title = "Models-Figure | Customers"
    }
    render(){
        return (
            <div className="Customers">
            <Navbar loginSuccess={this.props.state.loginSuccess} logout={this.props.logout} cart={this.props.state.cart} fn={this.props.fn} onChangeCartValue={this.props.onChangeCartValue} />
            {this.props.state.loginSuccess?<CustomersData /> :<> </>}
            </div>
        );
    }
}