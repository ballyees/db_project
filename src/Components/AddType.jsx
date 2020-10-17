import React from 'react'
import { MDBContainer, MDBJumbotron, MDBBtn, MDBInput, MDBModal, MDBModalBody, MDBModalHeader } from 'mdbreact';
import Style from 'style-it'

export default class AddType extends React.Component {
    constructor(props) {
        super(props)
        this.state = ({
            modal: props.open,
            type: props.type, //customer, product, employee
            [props.type]: {},
        })
        console.log('propssss',props)
    }

    onSubmit = e => {
        this.props.toggle()
    }

    toggle = e => {
        this.setState(prevState => ({
            modal: !prevState.modal
        }))
    }

    onChange = e => {
        const { name, value } = e.target
        console.log(name, value)
        this.setState(prevState => ({
            [prevState.type]: { ...prevState[prevState.type], ...{ [name]: value } }
        }))
    }
    
    componentDidMount(){

    }

    onPressEnter = e => {
        // console.log(e.key)
        if (e.key === 'Enter' || e.keyCode === 13) {
            e.preventDefault()
        }
    }

    render() {
        switch (this.props.type) {
            case "product":
                return (
                    <div>
                        <MDBModal isOpen={this.state.modal} toggle={this.state.toggle} size="lg">
                            <MDBModalHeader toggle={this.state.toggle} style={{ color: "rgb(0, 0, 0)" }}></MDBModalHeader>
                            <MDBModalBody>
                                <MDBContainer style={{ color: "rgb(0, 0, 0)" }}>
                                    <MDBJumbotron style={{ width: "100%", borderRadius: "7px" }}>
                                        <h2>Add Product</h2>
                                        <div className="row">
                                            <div className="col col-md-6 text-left" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="Product Code" outline name="productCode" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
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
                                                <MDBInput label="MSRP" outline name="MSRP" onChange={this.onChange} onKeyPress={this.KeyPressEnter} type="number" min={0} />
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
                        <MDBModal isOpen={this.state.modal} toggle={this.state.toggle} size="lg">
                            <MDBModalHeader toggle={this.state.toggle} style={{ color: "rgb(0, 0, 0)" }}></MDBModalHeader>
                            <MDBModalBody>
                                <MDBContainer style={{ color: "rgb(0, 0, 0)" }}>
                                    <MDBJumbotron style={{ width: "100%", borderRadius: "7px" }}>
                                        <h2>Employee</h2>
                                        <div className="row">
                                            <div className="col col-md-6 text-left" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="EmployeeNumber" outline name="EmployeeNumber" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-6 text-left" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="Lastname" outline name="Lastname" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-6 text-left" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="Firstname" outline name="Firstname" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-6 text-left" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="Extension" outline name="Extension" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-6 text-left" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="Email" outline name="Email" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-6 text-left" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="Officecode" outline name="Officecode" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-6 text-left" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="ReportsTo" outline name="ReportsTo" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-6 text-left" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="JobTitle" outline name="JobTitle" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
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
            case "customer":
                return (
                    <div>
                        <MDBModal isOpen={this.state.modal} toggle={this.state.toggle} size="lg">
                            <MDBModalHeader toggle={this.state.toggle} style={{ color: "rgb(0, 0, 0)" }}></MDBModalHeader>
                            <MDBModalBody>
                                <MDBContainer style={{ color: "rgb(0, 0, 0)" }}>
                                    <MDBJumbotron style={{ width: "100%", borderRadius: "7px" }}>
                                        <h2>Customer</h2>
                                        <div className="row">
                                            <div className="col col-md-6 text-left" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="Customer Number" outline name="Customer Number" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-6 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="Customer Name" outline name="CustomerName" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-6 text-left" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="ContactLastName" outline name="ContactLastName" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-6 text-left" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="ContactFirstName" outline name="ContactFirstName" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-6 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="Phone Number" outline name="Phone number" onChange={this.onChange}  onKeyPress={this.KeyPressEnter}/>
                                            </div>
                                            <div className="col col-md-12 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="addressLine1" outline name="addressLine1"onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-12 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="addressLine2" outline name="addressLine2"onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-6 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="City" outline name="City" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-6 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="State" outline name="City" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-6 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="Postalcode" outline name="Postalcode" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-6 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="Contry" outline name="Contry" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-6 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="salesRepEmployeeNumber" outline name="salesRepEmployeeNumber" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-6 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="creditLimit" outline name="creditLimit" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
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