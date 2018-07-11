import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import RegisterUser from './components/RegisterUser/RegisterUser'


class App extends Component {

  render() {
    return (
      <Switch>
      <div className="App">
        <header className="App-header">
          <Route exact path="/" component={Landing}/>

        </header>
        <main>
  
          <Route path="/register" component={Register} />
          {/*<Route path="/login" component={Login} />*/}
        </main>
      </div>
      </Switch>
    );
  }
}

export default App;
