import React, { Component } from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import logic from "../../logic";
import logic2 from "../../logic/cocktaillogic";
import "./main.css";

import Register from "../Register/Register";
import Login from "../Login/Login";
import Profile from "../Profile/Profile";
import Landing from "../Landing/Landing";
import Home from "../Home/Home";
import NotFound from "../NotFound/NotFound";
import swal from "sweetalert2";

/**
 * The main component.
 *
 * @class Main
 * @extends {Component}
 */
class Main extends Component {
  constructor() {
    super();

    this.state = {
      username: "",
      password: "",
      id: "",
      token: "",
      age: "",
      gender: "",
      newUsername: "",
      newPassword: "",
      onError: false,
      publicData: [],
      sessionInfo: {
        id: "",
        token: ""
      },
      bodyUpdate: {
        password: "",
        username: "",
        age: "",
        gender: ""
      },
      cocktailRandomData: {}
    };
  }

  /**
   * This componentDiMount receives the data from the sessionStorage of the browser in case it exists.
   * The 'key' string allows you to unlock the data stored in sessionStorage
   *
   * @returns {Object | null} - returns an object with the data stored in sessionStorage
   */
  componentDidMount() {
    const sessionData = sessionStorage.getItem("key");
    if (sessionData) {
      this.setState({ sessionInfo: JSON.parse(sessionData) });
    }
  }

  /**
   * INPUTS
   *
   * This handlers target input text and they set it to whatever the user introduces when
   * updating profile settings or register/login form.
   *
   * @param {string} text - a parameter to target the event capturing.
   *
   * @function this.setState - Change the state of the component with the value of the input.
   */
  _handlerWriteUsername = e => {
    this.setState({ username: e.target.value });
  };

  _handlerWritePassword = e => {
    this.setState({ password: e.target.value });
  };

  _handlerWriteAge = e => {
    this.setState({ age: e.target.value });
  };

  _handlerWriteGender = e => {
    this.setState({ gender: e.target.value });
  };

  _handlerWriteNewUsername = e => {
    this.setState({ newUsername: e.target.value });
  };

  _handlerWriteNewPassword = e => {
    this.setState({ newPassword: e.target.value });
  };

  /**
   * REGISTER
   *
   * This handler send the info to the api in order to create a new user and resolve a promise setting a new state.
   */

  _handlerRegister = e => {
    e.preventDefault();

    let userData = {
      username: this.state.username,
      password: this.state.password,
      age: this.state.age,
      gender: this.state.gender
    };
    logic.register(userData).then(data => {
      if (data.status === "OK") {
        this.setState({
          id: data.data.id,
          username: "",
          password: "",
          age: "",
          gender: ""
        });
        this.props.history.push("/login");
        swal({
          type: "success",
          title: "Registration successful",
          text: "Welcome! Don't be thirsty!"
        });
      } else {
        swal({
          type: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: "Your user already exists! No more cocktails today sir..."
        });
      }
    });
  };

  /**
   * LOGIN
   *
   * This handler send the info to the api in order to login an user and resolve a promise setting a sesionStorage.
   * Change the father state "logged" to true, switching the navbar.
   */

  _handlerLogin = e => {
    e.preventDefault();

    let userData = {
      username: this.state.username,
      password: this.state.password
    };

    logic.login(userData).then(data => {
      if (data.status === "OK") {
        this.props.logged(true);
        this.props.history.push("/home");
        this.onSetSession(data, "key");
        this.props.logged(true);
        swal({
          type: "success",
          title: "Awesome :)",
          text: "login was successful!",
          footer: "Your daily cocktail is waiting..."
        });
      } else {
        swal({
          type: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: "Be sure to write your username/password correctly"
        });
      }
    });
  };

  /**
   * This function storage our data in the sesionStorage and set our status.
   */

  onSetSession = (data, key) => {
    Promise.resolve()
      .then(() => {
        sessionStorage.setItem(key, JSON.stringify(data.data));
      })
      .then(() => {
        this.setState({
          id: data.data.id,
          token: data.data.token,
          username: "",
          sessionInfo: { id: data.data.id, token: data.data.token }
        });
      });
  };

  /**
   * RETRIEVE
   *
   * This handler get the info of our user calling the api and set de state.
   */

