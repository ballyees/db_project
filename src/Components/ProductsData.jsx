import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBCollapse, MDBBtn } from "mdbreact";
import LoadingPage from './LoadingPage';


export default class ProductsData extends React.Component {
    constructor(props) {
        super(props);
        this.searchRef = React.createRef()
        this.state = {
            data: [],
            options: [],
            collapseID: "",
            isLoading: true,
            optionsFilter: "productName",
            search : ""
        };
    }

    toggleCollapse = collapseID => () => {
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));
    }

    componentDidMount() {
        let fetch_data = async () => await this.props.Tokenizer.getProducts().then(
            data => {
                this.setState({ data: data, isLoading: false })
                console.log(data)
            }
        )
        fetch_data()
    }

    onChange = e => {
        const { name, value } = e.target
        console.log(name + " " + value)
        this.setState({
            [name]: value
        })
    }

    filterData = (data) => {
        return this.state.search.length < 2 || Boolean(data[this.state.optionsFilter].toUpperCase().match(this.state.search.toUpperCase()))
    }

    onClickReset = () => {
        this.searchRef.current.state.innerValue = ""
        this.setState({
            search: "",
            collapseID: "",
            optionsFilter: "productName"
        })
        
        console.log(this.state.collapseID, this.state.optionsFilter, this.state.search)
    }

    mapData(data) {
        return (
            <div className="row" key={data["productCode"]}>
                <div className="col-lg-12 col-md-12">
                    <MDBBtn color="primary" onClick={this.toggleCollapse(data["productCode"])} style={{ margin: 0, width: "100%" }} className="btn-primary btn Ripple-parent"  >
                        <div className="d-flex justify-content-between">
                            <div className="p-2 col-example text-left" style={{ padding: 0 }} >[{data["productCode"]}] {data["productName"]}</div>
                            <div className="p-2 col-example text-left" style={{ padding: 0 }} >Stock: {data["quantityInStock"]}</div>
                        </div>
                    </MDBBtn>
                    <MDBCollapse id={data["productCode"]} isOpen={this.state.collapseID}>
                        <div className="card">
                            <div className="card-body">
                                    <p className="card-text text-left" style={{fontSize: "16px"}}>
                                    Price : {data["buyPrice"]} <br/>
                                    Product Line : {data["productLine"]} <br/>
                                    MSRP : {data["MSRP"]} <br/>
                                    Scale: {data["productScale"]} <br/>
                                    Vendor: {data["productVendor"]} <br/>
                                    Product Description : {data["productDescription"]} <br/>
                                    </p>
                                <h5 className="card-text" style={{ textAlign: "right", color: "#33B5E5" }} >read more>></h5>
                            </div>
                        </div>
                    </MDBCollapse>
                </div>
            </div>)
    }

    cardJobseeker(element) {
        return (<div className="col-lg-12" style={{ paddingBottom: 4 }}>
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title" style={{ textAlign: "left" }}>Name ..........</h5>
                    <hr />
                    <p className="card-text">detail อะไรสักอย่างนี่แหละ</p>
                    <hr />
                    <h5 className="card-text" style={{ textAlign: "right", color: "#33B5E5" }} >read more>></h5>
                </div>
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
                                            <MDBCol sm="7">
                                                <MDBInput label="Search" outline name="search" onChange={this.onChange} ref={this.searchRef} />
                                            </MDBCol>
                                            <MDBCol sm="3" style={{ padding: "24px" }}>
                                                <select className="browser-default custom-select" name="optionsFilter" onChange={this.onChange} value={this.state.optionsFilter} >
                                                    <option value="productName">Product Name</option>
                                                    <option value="productLine">Product Line</option>
                                                    <option value="productCode">Product Code</option>
                                                    <option value="productVendor">Product Vendor</option>
                                                </select>
                                            </MDBCol>
                                            <MDBCol sm="2" style={{ padding: "15px" }}>
                                                <MDBBtn type="button" style={{borderRadius: "20px"}} outline color="danger" onClick={this.onClickReset} name="reset">Reset</MDBBtn>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBContainer>
                                </h4>
                                {this.state.data.filter(data => this.filterData(data)).map( data => (this.mapData(data)))}
                            </div>
                        </div>
                    </div>
                </div>
            );
    }
}