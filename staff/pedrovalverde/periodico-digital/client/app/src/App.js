import React, { Component } from 'react'
import './App.css'
import { Route, Switch, Link } from 'react-router-dom';
/* import Header from './components/Header'
import Categories from './components/Categories'
import LastNews from './components/LastNews' */
import NotFound from './components/NotFound'
import Home from './components/Home'
import UpdateUser from './components/UpdateUser'
import LoginPage from './components/LoginPage'
import RegisterUser from './components/RegisterPage'
import logic from './logic/index' 


class App extends Component {

  state = { registered: false }

  componentDidMount() {
    if (logic.loggedIn) this.props.history.push('/home')
  }

  onRegister = () => {
    console.log('register')

    this.setState({ registered: true })
  }

  onRegisterError(message) {
    console.error('register error', message)
  }

  onLogin = () => {
    console.log('login')

    this.props.history.push('/home')
  }

  onLoginError(message) {
    console.error('login error', message)
  }

  onLogout = () => {
    this.props.history.push('/')
  }

  render() {
    return (
      <Switch>
        <div className="App">
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/register" render={() => {
            return this.state.registered ?
              <Link to="/login">Login</Link>
              :
              <RegisterUser onRegister={this.onRegister} onRegisterError={this.onRegisterError} />
          }} />
          <Route exact path="/users/update" component={UpdateUser} />
          <Route exact path="/login" render={() =>
            !logic.loggedIn && <LoginPage onLogin={this.onLogin} onLoginError={this.onLoginError} />
          } />
          {logic.loggedIn && <Route path="/home" render={() => <Home onLogout={this.onLogout} />} />}
          {/*  TO DO OTHERS  */}
          <Route component={NotFound} />

        </div>
      </Switch>
    );
  }
}

export default App;

