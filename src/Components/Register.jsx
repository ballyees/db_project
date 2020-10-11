import React from 'react'
import { Link } from 'react-router-dom'
import './Login-From-Dark.css'
import starSky from './img/n_star-sky.jpg'
import FindSVG from './img/find2.svg'

import { MDBInput } from "mdbreact";

export default class Register extends React.Component{

    state = {
        email: '',
        password: '',
        conPassword: '',
        fName: '',
        lName: '',
        companyName: '',
        contactNumber: '',
        company: '',
        gender: 'm',
    }

    onChange = e => {
        const { name, value } = e.target
        console.log(name + " " + value+ " " + typeof(value))
        if(name === 'company'){
            Object.keys(this.refs).forEach(
                (e) => this.refs[e].state.innerValue = ''
            )
            let resetState = {
                email: '',
                password: '',
                conPassword: '',
                fName: '',
                lName: '',
                companyName: '',
                contactNumber: '',
                gender: 'm'
            }
            this.setState(resetState)
        }
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
        let InputGroup
        if (this.state.company){
            InputGroup = (
                <div className="companyInput">
                    <MDBInput label="Company Name" outline name="companyName" onChange={this.onChange} onKeyPress={this.KeyPressEnter} ref="companyName" />
                    <MDBInput type="tel" label="Contact Number" outline name="contactNumber" onChange={this.onChange} onKeyPress={this.KeyPressEnter} ref="contactNumber" />
                </div>
            )
        }else{
            InputGroup = (
                <div className="jobSeekerInput">
                    <div className="form-group">
                        <select className="browser-default custom-select" name="gender" onChange={this.onChange}>
                            <option value="m">Male</option>
                            <option value="f">Female</option>
                        </select>
                    </div>
                    <MDBInput label="First Name" outline name="fName" onChange={this.onChange} onKeyPress={this.KeyPressEnter} ref="fName" />
                    <MDBInput label="Last Name" outline name="lName" onChange={this.onChange} onKeyPress={this.KeyPressEnter} ref="lName" />
                    <MDBInput label="Job" outline name="job" onChange={this.onChange} onKeyPress={this.KeyPressEnter} ref="job" />
                </div>
            )
        }
         


        return (
            <div className="register" style={{backgroundImage: `url(${starSky})`, backgroundSize: "cover", position: "relative", height: "1000px", width: "100%"}}>
                <div className="container">
                    <div className="row justify-content-center" style={{paddingTop: "5%"}}>
                        <div className="col-md-9 col-lg-12 col-xl-6">
                            <div className="card shadow-lg o-hidden border-0 my-5">
                                <div className="card-body p-0">
                                    <div className="row">
                                        <div className="col-lg-6 col-lg-12">
                                            <div className="p-5">
                                                <div className="text-center">
                                                <Link to="/find-jobs/home"><img src={FindSVG} alt="Logo" style={{maxHeight: "40%", maxWidth: "30%"}} /></Link>
                                                    <h4 className="text-dark mb-4">Welcome to Find Jobs</h4>
                                                </div>
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="user">
                                                            <div className="form-group">
                                                                <select className="browser-default custom-select" name="company" onChange={this.onChange}>
                                                                    <option value="">Jobseeker</option>
                                                                    <option value="1">Company</option>
                                                                </select>
                                                            </div>
                                                            {InputGroup}
                                                            <MDBInput label="Email Address" outline name="email" onChange={this.onChange} onKeyPress={this.KeyPressEnter} ref="email" />
                                                            <MDBInput type="password" label="Password" outline name="password" onChange={this.onChange} onKeyPress={this.KeyPressEnter} ref="password" />
                                                            <MDBInput type="password" label="Confirm Password" outline name="conPassword" onChange={this.onChange} onKeyPress={this.KeyPressEnter} ref="conPassword" />
                                                            <button className="btn btn-info btn-block text-white btn-user" id="submit-btn" type="submit" style={{borderRadius: "20px"}} onClick={this.SubmitBtn}>SIGN IN</button>
                                                            <hr />
                                                        </div>
                                                        <span className="haveAcc">Already have an account? </span><Link to="/find-jobs/login">Sign In</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        )
    }
}