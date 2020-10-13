import React from "react";

export default class LoadingPage extends React.Component {
    state = {
        colors: ["#ff6666", "#ff8c66", "#ffb366", "#ffd966", "#ffff66", "#d9ff66", "#b3ff66", "#8cff66", "#66ff66", "#66ff8c", "#66ffb3", "#66ffd9", "#66ffff", "#66d9ff", "#66b3ff", "#668cff", "#6666ff", "#8c66ff", "#9966ff", "#b366ff", "#d966ff", "#ff66ff", "#ff66d9", "#ff66b3", "#ff668c", "#ff6666"],
        counter: 0
    }
    getColors = (index) => {
        return this.state.colors[index % 26]
    }
    
    componentDidMount() {
        this.interval = setInterval(() => {
            this.setState({counter: this.state.counter + 1});
        }, 400);
      }
      
    componentWillUnmount() {
        clearInterval(this.interval);
    }
    render() {
        return (
            <>
                <div className="spinner-grow ml-3" role="status" style={{animationDelay: 1, backgroundColor: this.getColors(this.state.counter)}}>
                    <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow ml-3" role="status" style={{animationDelay: 2, backgroundColor: this.getColors(this.state.counter+1)}}>
                    <span className="sr-only">Loading...</span>
                </div>
                <div className="spinner-grow ml-3" role="status" style={{animationDelay: 1, backgroundColor: this.getColors(this.state.counter+2)}}>
                    <span className="sr-only">Loading...</span>
                </div>
            </>
        );
    }
}