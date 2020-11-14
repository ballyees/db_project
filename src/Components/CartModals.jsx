import React from 'react'
import { MDBContainer, MDBJumbotron, MDBBtn, MDBInput, MDBModal, MDBModalBody, MDBModalHeader } from 'mdbreact';
import Style from 'style-it'
import CarbonDatePicker from 'react-carbon-datepicker';

export default class CartModals extends React.Component {
    constructor(props) {
        super(props)
        let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {}
        let cartData = cart.hasOwnProperty('data') ? cart.data : {}
        let cartCus = cart.hasOwnProperty('customer') ? cart.customer : {}
        let cartPromo = cart.hasOwnProperty('promoCode') ? cart.promoCode : {}
        this.state = {
            modal: props.open,
            cart: cartData,
            cartCustomer: cartCus,
            cartPromotion: cartPromo,
            shippingDate: '',
            isShippingDate: false
        }
    }

    toggle = (e) => {
        this.setState({
            modal: !this.state.modal
        });
        if (e === undefined || e.target.name === 'close') {
            this.props.toggle(e)
            this.setState({
                modal: false,
            })
        } else if (e.target.name === 'submit') {
            this.SubmitBtn(e)
        }
    }

    sumPrice() {
        let key = Object.keys(this.state.cart)
        if (Boolean(key.length)) {
            let totalPrice = 0
            let totalNumber = 0
            for (let i = 0; i < key.length; i++) {
                let val = parseInt(this.state.cart[key[i]]["value"])
                totalPrice += val * parseFloat(this.state.cart[key[i]]["buyPrice"]).toFixed(2)
                totalNumber += val
            }
            let totalPoint = window.$nf.format((Math.floor(totalPrice / 100) * 3))
            console.log(totalPoint)
            return (
                <div>
                    <hr className="my-2" />
                    <div className="row" key="totalPrice">
                        <div className="col col-md-6 text-left" style={{ padding: "0px 0px 0px", margin: 0 }} >
                            <p style={{ padding: 30, margin: 0 }} >Total price: </p>
                        </div>
                        <div className="col col-md-3 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                            <p style={{ padding: 30, margin: 0 }} >[{window.$nf.format(totalPrice.toFixed(2))}]</p>
                        </div>
                        <div className="col col-md-3 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                            <p style={{ padding: 30, margin: 0 }} >{window.$nf.format(totalNumber)}</p>
                        </div>
                        {/* <hr className="my-2" /> */}
                    </div>
                    <div className="row" key="totalPoint">
                        <div className="col col-md-6 text-left" style={{ padding: "0px 0px 0px", margin: 0 }} >
                            <p style={{ padding: 30, margin: 0 }} >Total points: </p>
                        </div>
                        <div className="col col-md-3 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                            <p style={{ padding: 30, margin: 0 }} ></p>
                        </div>
                        <div className="col col-md-3 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                            <p style={{ padding: 30, margin: 0 }} >{totalPoint}</p>
                        </div>
                        {/* <hr className="my-2" /> */}
                    </div>
                    {this.state.cartCustomer.hasOwnProperty("customerName") ? (
                    <>
                        <hr className="my-2" />
                        <div className="row" key="Balance">
                            <div className="col col-md-6 text-left" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                <p style={{ padding: 30, margin: 0 }} >Balance Credit: </p>
                            </div>
                            <div className="col col-md-3 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                            <p style={{ padding: 30, margin: 0 }} >[{window.$nf.format((this.state.cartCustomer["creditLimit"] - totalPrice).toFixed(2))}]</p>
                            </div>
                            <div className="col col-md-3 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                <p style={{ padding: 30, margin: 0 }} >{window.$nf.format((this.state.cartCustomer["creditLimit"]).toFixed(2))}</p>
                            </div>
                        </div>
                        <div className="row" key="shippingDate">
                            <div className="col col-md-6 text-left" style={{ padding: "0px 0px 0px", margin: 0 }} >
                                <p style={{ padding: 30, margin: 0 }} >Shipping Date: </p>
                            </div>
                            <div className="col col-md-1 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                            <p style={{ padding: 30, margin: 0 }} ></p>
                            </div>
                            <div className="col col-md-5 text-right" style={{ padding: 30, margin: 0 }} >
                                <CarbonDatePicker onChange={dateTimeStamp => {
                                    let date = new Date(dateTimeStamp)
                                    let formatDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDay()}`
                                    // console.log(this.state.isShippingDate, this.state.shippingDate)
                                    this.setState({
                                        shippingDate: formatDate,
                                        isShippingDate: true
                                    })
                                    }
                                } />
                            </div>
                        </div>
                        {/* <hr className="my-2" /> */}
                    </>
                    ) : null}
                    
                </div>
            )
        } else {
            return null
        }
    }

    onChangeCartValue(productKey, value) {
        let cart = JSON.parse(localStorage.getItem('cart'))
        cart.data[productKey] = { ...cart.data[productKey], ...{ value: value } }
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // componentDidUpdate(prevProps, prevState) {
    //     console.log(prevState, this.state)
    // }

    onChange = e => {
        const { name, value } = e.target
        let val = parseInt(value)
        if (isNaN(val)) {
            val = 0
        } else if (value.length > 1 && value.startsWith("0")) {
            val = parseInt(value.substring(1))
        }
        if (val >= this.state.cart[name]["quantityInStock"]) {
            val = this.state.cart[name]["quantityInStock"]
        }
        this.onChangeCartValue(name, val)
        this.setState(prevState => ({
            cart: { ...prevState.cart, ...{ [name]: { ...prevState.cart[name], ...{ value: val } } } }
        }))
    }

    mapData(data) {
        return (
            <div className="row" key={data["productCode"]}>
                <div className="col col-md-6 text-left" style={{ padding: "0px 0px 0px", margin: 0 }} >
                    <p style={{ padding: 30, margin: 0 }} >[{data["productCode"]}] {data["productName"]}</p>
                </div>
                <div className="col col-md-3 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                    <p style={{ padding: 30, margin: 0 }} >[{window.$nf.format(data["buyPrice"])}]</p>
                </div>
                <div className="col col-md-3 text-right" style={{ padding: "0px 0px 0px", margin: 0 }} >
                    <MDBInput label="value" outline name={data["productCode"]} onChange={this.onChange} onKeyPress={this.KeyPressEnter} type="number" value={String(data.value)} min={0} max={data["quantityInStock"]} />
                </div>
            </div>)
    }

    SubmitBtn = (e) => {
        console.log(this.state)
    }

    render() {
        return (
            <div>
                <MDBBtn onClick={this.toggle} outline color="secondary" style={{ borderRadius: "20px", textAlign: "" }} name="cart">cart</MDBBtn>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="lg">
                    <MDBModalHeader toggle={this.toggle} style={{ color: "rgb(0, 0, 0)" }}></MDBModalHeader>
                    <MDBModalBody>
                        <MDBContainer style={{ color: "rgb(0, 0, 0)" }}>
                            <MDBJumbotron style={{ width: "100%", borderRadius: "7px" }}>
                                <h2>Cart {this.state.cartCustomer.hasOwnProperty("customerName") ? "for " + this.state.cartCustomer["customerName"] : null}</h2>
                                {/* {this.props.cart.map(data => this.mapData(data))} */}
                                {Object.keys(this.state.cart).map(key => this.mapData(this.state.cart[key]))}
                                {this.sumPrice()}
                                <hr className="my-2" />
                                <Style>{`.submit:active {background-color: white;transform: translateY(4px);}`}
                                    <MDBBtn name="submit" onClick={this.SubmitBtn} outline color="info" style={{ borderRadius: "20px", width: "100%" }} className="submit">Submit</MDBBtn>
                                </Style>
                                <Style>{`.closed:active {background-color: white;transform: translateY(4px);}`}
                                    <MDBBtn color="secondary" name="close" onClick={this.toggle} outline style={{ borderRadius: "20px", width: "100%" }} className="closed" >Close</MDBBtn>
                                </Style>
                            </MDBJumbotron>
                        </MDBContainer>
                    </MDBModalBody>
                </MDBModal>
            </div>
        )
    }
}