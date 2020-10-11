import React from 'react'
import { MDBContainer, MDBJumbotron, MDBBtn, MDBInput, MDBModal, MDBModalBody, MDBModalHeader } from 'mdbreact';
import Style from 'style-it'

export default class PostModals extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            modal: false,
            searchList: '',
            searchInput: '',
        }
    }
    
    toggle = (e) => {
        this.props.onClickP2C(e)
        this.setState({
            modal: !this.state.modal
        });
        if(e.target.name === 'close'){
            // reset state
            this.setState({
                modal: false,
            })
        }else if(e.target.name === 'submit'){
            this.SubmitBtn(e)
        }
    }

    onChange = e => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
        if (name === 'searchList' && value){
            if(this.state.searchInput.length >= 3){
                // do something
            }
        }
    }

    SubmitBtn(e){
        console.log(this.state)   
    }

    render(){

        return (
            <MDBContainer className="justify-content-center">
                <MDBBtn onClick={this.toggle} outline color="secondary" style={{borderRadius: "20px", textAlign: "center"}}>Search</MDBBtn>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="lg">
                <MDBModalHeader toggle={this.toggle} style={{color: "rgb(0, 0, 0)"}}></MDBModalHeader>
                <MDBModalBody>
                    <MDBContainer style={{color: "rgb(0, 0, 0)"}}>
                        <MDBJumbotron style={{width: "100%", borderRadius: "7px"}}>
                            <h2>SEARCHING COMPANY</h2>
                            <hr className="my-2" />
                            <div className="form-group">
                                <select className="browser-default custom-select" name="searchList" onChange={this.onChange}>
                                    <option value="">รูปแบบการค้นหา</option>
                                    <option value="1">Company</option>
                                    <option value=""></option>
                                    <option value=""></option>
                                    <option value=""></option>
                                    <option value=""></option>
                                </select>
                            </div>
                            <MDBInput label="ค้นหา" outline name="searchInput" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                        </MDBJumbotron>
                    </MDBContainer>
                    {/* result of search */}
                    <MDBContainer style={{color: "rgb(0, 0, 0)"}}>
                        <MDBJumbotron style={{width: "100%", borderRadius: "7px"}}>
                            <h2>SEARCHING RESULTS</h2>
                            <div className="row">
                                <div className="col-lg-12" style={{paddingBottom: 4}}>
                                    <div className="card" style={{width: "100%", borderRadius: "6px"}}>
                                        <div className="card-body">
                                            <h5 className="card-title" style={{textAlign: "left"}}>Name ..........</h5>
                                            <hr/>
                                            <p className="card-text">detail อะไรสักอย่างนี่แหละ</p>
                                            <hr/>
                                            <h5 className="card-text" style={{textAlign: "right", color: "#33B5E5"}} >read more>></h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className="my-2" />
                            <div className="row">
                                <div className="col-lg-12" style={{paddingBottom: 4}}>
                                    <div className="card" style={{width: "100%", borderRadius: "6px"}}>
                                        <div className="card-body">
                                            <h5 className="card-title" style={{textAlign: "left"}}>Name ..........</h5>
                                            <hr/>
                                            <p className="card-text">detail อะไรสักอย่างนี่แหละ</p>
                                            <hr/>
                                            <h5 className="card-text" style={{textAlign: "right", color: "#33B5E5"}} >read more>></h5>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className="my-2" />
                            <Style>{`.closed:active {background-color: white;transform: translateY(4px);}`}
                                <MDBBtn color="secondary" name="close" onClick={this.toggle} outline style={{borderRadius: "20px", width: "100%"}} className="closed" >Close</MDBBtn>
                            </Style>
                        </MDBJumbotron>
                    </MDBContainer>
                </MDBModalBody>
                </MDBModal>
            </MDBContainer>
        )
    }
}