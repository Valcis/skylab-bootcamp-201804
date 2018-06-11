import React, { Component } from "react";
import { withRouter } from 'react-router-dom'

class Login extends Component {

    state = {
        userEmail: "",
        password: "",
        loginFailedMessage: ""
    }

    handleKeepEmail = (e) => {
        let userEmail = e.target.value;
        this.setState({ userEmail })
    }


    handleKeepPassword = (e) => {
        let password = e.target.value;
        this.setState({ password })
    }


    handleLogin = (e) => {
        e.preventDefault()
        // logic.login(this.state.userEmail, this.state.password)
        //     .then(res => {

        //         if (res.status === 'OK') {
        //             // localStorage.setItem('token-app', res.data.token)

        //             // localStorage.setItem('id-app', res.data.id)
        //             // this.props.history.push('/home')

        //         } else {
        //             alert("error logeo")
        //         }
        //     })
    }

    render() {

        return (

            <div >
                <h2>LOGIN </h2>

                <form /*onSubmit={this.handleLogin}*/>
                    <input value={this.state.userEmail} /*onChange={this.handleKeepÇEmail}*/ type="text" placeholder="Email" />
                    <input value={this.state.password} /*onChange={this.handleKeepPassword}*/ type="password" placeholder="Password" />
                    <input type="submit" value="Log me in" />

                </form>
            </div>
        )
    }
}

export default withRouter(Login);