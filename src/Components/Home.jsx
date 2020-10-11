import React from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import imgBanner from './img/Banner.jpg'
import HomeData from './HomeData'
import { MDBInput } from "mdbreact";
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView } from "mdbreact";
export default class Home extends React.Component{

    state = {
        search: ''
    }

    onChange = e => {
        const { name, value } = e.target
        console.log(name + " " + value)
        this.setState({
            [name]: value
        })
    }

    SubmitBtn = () => {
        console.log(this.state)
    }

    KeyPressEnter = e => {
        if(e.key === 'Enter'){
            this.SubmitBtn()
        }
    }

    render(){
        return (
            <div className="Home">
            <Navbar loginSuccess={this.props.loginSuccess} logout={this.props.logout} info={this.props.info} Tokenizer={this.props.Tokenizer} />
            <MDBCarousel
              activeItem={1}
              length={1}
              showControls={false}
              showIndicators={false}
              className="z-depth-1"
            >
              <MDBCarouselInner>
                <MDBCarouselItem itemId="1">
                  <MDBView>
                    <img
                      className="d-block w-100"
                      src={imgBanner}
                      alt="homeImg"
                    />
                  </MDBView>
                  <MDBCarouselCaption>
                    <h1 className="h1-responsive" style={{textShadow: "0 3px 3px rgba(0, 0, 0, 0.4)", color: "#fff"}}>งานที่ตรงความต้องการ ?</h1>
                    <p className="hero-subtitle" style={{maxWidth: "600px", margin: "25px auto", padding: "10px 15px", textShadow: "0 3px 3px rgba(0, 0, 0, 0.4)", color: "#fff"}}>หางานไม่ที่ตรงความต้องการยากใช่ไหม อยากจ้างพนักงานที่มีคุณสมบัติตรงกับที่ต้องการ ให้เราช่วยสิ SaeRoy</p>
                    <Link to="/find-jobs/data"><button className="btn btn-primary hero-button plat" style={{boxShadow: "0 0 0 0 #048f83!important"}}>Learn more</button></Link>
                    <Link to="/find-jobs/profile"><button className="btn btn-primary hero-button plat" style={{boxShadow: "0 0 0 0 #048f83!important"}}>Profile</button></Link>
                    <br/>
                    <br/>
                    <br/>
                    <br/>
                  </MDBCarouselCaption>
                </MDBCarouselItem>
              </MDBCarouselInner>
            </MDBCarousel>
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-6 text-center">
                        <MDBInput label="Search" outline name="search" onChange={this.onChange} onKeyPress={this.KeyPressEnter}/>
                    </div>
                </div>
            </div>
            <HomeData />
            </div>
        );
    }
}