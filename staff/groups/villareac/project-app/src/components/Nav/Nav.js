import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../../static/images/pineapple.svg";

class Nav extends Component {
  _logout = () => {
    this.props.logged(false);
    sessionStorage.clear();
  };

  render() {
    return (
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="logo" />
          <h1 className="appName">Tropic VilaReac</h1>
        </div>
        {!this.props.logState ? (
          <ul>
            <li>
              <Link to="/register">Sign in</Link>
            </li>
            <li>
              <Link to="/login">Log in</Link>
            </li>
          </ul>
        ) : (
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li onClick={this._logout}>
              <Link to="/">Logout</Link>
            </li>
          </ul>
        )}
      </nav>
    );
  }
}

export default Nav;
