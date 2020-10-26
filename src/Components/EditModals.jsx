import React from 'react'
import { MDBContainer, MDBJumbotron, MDBBtn, MDBInput, MDBModal, MDBModalBody, MDBModalHeader } from 'mdbreact';
import Style from 'style-it'

export default class EditModals extends React.Component {
    constructor(props) {
        super(props)
        this.state = ({
            ...{
                modal: false,
                type: props.type, //customer, product, employee
            }, ...props.data
        })
        console.log("props con:", props, this.state)
    }

    onSubmit = e => {
        // this.SubmitBtn()
        this.props.toggle()
        this.props.submitFn.setLoading()
        this.props.submitFn.fetch()
    }

    onChange = e => {
        const { name, value } = e.target
        let val = value
        if(name === "creditLimit"){
            if (val.length > 1 && val.startsWith("0")) {
                val = parseFloat(val.substring(1))
            }
            val = (val<0)?"0":`${val}`
        }
        this.setState({
            [name]: val
        })
    }

    SubmitBtn(e) {
        console.log(this.state)
    }

    render() {
        switch (this.props.type) {
            case "product":
                return (
                    <div>
                        <MDBModal isOpen={this.props.open} toggle={this.props.toggle} size="lg">
                            <MDBModalHeader toggle={this.props.toggle} style={{ color: "rgb(0, 0, 0)" }}></MDBModalHeader>
                            <MDBModalBody>
                                <MDBContainer style={{ color: "rgb(0, 0, 0)" }}>
                                    <MDBJumbotron style={{ width: "100%", borderRadius: "7px" }}>
                                        <h2>Edit Product</h2>
                                        <div className="row">
                                            <div className="col col-md-6 text-left" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput disabled label="Product Code" outline name="productCode" value={this.state["productCode"]} onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-12 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="Product Line" outline name="productLine" value={this.state["productLine"]} onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-6 text-left" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="MSRP" outline name="MSRP" value={this.state["MSRP"]} onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <br></br>
                                            <div className="col col-md-6 text-left" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="Price" outline name="buyPrice" value={this.state["buyPrice"]} onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-6 text-left" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="Scale" outline name="productScale" value={this.state["productScale"]} onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-12 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="Product Vendor" outline name="productVendor" value={this.state["productVendor"]} onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-12 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="Product Description" rows={5} outline name="productDescription" value={this.state["productDescription"]} onChange={this.onChange} onKeyPress={this.KeyPressEnter} type="textarea" />
                                            </div>
                                            <div className="col col-md-6 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="Quantity In Stock" outline name="quantityInStock" value={this.state["quantityInStock"]} onChange={this.onChange} onKeyPress={this.KeyPressEnter} type="number" min={0} />
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
                return null
            case "customer":
                return (
                    <div>
                        <MDBModal isOpen={this.props.open} toggle={this.props.toggle} size="lg">
                            <MDBModalHeader toggle={this.props.toggle} style={{ color: "rgb(0, 0, 0)" }}></MDBModalHeader>
                            <MDBModalBody>
                                <MDBContainer style={{ color: "rgb(0, 0, 0)" }}>
                                    <MDBJumbotron style={{ width: "100%", borderRadius: "7px" }}>
                                        <h2>Edit Customer</h2>
                                        <div className="row">
                                            <div className="col col-md-6 text-left" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput disabled label="Customer Number" outline name="customerNumber" value={this.state["customerNumber"]} onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-12 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="Customer Name" outline name="customerName" value={this.state["customerName"]} onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-6 text-left" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="Contact Last Name" outline name="contactLastName" value={this.state["contactLastName"]} onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <br></br>
                                            <div className="col col-md-6 text-left" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="contact First Name" outline name="contactFirstName" value={this.state["contactFirstName"]} onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-6 text-left" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="Phone" outline name="phone" value={this.state["phone"]} onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-12 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="Address Line1" outline name="addressLine1" value={this.state["addressLine1"]} onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-12 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="Address Line2" outline name="addressLine2" value={this.state["addressLine2"]} onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-12 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="City" outline name="city" value={this.state["city"]} onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-12 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="State" outline name="state" value={this.state["state"]} onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-12 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="Postal Code" outline name="postalCode" value={this.state["postalCode"]} onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-12 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="Country" outline name="country" value={this.state["country"]} onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-12 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="Sales Representatives Employee Number" outline name="salesRepEmployeeNumber" value={this.state["salesRepEmployeeNumber"]} onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                                            </div>
                                            <div className="col col-md-12 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                                <MDBInput label="Credit Limit" outline name="creditLimit" value={this.state["creditLimit"]} onChange={this.onChange} onKeyPress={this.KeyPressEnter} type="number" min={0.00} />
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