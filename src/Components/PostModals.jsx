import React from 'react'
import { MDBContainer, MDBJumbotron, MDBBtn, MDBInput, MDBInputGroup, MDBModal, MDBModalBody, MDBModalHeader, MDBIcon } from 'mdbreact';
import Style from 'style-it'    

export default class PostModals extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            modal: false,
            roleSize: 1,
        }
    }
    
    toggle = (e) => {
        this.props.onClickP2C(e)
        this.setState({
            modal: !this.state.modal
        });
        if(e.target.name === 'close'){
            // reset state
            for(let i=0; i<this.state.roleSize; i++){
                delete this.state[`role${i}`]
            }
            this.setState({
                modal: false,
                roleSize: 1,
            })
        }else if(e.target.name === 'submit'){
            this.SubmitBtn(e)
        }
    }

    onChange = e => {
        const { name, value } = e.target
        console.log(name + " " + value)
        this.setState({
            [name]: value
        })
    }

    SubmitBtn(e){
        console.log(this.state)   
    }

    plus = (e) =>{
        this.setState({
            roleSize: this.state.roleSize + 1
        })
    }
    minus = (e) =>{
        if(this.state.roleSize>1){
            this.setState({
                roleSize: this.state.roleSize - 1
            })
        }
    }

    render(){
        let role = []
        for(let i=0; i < this.state.roleSize; i++){
            let label = `หน้าที่ ที่${i+1}`
            let roleT = `role${i}`
            role.push(
                (<MDBInput label={label} outline name={roleT} onChange={this.onChange} onKeyPress={this.KeyPressEnter} key={roleT} />)
            )
        }
        return (
            <MDBContainer className="justify-content-center">
                <MDBBtn onClick={this.toggle} outline color="secondary" style={{borderRadius: "20px", textAlign: "center"}}>Post</MDBBtn>
                <MDBModal isOpen={this.state.modal} toggle={this.toggle} size="lg">
                <MDBModalHeader toggle={this.toggle} style={{color: "rgb(0, 0, 0)"}}></MDBModalHeader>
                <MDBModalBody>
                    <MDBContainer style={{color: "rgb(0, 0, 0)"}}>
                        <MDBJumbotron style={{width: "100%", borderRadius: "7px"}}>
                            <h2>POST</h2>
                            <div className="col-form-label" style={{textAlign: "left"}}><span>รายละเอียดงาน : </span></div>
                            <MDBInput label="หัวข้อ" outline name="header" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                            <MDBInput label="รูปแบบงาน" outline name="pattern" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                            <MDBInput type="number" label="เงินเดือน(บาท)" outline name="salary" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                            <MDBInput label="สถานที่ปฏิบัติงาน" outline name="location" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                            <div className="col-form-label" style={{textAlign: "left"}}><span>วันหยุด : </span></div>
                            <div className="inputGroup" style={{textAlign: "left"}}>
                                <div className="custom-control custom-checkbox custom-control-inline">
                                    <input type="checkbox" className="custom-control-input" id="day1" value="จ" />
                                    <label className="custom-control-label" htmlFor="day1">วันจันทร์</label>
                                </div>
                                <div className="custom-control custom-checkbox custom-control-inline">
                                    <input type="checkbox" className="custom-control-input" id="day2" value="อ" />
                                    <label className="custom-control-label" htmlFor="day2">วันอังคาร</label>
                                </div>
                                <div className="custom-control custom-checkbox custom-control-inline">
                                    <input type="checkbox" className="custom-control-input" id="day3" value="พ" />
                                    <label className="custom-control-label" htmlFor="day3">วันพุธ</label>
                                </div>
                                <div className="custom-control custom-checkbox custom-control-inline">
                                    <input type="checkbox" className="custom-control-input" id="day4" value="พฤ" />
                                    <label className="custom-control-label" htmlFor="day4">วันพฤหัสบดี</label>
                                </div>
                                <div className="custom-control custom-checkbox custom-control-inline">
                                    <input type="checkbox" className="custom-control-input" id="day5" value="ศ" />
                                    <label className="custom-control-label" htmlFor="day5">วันศุกร์</label>
                                </div>
                                <div className="custom-control custom-checkbox custom-control-inline">
                                    <input type="checkbox" className="custom-control-input" id="day6" value="ส" />
                                    <label className="custom-control-label" htmlFor="day6">วันเสาร์</label>
                                </div>
                                <div className="custom-control custom-checkbox custom-control-inline">
                                    <input type="checkbox" className="custom-control-input" id="day7" value="อา" />
                                    <label className="custom-control-label" htmlFor="day7">วันอาทิตย์</label>
                                </div>
                            </div>                            
                            <MDBInputGroup
                            prepend="เวลาทำงาน"
                            inputs={
                            <>
                                <MDBInput noTag type="text" style={{borderRadius: "5px"}} onChange={this.onChange} onKeyPress={this.KeyPressEnter} name="startTime" />
                                <span style={{paddingTop: 7}}> ถึง </span>
                                <MDBInput noTag type="text" style={{borderRadius: "5px"}} onChange={this.onChange} onKeyPress={this.KeyPressEnter} name="endTime" />
                            </>
                            }
                            />
                            <div className="col-form-label" style={{textAlign: "left"}}><span>หน้าที่ความรับผิดชอบ</span></div>
                            <div className="def-number-input number-input" style={{textAlign: "left"}}>
                                <Style>{`.btn-icon-cus:hover {color: #4285f4 !important;text-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15)}
                                .btn-icon-cus:active {background-color: white;transform: translateY(4px);}`}
                                <MDBIcon icon="plus-circle" onClick={this.plus} style={{fontSize: "225%", paddingRight: 20}} className="btn-icon-cus" />
                                </Style>
                                <Style>{`.btn-icon-cus:hover {color: #ff3547 !important;text-shadow: 0 5px 11px 0 rgba(0, 0, 0, 0.18), 0 4px 15px 0 rgba(0, 0, 0, 0.15)}
                                .btn-icon-cus:active {background-color: white;transform: translateY(4px);}`}
                                <MDBIcon icon="minus-circle" onClick={this.minus} style={{fontSize: "225%"}} className="btn-icon-cus" />
                                </Style>
                            </div>
                            {role}
                            <hr className="my-2" />
                            <div className="col-form-label" style={{textAlign: "left"}}><span>คุณสมบัติ : </span></div>
                            <div className="inputGroup" style={{textAlign: "left"}}>
                                <div className="custom-control custom-checkbox custom-control-inline">
                                    <input type="checkbox" className="custom-control-input" id="gender1" value="m" />
                                    <label className="custom-control-label" htmlFor="gender1">ชาย</label>
                                </div>
                                <div className="custom-control custom-checkbox custom-control-inline">
                                    <input type="checkbox" className="custom-control-input" id="gender2" value="f" />
                                    <label className="custom-control-label" htmlFor="gender2">หญิง</label>
                                </div>
                            </div>
                            <MDBInput label="อายุ" outline name="age" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                            <MDBInput label="การศึกษา" outline name="education" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                            <MDBInput label="ประสบการณ์" outline name="experience" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
                            <MDBInput type="textarea" style={{borderRadius: ".25rem"}} label="อื่นๆ" outline name="etc" onChange={this.onChange} onKeyPress={this.KeyPressEnter} />
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
            </MDBContainer>
        )
    }
}