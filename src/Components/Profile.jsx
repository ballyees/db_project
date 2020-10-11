import React from 'react'
import profile from './img/profile.png'

import { MDBInput, MDBBtn, MDBIcon } from "mdbreact";
import { Link } from 'react-router-dom';

export default class Profile extends React.Component{

    onChange = e => {
        const { name, value } = e.target
        console.log(name + " " + value)
        this.setState({
            [name]: value
        })
    }

    render(){
        return (
            <div className="Profile">
                <div>
                    <div className="container">
                        <div className="row" style={{paddingTop: 5}}>
                            <div className="col-lg-12" style={{paddingBottom: 4}}>
                                <div className="card">
                                    <div className="card-body">
                                        <table width="100%">
                                            <tbody>
                                                <tr>
                                                    <td width="50%" align="left">
                                                        <div className="col">
                                                            <h1 className="card-title" style={{textAlign: "left"}}>Pongpisut Khumjui</h1>
                                                            <h4 className="text-left font-weight-light mb-0">Web Developer</h4>
                                                        </div>
                                                    </td>
                                                    <td width="50%" align="right">
                                                        <div className="col" style={{alignContent: "right"}}>
                                                            <img className="img-fluid d-block mx-auto mb-5" src={profile} alt="profile" style={{maxWidth: "100px", maxHeight: "150px", paddingTop: 40}} />
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-body">
                                        <h2 className="card-title text-uppercase text-center text-secondary mb-0" style={{paddingBottom: 4}}>Personal infomation</h2>
                                        <table align="center">
                                            <tbody>
                                                <tr>
                                                    <td width="50%">
                                                        <div className="col-lg-12">
                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <h2 className="card-title text-center mb-0" style={{backgroundColor: "rgb(255, 255, 255)"}}>Educational Background</h2>
                                                                    <p className="card-text" style={{textAlign: "left"}}>etc...</p></div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td width="50%">
                                                        <div className="col-lg-12">
                                                            <div className="card">
                                                                <div className="card-body">
                                                                    <h2 className="card-title text-center mb-0" style={{backgroundColor: "rgb(255, 255, 255)"}}>Experience</h2>
                                                                    <p className="card-text" style={{textAlign: "left"}}>etc...</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="contact">
                    <div className="container" style={{paddingTop: 4}}>
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="card">
                                    <div className="card-body">
                                        <h2 className="card-title text-uppercase text-center text-secondary mb-0">Contact Me</h2>
                                        <MDBInput label="Name" outline name="name" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                        <MDBInput label="Email Address" outline name="email" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                        <MDBInput label="Phone Number" outline name="phoneNumber" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                        {/* <div className="input-group">
                                            <div className="input-group-prepend">
                                                <span className="input-group-text" id="basic-addon">
                                                <i className="fas fa-pencil-alt prefix"></i>
                                                </span>
                                            </div>
                                            <textarea className="form-control" id="exampleFormControlTextarea1" rows="5" name="message"></textarea>
                                        </div> */}
                                        <MDBInput type="textarea" label="Message to me" outline name="message" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                        <MDBBtn type="button" style={{borderRadius: "20px", width: "100%", paddingTop: 10}} outline color="info" onClick={this.toggleMenu} >Send<MDBIcon far icon="paper-plane" className="ml-1" /></MDBBtn>
                                        <Link to="/find-jobs/home"><button className="back" style={{opacity: 0.5, position: "fixed", bottom: "20px", right: "10px", borderRadius: "5px", border: "none", fontSize: "150%", backgroundColor: "#33B5E5"}}>Go to home</button></Link>
                                        <Link to="/find-jobs/home"><button className="back" style={{opacity: 0.5, position: "fixed", bottom: "20px", left: "10px", borderRadius: "5px", border: "none", fontSize: "150%", backgroundColor: "#33B5E5"}}>Go to home</button></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}