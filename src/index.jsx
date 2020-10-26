import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Connector from './Components/Connector';
// window.$Connector = new Tokenizer()
window.$Connector = new Connector("Global Connector")
ReactDOM.render(<App />, document.getElementById('root'));