import React from 'react'
import Navbar from './Navbar'
import HomeData from './HomeData'
import { MDBInput } from "mdbreact";
import { MDBContainer } from "mdbreact";
export default class Home extends React.Component{

    state = {
        search: '',
        options: ''
    }

    onChange = e => {
        const { name, value } = e.target
        console.log(name + " " + value)
        this.setState({
            [name]: value
        })
    }

    SubmitBtn = () => {
        console.log(this.state)
    }

    KeyPressEnter = e => {
        if(e.key === 'Enter'){
            this.SubmitBtn()
        }
    }

    render(){
        return (
            <div className="Home">
            <Navbar loginSuccess={this.props.loginSuccess} logout={this.props.logout} Tokenizer={this.props.Tokenizer} />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6 text-center">
                        <MDBInput label="Search" outline name="search" onChange={this.onChange} onKeyPress={this.KeyPressEnter}/>
                    </div>
                    <div className="col-lg-6 text-center" style={{padding: 23}}>
                        <select className="browser-default custom-select" name="options" value="2" onChange={this.onChange}>
                          <option value="1">Option 1</option>
                          <option value="2">Option 2</option>
                          <option value="3">Option 3</option>
                        </select>
                    </div>
                </div>
            </div>
            <HomeData dataSearch={this.state.search} />
            <MDBContainer>
            <div className="row justify-content-center">
                    <div className="col-lg-6 text-center">
                        <MDBInput label="Search" outline name="search" onChange={this.onChange} onKeyPress={this.KeyPressEnter}/>
                    </div>
                </div>
            </MDBContainer>
            </div>
        );
    }
}