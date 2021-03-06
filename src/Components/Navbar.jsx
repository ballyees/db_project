import React, { Component } from 'react';
import { NavLink, Link, Redirect } from 'react-router-dom';
import { MDBBtn, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import CartModals from './CartModals';
import AddModals from './AddModals';
import './Navbar.css'
import figer from './img/FIGeR.png'

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      dummy: false,
      addModals: false,
      cartModals: false,
      typeModal: ''
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  async toggleMenu(e) {
    this.setState({ menu: !this.state.menu })
    if (e !== undefined && e.target.name === 'logout') {
      window.$Connector.setUserLogout()
      this.props.logout()
    }
  }

  toggleAddModals = (name) => {
    this.setState(prevState => ({
      addModals: !prevState.addModals,
      typeModal: (prevState.typeModal !== "") ? "" : name
    }))
  }

  toggleCart = () => {
    this.setState(prevState => ({
      cartModals: !prevState.cartModals
    }))
  }


  render() {
    const show = (this.state.menu) ? "show" : ""
    let loginSuccess
    let userType
    if (this.props.loginSuccess) {
      if (true) {
        userType = (
          // <li className="nav-item nav-link js-scroll-trigger" role="presentation">
          //   <PostModals onClickP2C={this.toggleMenu} style={{ borderRadius: "20px" }} />
          // </li>
          <></>
        )
      }
      loginSuccess = (
        <div className={"collapse navbar-collapse " + show} id="navbarResponsive">
          <ul className="nav navbar-nav ml-auto">
            <li className="nav-item nav-link js-scroll-trigger" role="presentation">
              <MDBDropdown>
                <MDBDropdownToggle color="orange" style={{ borderRadius: "5px" }} >
                  menus
                </MDBDropdownToggle>
                <MDBDropdownMenu basic>
                  <MDBDropdownItem><Link to="/model-figure/products" style={{display: "inline"}} ><span className="active js-scroll-trigger" style={{color: "#212529"}} onClick={this.toggleMenu}>Products</span></Link></MDBDropdownItem>
                  <MDBDropdownItem divider />
                  <MDBDropdownItem><Link to="/model-figure/customers" style={{display: "inline"}} ><span className="active js-scroll-trigger" style={{color: "#212529"}} onClick={this.toggleMenu}>Customers</span></Link></MDBDropdownItem>
                  <MDBDropdownItem divider />
                  <MDBDropdownItem><Link to="/model-figure/employees" style={{display: "inline"}} ><span className="active js-scroll-trigger" style={{color: "#212529"}} onClick={this.toggleMenu}>Employees</span></Link></MDBDropdownItem>
                  <MDBDropdownItem divider />
                  <MDBDropdownItem><Link to="/model-figure/bills" style={{display: "inline"}} ><span className="active js-scroll-trigger" style={{color: "#212529"}} onClick={this.toggleMenu}>Bills</span></Link></MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </li>
            <li className="nav-item nav-link js-scroll-trigger" role="presentation">
              <MDBDropdown>
                <MDBDropdownToggle color="orange" style={{ borderRadius: "5px" }} >
                  Add menus
                  </MDBDropdownToggle>
                <MDBDropdownMenu basic>
                  <MDBDropdownItem><span className="active js-scroll-trigger" style={{color: "#212529"}} onClick={(e) => this.toggleAddModals("product")} >Add Product</span></MDBDropdownItem>
                  <MDBDropdownItem divider />
                  <MDBDropdownItem><span className="active js-scroll-trigger" style={{color: "#212529"}} onClick={(e) => this.toggleAddModals("customer")} >Add Customer</span></MDBDropdownItem>
                  <MDBDropdownItem divider />
                  <MDBDropdownItem><span className="active js-scroll-trigger" style={{color: "#212529"}} onClick={(e) => this.toggleAddModals("employee")} >Add Employee</span></MDBDropdownItem>
                  <MDBDropdownItem divider />
                  <MDBDropdownItem><span className="active js-scroll-trigger" style={{color: "#212529"}} onClick={(e) => this.toggleAddModals("promotion")} >Add Promotion</span></MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </li>
            <li className="nav-item nav-link js-scroll-trigger" role="presentation">
              {this.state.cartModals ?
                <CartModals open={this.state.cartModals} toggle={this.toggleCart} style={{ borderRadius: "20px" }} history={this.props.history} />
                :
                <MDBBtn onClick={this.toggleCart} color="orange" style={{ borderRadius: "5px", textAlign: "" }} name="cart">cart</MDBBtn>
              }

            </li>
            {userType}
            <li className="nav-item nav-link js-scroll-trigger" role="presentation">
              <MDBBtn type="button" style={{ borderRadius: "5px" }} color="orange" onClick={this.toggleMenu} name="logout">Edit Profile</MDBBtn>
            </li>
            <li className="nav-item nav-link js-scroll-trigger" role="presentation">
              <Link to="/model-figure/login"><MDBBtn type="button" outline style={{ borderRadius: "5px" }} color="red" onClick={this.toggleMenu} name="logout">Logout</MDBBtn></Link>
            </li>

          </ul>
        </div>
      )
    } else {
      loginSuccess = (<Redirect to="/model-figure/login" />)
    }
    return (
      <div className="Navbar">
        <nav className="navbar sticky-top navbar-dark bg-dark navbar-expand-md navbar navbar-expand-lg fixed-top" id="mainNav">
          <div className="container">
            <NavLink to="/model-figure/home">
              <img src={figer} alt='naruto' width = '100' height = '100'/>
            </NavLink>
            <button onClick={this.toggleMenu} className="navbar-toggler navbar-toggler-right" data-target="#navbarResponsive" type="button" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"
              value="Menu"><i className="fa fa-bars"></i>
            </button>
            {loginSuccess}
            {this.state.addModals ? <AddModals type={this.state.typeModal} open={this.state.addModals} toggle={this.toggleAddModals.bind(this)} /> : <></>}
          </div>
        </nav>
      </div>
    );
  }
}

