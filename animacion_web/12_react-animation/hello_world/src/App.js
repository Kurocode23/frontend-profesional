import React, { Component } from 'react';
import CSSTransitionGroup from 'react-addons-css-transition-group';

import logo from './logo.svg';
import logoPlatzi from './platzi.png';
import './App.css';

class App extends Component {
  // state = {
  //   logo,
  // }

  constructor (props) {
    super(props)
    this.onClick = this.onClick.bind(this)
    
    this.state = {
      logo,
    }
  }

  onClick () {
    this.setState({
      logo: logoPlatzi,
    })
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <CSSTransitionGroup
            transitionName="fade"
            transitionEnterTimeout={1000}
            transitionLeaveTimeout={1000}>
            <img
              key={this.state.logo}
              src={this.state.logo}
              className="App-logo"
              alt="logo"
              />
          </CSSTransitionGroup>
          <h2>Hola mundo!</h2>
          <button onClick={this.onClick}>click me!</button>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
