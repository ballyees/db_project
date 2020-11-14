import React from 'react'
import { MDBContainer, MDBJumbotron, MDBBtn, MDBInput, MDBModal, MDBModalBody, MDBModalHeader } from 'mdbreact';
import Style from 'style-it'
import Configure from './Configure';

export default class AddModals extends React.Component {
    constructor(props) {
        super()
        this.state = ({
            modal: props.open,
            type: props.type, //customer, product, employee
            [props.type]: Configure.addData(props.type),
        })
        console.log('propssss',props)
    }

    onSubmit = e => {
        // e.preventDefault();
        console.log(this.state)
        let type = this.state.type
        if(type === "customer"){
            window.$Connector.addCustomer(this.state[type])
        }
        // this.props.toggle()
    }

    toggle = e => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
        if (e === undefined || e.target.name === 'close') {
            this.props.toggle(e)
            this.setState({
                modal: false,
            })
        } else if (e.target.name === 'submit') {
            this.SubmitBtn(e)
        }
    }

    onChange = e => {
        const { name, value } = e.target
        console.log(name, value)
        this.setState(prevState => ({
            [prevState.type]: { ...prevState[prevState.type], ...{ [name]: value } }
        }))
    }

    onPressEnter = e => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            e.preventDefault()
        }
    }

    render() {
        switch (this.props.type) {
            case "product":
                return (
                    <div>
                        <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="lg">
                            <MDBModalHeader toggle={this.toggle} style={{ color: "rgb(0, 0, 0)" }}></MDBModalHeader>
                            <MDBModalBody>
                                <MDBContainer style={{ color: "rgb(0, 0, 0)" }}>
                                    <MDBJumbotron style={{ width: "100%", borderRadius: "7px" }}>
                                        <h2>Add Product</h2>
                                        <div className="row">
                                            <div className="col col-md-6 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="Product Name" outline name="productName" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-6 text-left" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="Product Line" outline name="productLine" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-6 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="Product Scale" outline name="productScale" onChange={this.onChange} onKeyPress={this.KeyPressEnter} type="number" min={0} />
                                            </div>
                                            <div className="col col-md-12 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="Product Vendor" outline name="productVendor" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-12 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="Product Description" outline name="productDescription" onChange={this.onChange} onKeyPress={this.KeyPressEnter} type="textarea" />
                                            </div>
                                            <div className="col col-md-6 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="Quantity In Stock" outline name="quantityInStock" onChange={this.onChange} onKeyPress={this.KeyPressEnter} type="number" min={0} />
                                            </div>
                                            <div className="col col-md-6 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="Buy Price" outline name="buyPrice" onChange={this.onChange} onKeyPress={this.KeyPressEnter} type="number" min={0} />
                                            </div>
                                            <div className="col col-md-6 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="MSRP" outline name="MSRP" onChange={this.onChange} onKeyPress={this.KeyPressEnter} type="number" min={0} valueDefault={0} />
                                            </div>
                                        </div>
                                        <hr className="my-2" />
                                        <Style>{`.submit:active {background-color: white;transform: translateY(4px);}`}
                                            <MDBBtn name="submit" onClick={this.onSubmit} outline color="info" style={{ borderRadius: "20px", width: "100%" }} className="submit">Submit</MDBBtn>
                                        </Style>
                                        <Style>{`.closed:active {background-color: white;transform: translateY(4px);}`}
                                            <MDBBtn color="secondary" name="close" onClick={this.props.toggle} outline style={{ borderRadius: "20px", width: "100%" }} className="closed" >Close</MDBBtn>
                                        </Style>
                                    </MDBJumbotron>
                                </MDBContainer>
                            </MDBModalBody>
                        </MDBModal>
                    </div>
                )
            case "employee":
                return (
                    <div>
                        <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="lg">
                            <MDBModalHeader toggle={this.toggle} style={{ color: "rgb(0, 0, 0)" }}></MDBModalHeader>
                            <MDBModalBody>
                                <MDBContainer style={{ color: "rgb(0, 0, 0)" }}>
                                    <MDBJumbotron style={{ width: "100%", borderRadius: "7px" }}>
                                        <h2>Employee</h2>
                                        <div className="row">
                                            <div className="col col-md-12 text-left" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="Employee Number" outline name="employeeNumber" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-6 text-left" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="Last Name" outline name="lastName" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-6 text-left" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="First Name" outline name="firstName" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-6 text-left" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="Extension" outline name="extension" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-6 text-left" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="Email" outline name="email" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-6 text-left" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="Office Code" outline name="officeCode" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-6 text-left" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="Reports To" outline name="reportsTo" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-6 text-left" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="Job Title" outline name="jobTitle" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                        </div>
                                        <hr className="my-2" />
                                        <Style>{`.submit:active {background-color: white;transform: translateY(4px);}`}
                                            <MDBBtn name="submit" onClick={this.onSubmit} outline color="info" style={{ borderRadius: "20px", width: "100%" }} className="submit" >Submit</MDBBtn>
                                        </Style>
                                        <Style>{`.closed:active {background-color: white;transform: translateY(4px);}`}
                                            <MDBBtn color="secondary" name="close" onClick={this.props.toggle} outline style={{ borderRadius: "20px", width: "100%" }} className="closed" >Close</MDBBtn>
                                        </Style>
                                    </MDBJumbotron>
                                </MDBContainer>
                            </MDBModalBody>
                        </MDBModal>
                    </div>
                )
            case "customer":
                return (
                    <div>
                        <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="lg">
                            <MDBModalHeader toggle={this.toggle} style={{ color: "rgb(0, 0, 0)" }}></MDBModalHeader>
                            <MDBModalBody>
                                <MDBContainer style={{ color: "rgb(0, 0, 0)" }}>
                                    <MDBJumbotron style={{ width: "100%", borderRadius: "7px" }}>
                                        <h2>Customer</h2>
                                        <div className="row">
                                            <div className="col col-md-6 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="Customer Name" outline name="customerName" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-6 text-left" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="Contact LastName" outline name="contactLastName" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-6 text-left" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="Contact FirstName" outline name="contactFirstName" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-6 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="Phone Number" outline name="phone" onChange={this.onChange}  onKeyPress={this.KeyPressEnter}/>
                                            </div>
                                            <div className="col col-md-12 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="Address Line1" outline name="addressLine1"onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-12 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="Address Line2" outline name="addressLine2"onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-6 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="City" outline name="city" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-6 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="State" outline name="state" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-6 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="Postalcode" outline name="postalCode" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-6 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="Country" outline name="country" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-6 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="salesRepEmployeeNumber" outline name="salesRepEmployeeNumber" onChange={this.onChange} onKeyPress={this.KeyPressEnter} type="number" />
                                            </div>
                                            <div className="col col-md-6 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="creditLimit" outline name="creditLimit" onChange={this.onChange} onKeyPress={this.KeyPressEnter} type="number" min={0} />
                                            </div>
                                        </div>
                                        <hr className="my-2" />
                                        <Style>{`.submit:active {background-color: white;transform: translateY(4px);}`}
                                            <MDBBtn name="submit" onClick={this.onSubmit} outline color="info" style={{ borderRadius: "20px", width: "100%" }} className="submit">Submit</MDBBtn>
                                        </Style>
                                        <Style>{`.closed:active {background-color: white;transform: translateY(4px);}`}
                                            <MDBBtn color="secondary" name="close" onClick={this.props.toggle} outline style={{ borderRadius: "20px", width: "100%" }} className="closed" >Close</MDBBtn>
                                        </Style>
                                    </MDBJumbotron>
                                </MDBContainer>
                            </MDBModalBody>
                        </MDBModal>
                    </div>
                )
            default:
                return null
        }
    }
}