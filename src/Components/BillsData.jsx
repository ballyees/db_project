import React from 'react'
import { MDBContainer, MDBRow, MDBCol, MDBInput, MDBCollapse, MDBBtn } from "mdbreact";
import LoadingPage from './LoadingPage';
import EditModals from './EditModals';


export default class BillsData extends React.Component {
    constructor(props) {
        super();
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

    setLoading = () => {
        this.setState({isLoading: true, collapseID: ""})
    }

    toggleCollapse = collapseID => () => {
        this.setState(prevState => ({
            collapseID: prevState.collapseID !== collapseID ? collapseID : ""
        }));
        console.log(this.state.collapseID)
    }

    fetch_data = async () => await window.$Connector.getAllBills().then(
        data => {
            console.log(Object.keys(data[0]))
            this.setState({ data: data, isLoading: false, keysData: Object.keys(data[0]) })
        }
    )

    componentDidMount() {
        this.fetch_data()
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
                allS += data[this.state.keysData[i]] ? String(data[this.state.keysData[i]]).toUpperCase() + ' ' : ''
            }
            return Boolean(allS.match(this.state.search.toUpperCase()))
        }
    }

    onClickEdit = () => {
        let index = this.state.data.findIndex(d => d["orderNumber"] === this.state.collapseID)
        if (Boolean(~index)) {
            this.setState(prevState => ({
                modalsEdit: !prevState.modalsEdit,
                dataForModals: { ...this.state.data[index] }
            }))
        }
    }

    onClickReset = () => {
        this.setState({
            search: "",
            collapseID: "",
        })
    }

    onPressEnter = e => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            e.preventDefault()
        }
    }

    mapData(data) {
        return (
            <div className="row" key={data["orderNumber"]}>
                <div className="col-lg-12 col-md-12">
                    <MDBBtn color="orange" onClick={this.toggleCollapse(data["orderNumber"])} style={{ margin: 0, width: "100%" }} className="btn-primary btn Ripple-parent"  >
                        <div className="d-flex justify-content-between">
                            <div className="p-2 col-example text-left" style={{ padding: 0 }} >[{data["orderNumber"]}] Customer Number: {data["customerNumber"]}</div>
                            <div className="p-2 col-example text-left" style={{ padding: 0 }} >Status: {data["status"]}</div>
                        </div>
                    </MDBBtn>
                    <MDBCollapse id={String(data["orderNumber"])} isOpen={this.state.collapseID===data["orderNumber"]} >
                        <div className="card">
                            <div className="card-body">
                                <p className="card-text text-left" style={{ fontSize: "16px" }}>
                                    Order Number : {data["orderNumber"]}<br />
                                    Order Date : {data["orderDate"]} <br />
                                    Required Date : {data["requiredDate"]} <br />
                                    {data["shippedDate"] ? "Shipped Date : " + data["shippedDate"] : null}{data["shippedDate"] ? <br /> : null}
                                    {data["comments"] ? "Comments : " + data["comments"] : null}{data["comments"] ? <br /> : null}
                                </p>
                                <hr />
                                <MDBContainer>
                                    <MDBRow>
                                        <MDBCol sm="12">
                                            <MDBBtn type="button" style={{ borderRadius: "20px", width: "100%" }} color="warning" onClick={this.onClickEdit} name="edit">edit</MDBBtn>
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
                                {this.state.modalsEdit ? <EditModals type="bill" open={this.state.modalsEdit} data={this.state.dataForModals} toggle={this.toggleModal.bind(this)} submitFn={{setLoading:this.setLoading.bind(this), fetch: this.fetch_data.bind(this)}} /> : <></>}
                            </div>
                        </div>
                    </div>
                </div>
            );
    }
}