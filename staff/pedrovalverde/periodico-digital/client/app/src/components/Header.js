import React from 'react';
import logo from './../logo.svg';
import './header.css'
import { Link } from 'react-router-dom'

function Header(props) {
  return (

    <header className="header">
      <img src={logo} className="logo" alt="logo" />
      <h1 className="title"> P e r i ó d i c o . D i g i t a l </h1>
      <Link className="link" to="/users/login">Acceder</Link>
      <Link className="link" to="/users/register">registrarse</Link>
    </header>

  );
}
export default Header;

