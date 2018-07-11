import React, { Component } from "react";

import { Link } from "react-router-dom";
import './index.css'




function Landing(props) {
  return (


    <div className="general">
     <div>
     <header >
            <h1 className="tittle">SWEET HOME</h1>
        </header>
        <section>
            <p className="welcome">Welcome to the house sharing web</p>
           
            <Link to="/auth">  
                <button className="login-button">Login</button>
            </Link>
            <Link to="/register">
                <button className="register-button">Register</button>
            </Link>
        </section>
    </div>
</div>
      );
}

export default Landing;