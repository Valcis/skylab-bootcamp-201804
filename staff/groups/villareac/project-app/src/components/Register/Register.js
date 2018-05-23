import React, { Component } from "react";
import "../Main/main.css";

/**
 * The page where the user can create a new user and password
 *
 * @class Register
 * @extends {Component}
 */
class Register extends Component {
  render() {
    return (
      <div className="container register">
        <section className="firstSection">
          <h2>There's always time for a cocktail</h2>
          <br />
          <ul className="list">
            <li>A guide to help you find the perfect tipple.</li>
            <li>
              The world of the mighty cocktail is intoxicating and vast. Whether
              you like yours fluorescent, sporting an umbrella and served by Tom
              Cruise or made to measure by a molecular mixologist, the most fun
              occurs when you get stuck in yourself.
            </li>
            <li>
              All you need to get started is a spirit base of your choice then
              it's just a case of experimenting with blends. We've put together
              a guide on how to turn your bottle of choice into something
              special.
            </li>
            <li>
              VODKA<br />
              Russian fire water makes a great foundation for cocktails - its
              neutral flavour makes it a relatively blank canvas.
            </li>
            <li>
              GIN <br />
              Mother's ruin may not be for everyone, but it's simply a spruced
              up version of vodka with added botanicals such as juniper,
              rosemary, anise or coriander.
            </li>
            <li>
              RUM <br />
              Distilled from molasses in the heady climes of the Caribbean and
              South America, rum is a sunshine spirit with a complex flavour
              profile.
            </li>
          </ul>
        </section>
        <section className="secondSection">
          <h2>Register</h2>
          <br />
          <form onSubmit={this.props._handlerRegister}>
            <label htmlFor="inputUsername">Username:</label>
            <input
              id="inputUsername"
              type="text"
              placeholder="Choose username"
              onChange={this.props._handlerWriteUsername}
            />
            <label htmlFor="inputPassword">Password:</label>
            <input
              id="inputPassword"
              type="password"
              placeholder="Choose password"
              onChange={this.props._handlerWritePassword}
            />
            <br />
            <h5>Additional data:</h5>
            <br />
            <label htmlFor="inputAge">Age:</label>
            <input
              id="inputAge"
              type="text"
              placeholder="Insert age"
              onChange={this.props._handlerWriteAge}
            />
            <label htmlFor="inputGender">Gender:</label>
            <input
              id="inputGender"
              type="text"
              placeholder="Insert gender"
              onChange={this.props._handlerWriteGender}
            />
            <button type="submit">Sign up</button>
          </form>
        </section>
      </div>
    );
  }
}

export default Register;
