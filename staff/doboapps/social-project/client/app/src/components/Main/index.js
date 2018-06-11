import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';
import { Landing, Home, Register, Login, Error404 } from "../index";

class Main extends Component {

    isLogged = () => {
        return localStorage.getItem("token-app") ? true : false
    }

    render() {
        return <div>
            <Switch>
                <Route exact path="/" component={Landing} />
                <Route path="/home" render={props => <Home isLogged={this.isLogged} />} />
                <Route path="/register" render={props => <Register />} />
                <Route path="/login" render={props => <Login />} />
                <Route path='/' render={props => <Error404 />} />
            </Switch>
        </div>
    }

}

export default Main;