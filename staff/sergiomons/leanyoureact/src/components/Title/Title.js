import React from 'react'
import logo from '../../logo.svg';

function Title(props) {
      return <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      {props.userName? <h1>Your searched: {props.userName}</h1> : <h1 className="App-title">Welcome to React</h1>}
    </header>
}

export default Title