  _handlerRetrieve = () => {
    logic.id = this.state.sessionInfo.id;
    logic.token = this.state.sessionInfo.token;

    Promise.resolve()
      .then(() => {
        logic.id = this.state.sessionInfo.id;
        logic.token = this.state.sessionInfo.token;
      })
      .then(() => {
        logic.retrieve().then(data => {
          this.setState({ publicData: data.data });
        });
      });
  };

  /**
   * UPDATE
   *
   * This handler catch all the changes made in the state and set it in a body (first then of the Promise), then send it to api.
   */

  _handlerUpdate = e => {
    logic.id = this.state.sessionInfo.id;
    logic.token = this.state.sessionInfo.token;

    /* We need to set the body before using the API -> because setState and the API calling are asyncronous */
    Promise.resolve()
      .then(() => {
        this.setState({
          bodyUpdate: {
            password: this.state.password,
            username: this.state.username
              ? this.state.username
              : this.state.publicData.username,
            age: this.state.age ? this.state.age : this.state.publicData.age,
            gender: this.state.gender
              ? this.state.gender
              : this.state.publicData.gender,
            newPassword: this.state.newPassword ? this.state.newPassword : null
          }
        });
      })
      .then(() => {
        let userData = this.state.bodyUpdate;

        logic.update(userData).then(data => {
          if (data.status === "OK") {
            this.setState({
              bodyUpdate: {
                password: "",
                username: "",
                age: "",
                gender: ""
              }
            });
            swal({
              type: "success",
              title: "Update successful"
            });
          } else {
            swal({
              type: "error",
              title: "Nothing was updated"
            });
          }
        });
      });
  };

  /**
   * DELETE
   *
   * This handler allow us to manage the necessary info for send it to our api and delete an user.
   */

  _handlerDelete = () => {
    logic.id = this.state.sessionInfo.id;
    logic.token = this.state.sessionInfo.token;

    let userData = {
      username: this.state.username,
      password: this.state.password
    };

    logic.unregister(userData).then(data => {
      if (data.status === "OK") {
        Promise.resolve()
          .then(() => {
            swal({
              type: "success",
              title: "Profile deleted",
              text: "It was nice to drink together!"
            });
          })
          .then(() => {
            this.props.logged(false);
          })
          .then(() => {
            this.props.history.push("/");
          });
      } else {
        swal({
          type: "error",
          title: "Oops...",
          text: "Something went wrong!",
          footer: "Be sure to write your username/password correctly"
        });
      }
    });
  };

  _handlerShowCocktail = () => {
    logic2
      .randomCocktail()
      .then(cocktailRandomData =>
        this.setState({ cocktailRandomData: cocktailRandomData.drinks[0] })
      );
  };

  render() {
    return (
      <div className="container">
        <Switch>
          <Route
            path="/home"
            render={() => (
              <Home
                _handlerShowCocktail={this._handlerShowCocktail}
                cocktailRandomData={this.state.cocktailRandomData}
              />
            )}
          />
          <Route exact path="/" render={() => <Landing />} />
          <Route
            path="/register"
            render={() => (
              <Register
                _handlerWriteUsername={this._handlerWriteUsername}
                _handlerWritePassword={this._handlerWritePassword}
                _handlerWriteAge={this._handlerWriteAge}
                _handlerWriteGender={this._handlerWriteGender}
                _handlerRegister={this._handlerRegister}
                username={this.state.username}
                password={this.state.password}
              />
            )}
          />
          <Route
            path="/login"
            render={() => (
              <Login
                _handlerWriteUsername={this._handlerWriteUsername}
                _handlerWritePassword={this._handlerWritePassword}
                _handlerLogin={this._handlerLogin}
                username={this.state.username}
                password={this.state.password}
              />
            )}
          />
          <Route
            path="/Profile"
            render={() => (
              <Profile
                username={this.state.publicData.username}
                password={this.state.password}
                age={this.state.publicData.age}
                gender={this.state.publicData.gender}
                _handlerRetrieve={this._handlerRetrieve}
                _handlerUpdate={this._handlerUpdate}
                _handlerWriteNewUsername={this._handlerWriteNewUsername}
                _handlerWriteAge={this._handlerWriteAge}
                _handlerWriteGender={this._handlerWriteGender}
                _handlerDelete={this._handlerDelete}
                _handlerWriteUsername={this._handlerWriteUsername}
                _handlerWritePassword={this._handlerWritePassword}
              />
            )}
          />
          <Route path="*" render={() => <NotFound />} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Main);
