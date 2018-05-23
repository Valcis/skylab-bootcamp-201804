import React, { Component } from "react";
import { HashRouter } from "react-router-dom";
import "./App.css";
import "./components/Register/register.css";
import "./components/Profile/profile.css";
import "./components/Landing/landing.css";
import Main from "./components/Main/main";
import Nav from "./components/Nav/Nav";

class App extends Component {
  constructor() {
    super();

    this.state = {
      logged: false
    };
  }

  componentDidMount() {
    const sessionData = sessionStorage.getItem("key");
    sessionData
      ? this.setState({ logged: true })
      : this.setState({ logged: false });
  }

  _isLogged = logged => {
    logged ? this.setState({ logged: true }) : this.setState({ logged: false });
  };

  render() {
    return (
      <HashRouter>
        <div className="masterContainer">
          <Nav logState={this.state.logged} logged={this._isLogged} />
          <Main logged={this._isLogged} />
        </div>
      </HashRouter>
    );
  }
}

export default App;
