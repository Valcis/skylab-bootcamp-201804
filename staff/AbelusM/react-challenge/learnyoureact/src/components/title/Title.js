import React from 'react';
import logo from '../../logo.svg';
import '../App.css';

function Title(props) {

  return (
    <div className="Title">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1 className="App-title">{(props.dataUser.name) ? 'You searched: '+ props.dataUser.name : 'Here goes the Title'}</h1>
      </header>
    </div>
  );
}

export default Title