import React, { Component } from 'react';
import logo from './logo.svg';
import logic from './logic/index'
import './App.css';

class App extends Component {

  constructor() {
    super()
    this.state = {
      isRegistered: false,
      isLogged: false,
      name: '',
      surname: '',
      email: '',
      password: ''
    }
  }

  handleSubmitRegister = (e) => {
    e.preventDefault()

    logic.registerUser(this.state.name, this.state.surname, this.state.email, this.state.password)
      .then(res => {

        if(res){
          this.setState({
            isRegistered: true,
            email: '',
            password: ''
          })
        }
      }).catch(err => err.message)
  }
  handleSubmitLogin = (e) => {
    e.preventDefault()
    
    logic.login(this.state.email, this.state.password)
      .then(res => {
        if(res){
          this.setState({
            isLogged: true
          })
        }
      }).catch(err => err.message)
  }

  handlerCapturingName = (e) => {
    this.setState({
      name: e.target.value
    })
  }

  handlerCapturingSurname = (e) => {
    this.setState({
      surname: e.target.value
    })
  }
  handlerCapturingEmail = (e) => {
    this.setState({
      email: e.target.value
    })
  }

  handlerCapturingPassword = (e) => {
    this.setState({
      password: e.target.value
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
        {!this.state.isRegistered && <div>
            <h1>Register</h1>
            <form onSubmit={this.handleSubmitRegister}>
              <input type="name" name="name" onChange={this.handlerCapturingName} value={this.state.name} />
              <input type="surname" name="surname" onChange={this.handlerCapturingSurname} value={this.state.surname} />
              <input type="email" name="email" placeholder="email" onChange={this.handlerCapturingEmail} value={this.state.email} />
              <input type="password" name="password" onChange={this.handlerCapturingPassword} value={this.state.password} />
              <button type="submit">Register</button>
            </form>
          </div>}
        {this.state.isRegistered && 
        <div>
          <h1>Login</h1>
          <form onSubmit={this.handleSubmitLogin}>
            <input type="email" name="email" placeholder="email" onChange={this.handlerCapturingEmail} value={this.state.email} />
            <input type="password" name="password" onChange={this.handlerCapturingPassword} value={this.state.password} />
            <button type="submit">Register</button>
          </form>
        </div>}
        {this.state.isLogged && <div>
          <h1>Home!</h1>
        </div>}

      </div>
    );
  }
}

export default App;
