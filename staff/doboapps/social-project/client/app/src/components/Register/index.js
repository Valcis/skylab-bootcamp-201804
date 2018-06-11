import React, { Component } from "react";
import { withRouter } from 'react-router-dom'
import logic from "../../logic";

class Register extends Component {

    state = {
        userName: "",
        userEmail: "",
        password: "",
        repeatPassword: "",
        RegisterFailedMessage: "",

    }

    comparePassword() {

        if ((this.state.password !== this.state.repeatPassword) && this.state.repeatPassword.length) {
            this.setState({
                notMatchingMessage: "Passwords don't match"
            })
        } else {
            this.setState({
                notMatchingMessage: ""
            })
        }
    }


    handleKeepName = (e) => {
        let userName = e.target.value;
        this.setState({ userName })
    }


    handleKeepEmail = (e) => {
        let userEmail = e.target.value;
        this.setState({ userEmail })
    }

    handleKeepPassword = (e) => {
        let password = e.target.value;

        Promise.resolve().then(() => {
            this.setState({ password })
        }).then(() => {
            this.comparePassword()
        })
    }

    handleKeepRepeatPassword = (e) => {
        let repeatPassword = e.target.value;

        Promise.resolve().then(() => {
            this.setState({ repeatPassword })
        }).then(() => {
            this.comparePassword()
        })
    }

    handleRegister = (e) => {
        e.preventDefault();
        if (this.state.notMatchingMessage === '') {

            logic.registerUser(this.state.userName,this.state.userEmail, this.state.password.toString())
                .then(res => {

                    if (res.status === 'OK') {
                        console.log("You registered awesomely!")

                        //this.props.history.push('/login')
                    }
                    else {
                        console.log("opps error")

                        this.setState({ registerFailedMessage: res.error })
                    }
                })
        } else {
console.log("password no coincide")
        }
    }


    render() {

        return (

            <div>
                <h2>Register </h2>

                <form onSubmit={this.handleRegister}>

                    <input value={this.state.userName} onChange={this.handleKeepName} type="text" placeholder="Nombre" />
                    <input value={this.state.UserEmail} onChange={this.handleKeepEmail} type="text" placeholder="Email" />
                    <input value={this.state.password} onChange={this.handleKeepPassword} type="password" placeholder="Password" />
                    <input value={this.state.repeatPassword} onChange={this.handleKeepRepeatPassword} type="password" placeholder="Repeat Password" />

                    <p>{this.state.notMatchingMessage}</p>

                    <input type="submit" value="Register me" />

                </form>
            </div>
        )
    }
}

export default withRouter(Register);