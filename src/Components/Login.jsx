import React from 'react'
import { Link, Redirect } from 'react-router-dom'
import './Login-From-Dark.css'
import starSky from './img/egg-substitutes.jpg'
import figer from './img/FIGeR.png'

import { MDBInput } from "mdbreact";

export default class Login extends React.Component{
    constructor(props){
        super()
        this.state = {
            username: '',
            password: '',
            rememberMe: false,
            company: 0,
            isSuccess: false
        }
    }

    onChange = e => {
        const { name, value } = e.target
        // console.log(name + " " + value)
        if(name === 'rememberMe'){
            this.setState({
                [name]: this.refs.rememberMe.checked
            })
        }else{
            this.setState({
                [name]: value
            })
        }
        
    }

    loginFunc = async (username, password) => {
        await window.$Connector.Login(username, password).then(success => {
            if (success){
                this.props.callBack({isLoginSuccess: true})
                this.setState({
                    isSuccess: true,
                })
                localStorage.setItem('username', username)
                localStorage.setItem('password', password)
            }
        })
    }

    SubmitBtn = async () => {
        this.loginFunc(this.state.username, this.state.password)
    }

    KeyPressEnter = e => {
        if(e.key === 'Enter'){
            this.SubmitBtn()
        }
    }

    componentDidMount() {
        if (localStorage.getItem('username') && localStorage.getItem('password')) {
            this.loginFunc(localStorage.getItem('username'), localStorage.getItem('password'))
		}
    }

    render(){
        
        return (
            <div style={{backgroundImage: `url(${starSky})`, backgroundSize: "cover", position: "relative", height: "752.5px", width: "100%"}}>
                <div className="container">
                    <div className="row justify-content-center" style={{paddingTop: "5%"}}>
                        <div className="col-md-9 col-lg-12 col-xl-6">
                            <div className="card shadow-lg o-hidden border-0 my-5">
                                <div className="card-body p-0">
                                    <div className="row">
                                        <div className="col-lg-6 col-lg-12">
                                            <div className="p-5" >
                                                <div className="text-center" >
                                                <div>
                                                    <section className="one-fourth" id="html">
                                                        <img src={figer} width = '200' height = '200' />
                                                    </section>
                                                </div>
                                                    
                                                </div>
                                                <div className="user">
                                                    <MDBInput label="username" outline name="username" style={{borderColor: 'black'}} onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                                    <MDBInput type="password" label="Password" outline name="password" style={{borderColor: 'black'}}  onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                                    {/* <div className="custom-control custom-checkbox" style={{paddingBottom: "4%", textAlign: "left"}}>
                                                        <input type="checkbox" className="custom-control-input" id="rememberMe" name="rememberMe" onChange={this.onChange} ref="rememberMe" />
                                                        <label className="custom-control-label" htmlFor="rememberMe">Remember Me</label>
                                                    </div> */}
                                                    <button className="btn btn-orange btn-block text-white btn-user" id="submit-btn" type="submit" style={{borderRadius: "20px"}} onClick={this.SubmitBtn}>SIGN IN</button>
                                                </div>
                                                
                                                {this.state.isSuccess?<Redirect to="/model-figure/home" />:<div></div>}
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