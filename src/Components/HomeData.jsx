import React from 'react'

export default class HomeData extends React.Component{
    cardCompany(element){
        return (<div className="col-lg-12" style={{paddingBottom: 4}}>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title" style={{textAlign: "left"}}>companyName ..........</h5>
                            <hr/>
                            <p className="card-text">รับสมัครตำแหน่ง .... and detail</p>
                            <hr/>
                            <h5 className="card-text" style={{textAlign: "right", color: "#33B5E5"}} >read more>></h5>
                        </div>
                    </div>
                </div>)
    }
    cardJobseeker(element){
        return (<div className="col-lg-12" style={{paddingBottom: 4}}>
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title" style={{textAlign: "left"}}>Name ..........</h5>
                            <hr/>
                            <p className="card-text">detail อะไรสักอย่างนี่แหละ</p>
                            <hr/>
                            <h5 className="card-text" style={{textAlign: "right", color: "#33B5E5"}} >read more>></h5>
                        </div>
                    </div>
                </div>)
    }

    render(){
        let cC = this.cardCompany(10)
        let cJ = this.cardJobseeker(10)
        return (
            <div className="row">
                <div className="col-md-6 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Company</h4>
                            <div className="row">
                                {cC}
                                {cC}
                                {cC}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-6 mb-4">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Jobseeker</h4>
                            <div className="row">
                                {cJ}
                                {cJ}
                                {cJ}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}