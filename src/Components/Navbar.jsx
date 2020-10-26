import React, { Component } from 'react';
import { NavLink, Link, Redirect } from 'react-router-dom';
import { MDBBtn, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem } from "mdbreact";
import PostModals from './PostModals';
import CartModals from './CartModals';
import AddType from './AddType';
import './Navbar.css'

export default class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
      dummy: false,
      addTypeModals: false,
      cartModals: false,
      typeModal: ''
    };
    this.toggleMenu = this.toggleMenu.bind(this);
  }

  async toggleMenu(e) {
    this.setState({ menu: !this.state.menu })
    if (e !== undefined && e.target.name === 'logout') {
      let success = await window.$Connector.setUserLogout()
      if (success) {
        this.props.logout()
      }
    }
  }

  toggleAddTypeModals = (name) => {
    // console.log(name, this.state.addTypeModals)
    this.setState(prevState => ({
      addTypeModals: !prevState.addTypeModals,
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
          <li className="nav-item nav-link js-scroll-trigger" role="presentation">
            <PostModals onClickP2C={this.toggleMenu} style={{ borderRadius: "20px" }} />
          </li>
        )
      }
      loginSuccess = (
        <div className={"collapse navbar-collapse " + show} id="navbarResponsive">
          <ul className="nav navbar-nav ml-auto">
            {/* <li className="nav-item nav-link js-scroll-trigger" role="presentation">
              <Link to="/find-jobs/profile"><span className="nav-link active js-scroll-trigger" style={{ paddingTop: 18 }} onClick={this.toggleMenu}>Profile</span></Link>
            </li>
            <li className="nav-item nav-link js-scroll-trigger" role="presentation">
              <Link to="/find-jobs/customers" ><span className="nav-link active js-scroll-trigger" style={{ paddingTop: 18 }} onClick={this.toggleMenu}>Customers</span></Link>
            </li> */}
            <li className="nav-item nav-link js-scroll-trigger" role="presentation">
              <MDBDropdown>
                <MDBDropdownToggle color="primary" outline style={{ borderRadius: "20px" }} >
                  menus
                  </MDBDropdownToggle>
                <MDBDropdownMenu basic>
                  <MDBDropdownItem><Link to="/find-jobs/products" style={{display: "inline"}} ><span className="active js-scroll-trigger" style={{color: "#212529"}} onClick={this.toggleMenu}>Products</span></Link></MDBDropdownItem>
                  <MDBDropdownItem divider />
                  <MDBDropdownItem><Link to="/find-jobs/customers" style={{display: "inline"}} ><span className="active js-scroll-trigger" style={{color: "#212529"}} onClick={this.toggleMenu}>Customers</span></Link></MDBDropdownItem>
                  <MDBDropdownItem divider />
                  <MDBDropdownItem><Link to="/find-jobs/employees" style={{display: "inline"}} ><span className="active js-scroll-trigger" style={{color: "#212529"}} onClick={this.toggleMenu}>Employees</span></Link></MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </li>
            <li className="nav-item nav-link js-scroll-trigger" role="presentation">
              <MDBDropdown>
                <MDBDropdownToggle color="primary" outline style={{ borderRadius: "20px" }} >
                  Add menus
                  </MDBDropdownToggle>
                <MDBDropdownMenu basic>
                  <MDBDropdownItem><span className="active js-scroll-trigger" style={{color: "#212529"}} onClick={(e) => this.toggleAddTypeModals("product")} >Add Product</span></MDBDropdownItem>
                  <MDBDropdownItem divider />
                  <MDBDropdownItem><span className="active js-scroll-trigger" style={{color: "#212529"}} onClick={(e) => this.toggleAddTypeModals("customer")} >Add Customer</span></MDBDropdownItem>
                  <MDBDropdownItem divider />
                  <MDBDropdownItem><span className="active js-scroll-trigger" style={{color: "#212529"}} onClick={(e) => this.toggleAddTypeModals("employee")} >Add Employee</span></MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </li>
            <li className="nav-item nav-link js-scroll-trigger" role="presentation">
              {this.state.cartModals ?
                <CartModals open={this.state.cartModals} toggle={this.toggleCart} style={{ borderRadius: "20px" }} />
                :
                <MDBBtn onClick={this.toggleCart} outline color="secondary" style={{ borderRadius: "20px", textAlign: "" }} name="cart">cart</MDBBtn>
              }

            </li>
            {userType}
            <li className="nav-item nav-link js-scroll-trigger" role="presentation">
              <Link to="/find-jobs/login"><MDBBtn type="button" style={{ borderRadius: "20px" }} outline color="danger" onClick={this.toggleMenu} name="logout">Logout</MDBBtn></Link>
            </li>

          </ul>
        </div>
      )
    } else {
      loginSuccess = (<Redirect to="/find-jobs/login" />)
    }
    return (
      <div className="Navbar">
        <nav className="navbar sticky-top navbar-dark bg-dark navbar-expand-md navbar navbar-expand-lg fixed-top" id="mainNav">
          <div className="container">
            <NavLink to="/find-jobs/home">
              <span className="navbar-brand js-scroll-trigger" style={{ paddingTop: 5 }} >Model-Figure</span>
            </NavLink>
            <button onClick={this.toggleMenu} className="navbar-toggler navbar-toggler-right" data-target="#navbarResponsive" type="button" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation"
              value="Menu"><i className="fa fa-bars"></i>
            </button>
            {loginSuccess}
            {this.state.addTypeModals ? <AddType type={this.state.typeModal} open={this.state.addTypeModals} toggle={this.toggleAddTypeModals.bind(this)} /> : <></>}
          </div>
        </nav>
      </div>
    );
  }
}

