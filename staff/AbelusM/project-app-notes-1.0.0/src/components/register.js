import React, { Component } from 'react'
import logic from '../logic'

class Register extends Component {
    state = { username: '', password: '' }

    updateUsername = e => {
        this.setState({ username: e.target.value })
    }

    updatePassword = e => {
        this.setState({ password: e.target.value })
    }

    register = e => {
        e.preventDefault()

        const { username, password } = this.state

        this.setState({ username: '', password: '' })

        logic.register(username, password)
            .then(() => this.props.onRegister())
            .catch(({ message }) => this.props.onRegisterError(message))
    }

    render() {
        return <main>
            <h1>Register</h1>
            <form onSubmit={this.register}>
                <input type="text" onChange={this.updateUsername} />
                <input type="password" onChange={this.updatePassword} />
                <button type="submit">Register</button>
            </form>
        </main>
    }
}

export default Register