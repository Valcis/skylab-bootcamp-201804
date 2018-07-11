import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

  state = {
    email: "",
    password: '',
    name: '',
    surname: '',
    selectedUser: {},
    err: {}
  }

  catchInput = e => {
    this.state.input = e.target
    this.setState({
      email: e.target.value
    })
  }

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
        <form onSubmit="">
          <input type="name" name="name" placeholder="name" onChange="?" value={name} />
          <input type="surname" name="surname" placeholder="surname" onChange="?" value={surname} />
          <input type="email" name="email" placeholder="email" onChange="?" value={email}/>
          <input type="password" name="password" onChange="?" value={password}/>
          <button type="submit">Register</button>
        </form>
        <h1>Login</h1>
        <form onSubmit="?">
          <input type="email" name="email" placeholder="email" onChange="?" />
          <input type="password" name="password" onChange="?" />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}

export default App;
