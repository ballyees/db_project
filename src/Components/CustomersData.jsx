import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBCollapse, MDBBtn } from "mdbreact";
import LoadingPage from './LoadingPage';
import EditModals from './EditModals';

export default class CustomersData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            options: [],
            collapseID: "",
            isLoading: true,
            search: "",
            modalsEdit: false,
            dataForModals: {},
        };
    }

    toggleModal() {
        this.setState(prevState => ({
            modalsEdit: !prevState.modalsEdit
        }))
    }

    toggleCollapse = collapseID => () => {
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));
        console.log(this.state.collapseID)
    }

    componentDidMount() {
        let fetch_data = async () => await window.$Connector.getCustomers().then(
            data => {
                this.setState({ data: data, isLoading: false, keysData: Object.keys(data[0]) })
                console.log(Object.keys(data[0]))
            }
        )
        fetch_data()
    }

    onChange = e => {
        const { name, value } = e.target
        if (!Boolean(value.match(/[*+\-?^${}()|[\]\\]/g))) {
            this.setState({
                [name]: value
            })
        } else {
            this.setState(prevState => ({
                [name]: prevState[name]
            }))
        }
    }

    filterData = (data) => {
        if (this.state.search.length < 2) {
            return true
        } else {
            let allS = ''
            for (let i = 0; i < this.state.keysData.length; i++) {
                allS += data[this.state.keysData[i]] ? data[this.state.keysData[i]].toUpperCase() + ' ' : ''
            }
            return Boolean(allS.match(this.state.search.toUpperCase()))
        }
    }

    onClickEdit = () => {
        let index = this.state.data.findIndex(d => d["customerNumber"] === this.state.collapseID)
        if (Boolean(~index)) {
            this.setState(prevState => ({
                modalsEdit: !prevState.modalsEdit,
                dataForModals: { ...this.state.data[index] }
            }))
        }
    }

    onClickDelete = () => {
        if (window.confirm(`Are you sure to delete id: ${this.state.collapseID}`)) {
            let filter = (data) => !(data["customerNumber"] === this.state.collapseID)
            this.setState(prevState => ({
                data: prevState.data.filter(d => filter(d)),
                collapseID: ""
            }))
        }
    }

    addCustomerToCart = (customer) => {
        if (!localStorage.getItem('cart')) {
            localStorage.setItem('cart', JSON.stringify({ data: {}, customer: '', promoCode: '' }));
        }
        let cart = JSON.parse(localStorage.getItem('cart'))
        cart.customer = { ...customer }
        // if(cart.data.hasOwnProperty(product["customerNumber"])){
        //   cart.data[product["customerNumber"]] = {...product, ...{value: cart.data[product["customerNumber"]].value + 1}}
        // }else{
        //   cart.data[product["customerNumber"]] = {...product, ...{value: 1}}
        // }
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('change:', cart)
    }

    onClickAdd = () => {
        let index = this.state.data.findIndex(d => d["customerNumber"] === this.state.collapseID)
        if (Boolean(~index)) {
            this.addCustomerToCart({ ...this.state.data[index] })
        }
    }

    onClickReset = () => {
        this.setState({
            search: "",
            collapseID: "",
        })
        localStorage.clear()
    }

    onPressEnter = e => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            e.preventDefault()
        }
    }

    mapData(data) {
        return (
            <div className="row" key={data["customerNumber"]}>
                <div className="col-lg-12 col-md-12">
                    <MDBBtn color="primary" onClick={this.toggleCollapse(data["customerNumber"])} style={{ margin: 0, width: "100%" }} className="btn-primary btn Ripple-parent"  >
                        <div className="d-flex justify-content-between">
                            <div className="p-2 col-example text-left" style={{ padding: 0 }} >[{data["customerNumber"]}] {data["customerName"]}</div>
                            <div className="p-2 col-example text-left" style={{ padding: 0 }} >Credit Limit: {data["creditLimit"]}</div>
                        </div>
                    </MDBBtn>
                    <MDBCollapse id={String(data["customerNumber"])} isOpen={this.state.collapseID===data["customerNumber"]} >
                        <div className="card">
                            <div className="card-body">
                                <p className="card-text text-left" style={{ fontSize: "16px" }}>
                                    Contact : {data["contactFirstName"]} {data["contactLastName"]} <br />
                                Phone Number : {data["phone"]} <br />
                                Address Line1 : {data["addressLine1"]} <br />
                                    {data["addressLine2"] ? "Address Line2 : " + data["addressLine2"] : null}{data["addressLine2"] ? <br /> : null}
                                City: {data["city"]} <br />
                                    {data["state"] ? "State: " + data["state"] : null}{data["state"] ? <br /> : null}
                                    {data["postalCode"] ? "Postal Code : " + data["postalCode"] : null}{data["postalCode"] ? <br /> : null}
                                Country : {data["country"]} <br />
                                Sales Representatives Number : {data["salesRepEmployeeNumber"] ? `${data["salesRepEmployeeNumber"]} [${data["firstName"]} ${data["lastName"]}]` : "None"}  <br />
                                </p>
                                <hr />
                                <MDBContainer>
                                    <MDBRow>
                                        <MDBCol sm="4">
                                            <MDBBtn type="button" style={{ borderRadius: "20px", width: "100%" }} outline color="info" onClick={this.onClickAdd} name="add">add</MDBBtn>
                                        </MDBCol>
                                        <MDBCol sm="4">
                                            <MDBBtn type="button" style={{ borderRadius: "20px", width: "100%" }} outline color="warning" onClick={this.onClickEdit} name="edit">edit</MDBBtn>
                                        </MDBCol>
                                        <MDBCol sm="4">
                                            <MDBBtn type="button" style={{ borderRadius: "20px", width: "100%" }} outline color="danger" onClick={this.onClickDelete} name="delete">delete</MDBBtn>
                                        </MDBCol>
                                    </MDBRow>
                                </MDBContainer>
                            </div>
                        </div>

                    </MDBCollapse>
                </div>
            </div>)
    }

    render() {
        return this.state.isLoading ? <LoadingPage /> :
            (
                <div className="row">
                    <div className="col-md-10 offset-md-1">
                        <div className="card">
                            <div className="card-body">
                                <h4 className="card-title">
                                    <MDBContainer>
                                        <MDBRow>
                                            <MDBCol sm="8">
                                                <MDBInput label="Search" outline name="search" onChange={this.onChange} onKeyUp={this.onPressEnter} value={this.state.search} />
                                            </MDBCol>
                                            <MDBCol sm="4" style={{ padding: "15px" }}>
                                                <MDBBtn type="button" style={{ borderRadius: "20px" }} outline color="danger" onClick={this.onClickReset} name="reset">Reset</MDBBtn>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBContainer>
                                </h4>
                                {this.state.data.filter(data => this.filterData(data)).map(data => (this.mapData(data)))}
                                {this.state.modalsEdit ? <EditModals type="customer" open={this.state.modalsEdit} data={this.state.dataForModals} toggle={this.toggleModal.bind(this)} /> : <></>}
                            </div>
                        </div>
                    </div>
                </div>
            );
    }
}