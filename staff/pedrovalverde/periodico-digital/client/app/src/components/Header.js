import React from 'react';
import logo from './../logo.svg';
import './header.css'
import { Link } from 'react-router-dom'

function Header(props) {
  return (

    <header className="header">
      <section>
        <img src={logo} className="logo" alt="logo" />
        <img src={logo} className="logo2" alt="logo" />
        <img src={logo} className="logo" alt="logo" />
      </section>

      <h1 className="title">Mi Periodico Digital</h1>

      <Link to="/login">Login</Link>
    </header>

  );
}
export default Header;

