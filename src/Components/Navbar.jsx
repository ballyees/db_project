import React, { Component } from 'react';
import { NavLink, Link, Redirect } from 'react-router-dom';
import { MDBBtn } from "mdbreact";
import PostModals from './PostModals';
import CartModals from './CartModals';
import AddType from './AddType';
import './Navbar.css'

export default class Navbar extends Component{
    constructor(props) {
      super(props);
      this.state = {
        menu: false,
        dummy: false,
        addTypeModals: false,
      };
      this.toggleMenu = this.toggleMenu.bind(this);
    }

    async toggleMenu(e){
      this.setState({ menu: !this.state.menu })
      if(e !== undefined && e.target.name === 'logout'){
        let success = await this.props.Tokenizer.setUserLogout()
        if (success){
          this.props.logout()
        }
      }
    }

    toggleAddTypeModals = (e) => {
      this.setState(prevState => ({
        addTypeModals: !prevState.addTypeModals
      }))
    }


    render(){
      const show = (this.state.menu) ? "show" : ""
      let loginSuccess
      let userType
      if (this.props.loginSuccess){
        if(true){
          userType = (
            <li className="nav-item nav-link js-scroll-trigger" role="presentation">
              <PostModals onClickP2C={this.toggleMenu} style={{borderRadius: "20px"}} />
            </li>
          )
        }
        loginSuccess = (
          <div className={"collapse navbar-collapse " + show} id="navbarResponsive">
            <ul className="nav navbar-nav ml-auto">
                <li className="nav-item nav-link js-scroll-trigger" role="presentation">
                  <Link to="/find-jobs/profile"><span className="nav-link active js-scroll-trigger" style={{paddingTop: 18}} onClick={this.toggleMenu}>Profile</span></Link>
                </li>
                <li className="nav-item nav-link js-scroll-trigger" role="presentation">
                  <Link to="/find-jobs/profile"><span className="nav-link active js-scroll-trigger" style={{paddingTop: 18}} onClick={this.toggleMenu}>Profile</span></Link>
                </li>
                <li className="nav-item nav-link js-scroll-trigger" role="presentation">
                  <span className="nav-link active js-scroll-trigger" style={{paddingTop: 18}} onClick={this.toggleAddTypeModals}>Add</span>
                  {this.state.addTypeModals?<AddType type="product" open={this.state.addTypeModals} toggle={this.toggleAddTypeModals.bind(this)} /> : <></>}
                  {/* <Link to="/find-jobs/profile"><span className="nav-link active js-scroll-trigger" style={{paddingTop: 18}} onClick={this.toggleMenu}>Profile</span></Link> */}
                </li>
                <li className="nav-item nav-link js-scroll-trigger" role="presentation">
                  <CartModals onClickP2C={this.toggleMenu} style={{borderRadius: "20px"}} cart={this.props.cart} fn={this.props.fn} state={this.props.state} onChangeCartValue={this.props.onChangeCartValue} />
                </li>
                {userType}
                <li className="nav-item nav-link js-scroll-trigger" role="presentation">
                  <Link to="/find-jobs/login"><MDBBtn type="button" style={{borderRadius: "20px"}} outline color="danger" onClick={this.toggleMenu} name="logout">Logout</MDBBtn></Link>
                </li>
            </ul>
          </div>
        )
      }else{
        // loginSuccess = (
        //   <div className={"collapse navbar-collapse " + show} id="navbarResponsive">
        //     <ul className="nav navbar-nav ml-auto">
        //         <li className="nav-item nav-link js-scroll-trigger" role="presentation">
        //           <Link to="/find-jobs/login"><span className="nav-link active js-scroll-trigger" style={{paddingTop: 18}} onClick={this.toggleMenu} >Sign in</span></Link>
        //         </li>
        //         <li className="nav-item nav-link js-scroll-trigger" role="presentation">
        //           <Link to="/find-jobs/register"><MDBBtn type="button" style={{borderRadius: "20px"}} outline color="info" onClick={this.toggleMenu} >Sign Up</MDBBtn></Link>
        //         </li>
        //     </ul>
        //   </div>
        // )
        loginSuccess = (<Redirect to="/find-jobs/login" />)
      }
      return (
          <div className="Navbar">
            <nav className="navbar sticky-top navbar-dark bg-dark navbar-expand-md navbar navbar-expand-lg fixed-top" id="mainNav">
              <div className="container">
                <NavLink to="/find-jobs/home">
                  <span className="navbar-brand js-scroll-trigger" style={{paddingTop: 5}} >Model-Figure</span>
                </NavLink>
                <button onClick={this.toggleMenu} className="navbar-toggler navbar-toggler-right" data-target="#navbarResponsive" type="button" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"
                      value="Menu"><i className="fa fa-bars"></i>
                </button>
                {loginSuccess}
              </div>
          </nav>
          </div>
        );
    }
}

