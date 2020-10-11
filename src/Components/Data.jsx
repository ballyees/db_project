import React from 'react';

export default class App extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            f: []
        }
    }

    async componentDidMount(){
      await fetch('https://work-final.herokuapp.com/transactions').then(
          result => result.json()
      ).then(
          data => {
              this.setState({f: data})
              console.log(data)
        }
      )
  }

  render(){
    let data = this.state.f.map(
        e => (
            <div key={e._id}>
                {/* <span>{e.title}</span> */}
                <span>{e.name}</span>
            </div>
        )
    )
    return (
        <div className="DATA">{data}</div>
    );
  }
}
  
