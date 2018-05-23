import React, { Component } from "react";
import "../Main/main.css";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div className="container landing">
        <section className="firstSection">
          <h2>Cocktail Philosophy</h2>
          <br />
          <p>
            The bar counter is an altar while divine intervention comes in the
            form of a bartender suited up in a crisp white coat.
          </p>
          <p>
            The look of a cocktail is just as important as the flavor and
            feeling. You can apply the same rules as you would to dining. A
            plate of gray slop may be the best tasting thing you’ve ever had,
            but if it looks terrible, it’s going to detract from the experience.
            Expectations are a big part of the cocktail experience. The eyes
            tell the mouth and nose what to expect by heightening the
            sensitivity of the receptors of those flavors.
          </p>
        </section>
        <section className="secondSection">
          <section className="linkRegister">
            <h3>Sign Up For Free</h3>
            <Link to="/register">
              <button>Sign up</button>
            </Link>
          </section>
          <section className="linkLogin">
            <h3>Login into your account</h3>
            <Link to="/login">
              <button>Log in</button>
            </Link>
          </section>
        </section>
      </div>
    );
  }
}

export default Landing;
