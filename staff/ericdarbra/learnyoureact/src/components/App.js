import React, { Component } from "react";
import logo from "../logo.svg";
import Title from "./Title/Title";
import SearchForm from "./SearchForm/SearchForm";
import MainContent from "./MainContent/MainContent";
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      data: {},
      onError: false
    };
  }

  HandlerWriteName = e => {
    this.setState({ name: e.target.value });
  };

  HandlerSearchUser = e => {
    e.preventDefault();

    const TOKEN = "cd5225b07f91508247ce7d672d9d933645e46f62";
    const headers = {
      headers: {
        Authorization: "Bearer " + TOKEN
      }
    };

    fetch("https://api.github.com/users/" + this.state.name, headers)
      .then(response => response.json())
      .then(data => {
        if (data.message) {
          this.setState({data, onError: true });
        } else {
          this.setState({ data,onError: false });
        }

      });

    /* 
  this.state.data.message !== null ? setState({onError:true}) */
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <Title text="Github Users" name={this.state.name} data={this.state.data}/>
        </header>
        <section>
          <SearchForm
            HandlerWriteName={this.HandlerWriteName}
            HandlerSearchUser={this.HandlerSearchUser}
          />
          <MainContent data={this.state.data} onError={this.state.onError} />
        </section>
      </div>
    );
  }
}

export default App;
