import React, { Component } from 'react'
import './App.css'
import { Route, Switch, Redirect } from 'react-router-dom';
import NotFound from './components/NotFound'
import UserUpdatePage from './components/UserUpdatePage'
import LandingPage from './components/LandingPage';
import UserRegisterPage from './components/UserRegisterPage';
import FullItemPage from './components/FullItemPage';
import LoginPage from './components/LoginPage';

class App extends Component {

  state = { registered: false }


  render() {
    return (
      <div className="app">
        <Switch>
          <Route exact path="/users/register" component={UserRegisterPage} />
          <Route exact path="/users/update" component={UserUpdatePage} />
          <Route exact path="/users/login" component={LoginPage} />

          <Route exact path="/" render={() => <Redirect to="/news/introduction" />} />

          <Route path="/news/:category" render={props => <LandingPage category={props.match.params.category} />} />

          {/* DEMO: http://localhost:3000/#/news/culture/Muere%20el%20poeta%20cubano%20Rafael%20Alcides */}
          {<Route path="/news/:category/:path" render={props => <FullItemPage category={props.match.params.category} path={props.match.params.path} />} />}

          <Route path="/404" component={NotFound} />
        </Switch >
      </div>
    );
  }
}

export default App;

