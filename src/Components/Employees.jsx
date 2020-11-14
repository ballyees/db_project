import React from 'react'
import Navbar from './Navbar'
import EmployeesData from './EmployeesData';
export default class Employees extends React.Component{
    // constructor(props){
    //     super (props)
    // }
    componentDidMount(){
        document.title = "Models-Figure | Employees"
    }
    render(){
        return (
            <div className="Employees">
            <Navbar loginSuccess={this.props.state.loginSuccess} logout={this.props.logout} cart={this.props.state.cart} fn={this.props.fn} onChangeCartValue={this.props.onChangeCartValue} />
            {this.props.state.loginSuccess?<EmployeesData /> :<> </>}
            </div>
        );
    }
}