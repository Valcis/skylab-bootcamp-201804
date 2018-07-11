import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import logic from './logic'

class App extends Component {

  state = {
    name: '',
    surname: '',
    email: '',
    password: ''
  }

  submit = e => {
    e.preventDefault()
    const { name, surname, email, password } = this.state
    logic.registerUser(name, surname, email, password)
    .then(console.log) //hacer algo con esto 
    .catch(console.log) //hacer algo con esto
  }

  updateInputName = e => {
    let name = e.target.value
    this.setState({
      name
    })
  }

  updateInputSurname = e => {
    let surname = e.target.value
    this.setState({
      surname
    })
  }

  updateInputEmail = e => {
    let email = e.target.value
    this.setState({
      email
    })
  }

  updateInputPassword = e => {
    let password = e.target.value
    this.setState({
      password
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
        <form onSubmit={this.submit}>
          <input type="name" name="name" placeholder="name" onChange={this.updateInputName} value={this.state.name} />
          <input type="surname" name="surname" placeholder="surname" onChange={this.updateInputSurname} value={this.state.surname} />
          <input type="email" name="email" placeholder="email" onChange={this.updateInputEmail} value={this.state.email} />
          <input type="password" name="password" placeholder="password" onChange={this.updateInputPassword} value={this.state.password} />
          <button type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default App;
