import React from 'react'
import { MDBContainer, MDBJumbotron, MDBBtn, MDBInput, MDBModal, MDBModalBody, MDBModalHeader } from 'mdbreact';
import Style from 'style-it'

export default class AddType extends React.Component {
    constructor(props) {
        super(props)
        this.state = ({
            modal: false,
            type: props.type, //customer, product, employee
            [props.type]: {},
        })
    }

    onChange = e => {
        const { name, value } = e.target
        this.setState(prevState =>({
            [prevState.type]: { ...prevState[prevState.type], ...{[name]: value}}
        }))
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
                                        {this.props.data["productCode"]}
                                        <hr className="my-2" />
                                        <Style>{`.submit:active {background-color: white;transform: translateY(4px);}`}
                                            <MDBBtn name="submit" onClick={this.props.toggle} outline color="info" style={{ borderRadius: "20px", width: "100%" }} className="submit">Submit</MDBBtn>
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
                return null
            default:
                return null
        }
    }
}