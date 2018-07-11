import React, { Component } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Landing from './components/landing/'
import Home from './components/home/'
import Login from './components/login/'
import Register from './components/register/'
import Users from './components/users/'
import UpdateUser from './components/updateuser/'
import Apartment from './components/apartment/'
import ListApartment from './components/listapartment/'
import Tasks from './components/tasks/'
import Notes from './components/notes/'
import Market from './components/market/'
import UpdateApartment from './components/updateapartment'
import Settings from './components/settings'







class App extends Component {
  render() {
    return (
      
      <div className="App">
        <Switch>
            <Route exact path="/" component={Landing} />
            <Route path="/register" component={Apartment} />
            <Route path="/auth" component={Login} />
            <Route path="/registeruser/" component={Register} />
            <Route path="/home" component={Home} />
            <Route path="/users" component={Users} />
            <Route path="/updateuser/:id" component={UpdateUser} />
            <Route path="/house" component={ListApartment} />
            <Route path="/updateapartment/:id" component={UpdateApartment} />
            <Route path="/tasks" component={Tasks} />
            <Route path="/market" component={Market} />
            <Route path="/notes" component={Notes} />
            <Route path="/settings" component={Settings} />
        </Switch>
            </div>
        
    );
  }
}

export default withRouter(App);
