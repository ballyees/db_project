import React from 'react'
import Navbar from './Navbar'
import BillsData from './BillsData';
export default class Bills extends React.Component{
    // constructor(props){
    //     super (props)
    // }
    componentDidMount(){
        document.title = "Models-Figure | Bills"
    }
    render(){
        return (
            <div className="Bills">
            <Navbar loginSuccess={this.props.state.loginSuccess} logout={this.props.logout} cart={this.props.state.cart} fn={this.props.fn} onChangeCartValue={this.props.onChangeCartValue} />
            {this.props.state.loginSuccess?<BillsData /> :<> </>}
            </div>
        );
    }
}