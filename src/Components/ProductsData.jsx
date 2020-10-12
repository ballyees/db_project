import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBCollapse, MDBBtn } from "mdbreact";
import LoadingPage from './LoadingPage';


export default class ProductsData extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            options: [],
            collapseID: "",
            isLoading: true
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
                this.setState({ data: [...data], isLoading: false })
                // console.log(data)
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

    mapData(data) {
        return (
            <div className="row" key={data["productCode"]}>
                <div className="col-lg-12 col-md-12">
                    <MDBBtn color="primary" onClick={this.toggleCollapse(data["productCode"])} style={{ margin: 0, width: "100%" }} className="btn-primary btn Ripple-parent" >
                        <div className="d-flex justify-content-between">
                            <div className="p-2 col-example text-left" style={{ padding: 0 }} >[{data["productCode"]}] {data["productName"]}</div>
                            <div className="p-2 col-example text-left" style={{ padding: 0 }} >Flex item 2</div>
                        </div>
                    </MDBBtn>
                    <MDBCollapse id={data["productCode"]} isOpen={this.state.collapseID}>
                        <div className="card">
                            <div className="card-body">
                                    <p className="card-text text-left" style={{fontSize: "16px"}}>
                                    detail อะไรสักอย่างนี่แหละ <br/>
                                    ราคาแนะนำในการขายปลีก : {data["MSRP"]}
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
        let cJ = this.cardJobseeker(10)
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
                                                <MDBInput label="Search" outline name="search" onChange={this.onChange} />
                                            </MDBCol>
                                            <MDBCol sm="4" style={{ padding: "24px" }}>
                                                <select className="browser-default custom-select" name="optionsFilter" onChange={this.onChange}>
                                                    <option value="1">Option 1</option>
                                                    <option value="2">Option 2</option>
                                                    <option value="3">Option 3</option>
                                                </select>
                                            </MDBCol>
                                        </MDBRow>
                                    </MDBContainer>
                                </h4>
                                {this.state.data.map(
                                    data => (this.mapData(data))
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            );
    }
}