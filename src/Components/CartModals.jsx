import React from 'react'
import { MDBContainer, MDBJumbotron, MDBBtn, MDBInput, MDBModal, MDBModalBody, MDBModalHeader } from 'mdbreact';
import Style from 'style-it'    

export default class CartModals extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            modal: false,
            roleSize: 1,
            cart: [],
            productKey: {}
        }
    }
    
    toggle = (e) => {
        this.props.onClickP2C(e)
        this.setState({
            modal: !this.state.modal
        });
        if(e === undefined || e.target.name === 'close'){
            this.setState({
                modal: false,
                roleSize: 1,
            })
        }else if(e.target.name === 'submit'){
            this.SubmitBtn(e)
        }
    }

    sumPrice(){
        if (Boolean(this.props.cart.length)){
            let totalPrice = 0
            let totalNumber = 0
            for (let i=0; i < this.props.cart.length; i++ ){
                let val = parseInt(this.props.cart[i]["value"])
                totalPrice += val * parseInt(this.props.cart[i]["buyPrice"])
                totalNumber += val
            }
            return (
                <div>
                    <hr className="my-2" />
                    <div className="row" key="totalPrice">
                        <div className="col col-md-7 text-left" style={{ padding: "0px 0px 0px", margin: 0 }} >
                            <p style={{ padding: 30, margin: 0 }} >Total price: </p>
                        </div>
                        <div className="col col-md-2 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                            <p style={{ padding: 30, margin: 0 }} >[{totalPrice}]</p>
                        </div>
                        <div className="col col-md-3 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                            <p style={{ padding: 30, margin: 0 }} >{totalNumber}</p>
                        </div>
                        {/* <hr className="my-2" /> */}
                    </div>
                </div>
            )
        }else{
            return null
        }
    }
    
    componentDidUpdate(prevProps, prevState) {
        if (prevProps.cart !== this.props.cart){
            let productKey = {}
            for (let i=0; i < this.props.cart.length; i++ ){
                productKey[this.props.cart[i]["productCode"]] = parseInt(this.props.cart[i]["value"])
            }
            this.setState(prev => ({
                productKey: productKey,
                cart: this.props.cart
            }))
        }
      }

    mapData(data) {
        return (
            <div className="row" key={data["productCode"]}>
                {/* <div className="col" style={{ padding: 0, margin: 0 }}>
                    <div className="d-flex justify-content-between">
                        <div className="p-2 col-example text-left" style={{ padding: 0, margin: 0 }} >
                            <p style={{ padding: 27, margin: 0 }} >[{data["productCode"]}] {data["productName"]}</p>
                        </div>
                        <div className="p-2 col-example text-right" style={{ padding: 0, margin: 0 }} >
                            <p style={{ padding: 27, margin: 0 }} >[{data["buyPrice"]}]</p>
                        </div>
                        <div className="p-2 col-example text-right" style={{ padding: 0, margin: 0 }} >
                            <MDBInput label="value" name={data["productCode"]} onChange={this.onChange} onKeyPress={this.KeyPressEnter} type="number" value={this.state.productKey[data["productCode"]]} min={0} />
                        </div>
                    </div>
                </div> */}
                <div className="col col-md-7 text-left" style={{ padding: "0px 0px 0px", margin: 0 }} >
                    <p style={{ padding: 30, margin: 0 }} >[{data["productCode"]}] {data["productName"]}</p>
                </div>
                <div className="col col-md-2 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                    <p style={{ padding: 30, margin: 0 }} >[{data["buyPrice"]}]</p>
                </div>
                <div className="col col-md-3 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                    <MDBInput label="value" outline name={data["productCode"]} onChange={this.onChange} onKeyPress={this.KeyPressEnter} type="number" value={String(this.state.productKey[data["productCode"]])} min={0} />
                </div>
                {/* <hr className="my-2" /> */}
            </div>)
    }

    onChange = e => {
        const { name, value } = e.target
        if (this.state.productKey.hasOwnProperty(name)){
            let val = parseInt(value)
            if(isNaN(val)){
                val = 0
            }else if(value.length > 1 && value.startsWith("0")){
                val = parseInt(value.substring(1))
            }
            this.props.fn.onChangeCartValue(name, val)
            this.setState(prevState => ({
                productKey: {...prevState.productKey, ...{[name]: val}},
                [name]: val
            }))
        }
        else{
            this.setState({
                [name]: value
            })   
        }
    }

    SubmitBtn(e){
        console.log(this.state)   
    }

    render(){
        return (
            <div>
                <MDBBtn onClick={this.toggle} outline color="secondary" style={{borderRadius: "20px", textAlign: ""}} name="cart">cart</MDBBtn>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="lg">
                <MDBModalHeader toggle={this.toggle} style={{color: "rgb(0, 0, 0)"}}></MDBModalHeader>
                <MDBModalBody>
                    <MDBContainer style={{color: "rgb(0, 0, 0)"}}>
                        <MDBJumbotron style={{width: "100%", borderRadius: "7px"}}>
                            <h2>Cart</h2>
                            {this.props.cart.map(data => this.mapData(data))}
                            {this.sumPrice()}
                            <hr className="my-2" />
                            <Style>{`.submit:active {background-color: white;transform: translateY(4px);}`}
                                <MDBBtn name="submit" onClick={this.toggle} outline color="info" style={{borderRadius: "20px", width: "100%"}} className="submit">Submit</MDBBtn>
                            </Style>
                            <Style>{`.closed:active {background-color: white;transform: translateY(4px);}`}
                                <MDBBtn color="secondary" name="close" onClick={this.toggle} outline style={{borderRadius: "20px", width: "100%"}} className="closed" >Close</MDBBtn>
                            </Style>
                        </MDBJumbotron>
                    </MDBContainer>
                </MDBModalBody>
                </MDBModal>
            </div>
        )
    }
}