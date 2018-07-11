import React, { Component } from 'react';
import logo from './logo.svg';
import logic from './logic/index'
import './App.css';

class App extends Component {

  state = {
    name: '',
    surname: '',
    email: '',
    password: '',
    isRegistered: false,
    isLogged: false,
    error:''
  }

  handlerCapturingName = (e) => {
    
    const value = e.target.value

    this.setState({
        name: value
    })
  }

  handlerCapturingSurname = (e) => {
    
    const value = e.target.value

    this.setState({
        surname: value
    })
  }

  handlerCapturingEmail = (e) => {
    
    const value = e.target.value

    this.setState({
        email: value
    })
  }

  handlerCapturingPassword = (e) => {
    
    const value = e.target.value

    this.setState({
        password: value
    })
  }

  handlerSubmitRegister = (e) => {
    e.preventDefault()

    const {name, surname, email, password} = this.state

    logic.registerUser(name, surname, email, password)
        .then(res => {
          if(res) //swal

          this.setState({
            isRegistered: true,
            email:'',
            password:''
            })
        })
        .catch(({message}) => {
          this.setState({
            error: message
          })
        })
  }

  handlerSubmitLogin = (e) => {
    e.preventDefault()

    const {email, password} = this.state

    logic.login(email, password)
        .then(data => {
          if(data) //swal

         this.setState({
          isLogged: true,
          email:'',
          password:''
          })

        })
        .catch(({message}) => {
          this.setState({
            error: message
          })
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
        {!this.state.isRegistered && <div><h1>Register</h1>
        <form onSubmit={this.handlerSubmitRegister}>
          <input type="text" name="name" value={this.state.name} onChange={this.handlerCapturingName} />
          <input type="text" name="surname" value={this.state.surname} onChange={this.handlerCapturingSurname} />
          <input type="email" name="email" placeholder="email" value={this.state.email} onChange={this.handlerCapturingEmail} />
          <input type="password" name="password" value={this.state.password} onChange={this.handlerCapturingPassword} />
          <button type="submit">Register</button>
        </form>
          </div>}
          
        {this.state.isRegistered && <div><h1>Login</h1>
        <form onSubmit={this.handlerSubmitLogin}>
          <input type="email" name="email" placeholder="email" value={this.state.email} onChange={this.handlerCapturingEmail} />
          <input type="password" name="password" value={this.state.password} onChange={this.handlerCapturingPassword} />
          <button type="submit">Login</button>
        </form>
        </div>}
      </div>
    );
  }
}

export default App;
