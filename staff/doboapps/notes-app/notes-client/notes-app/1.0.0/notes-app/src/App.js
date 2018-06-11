import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <h1>Register</h1>
        <form onSubmit="?">
          <input type="email" name="email" placeholder="email" onChange="?" />
          <input type="password" name="password" onChange="?" />
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default App;
