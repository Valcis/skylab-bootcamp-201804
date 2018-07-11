import React, { Component } from 'react'
import logic from '../logic'

class Info extends Component {
    state = { user: {} }

    componentDidMount() {
        this.retrieve(this.props)
    }

    retrieve(props) {
        logic.retrieveUser(props.username)
            .then(user => this.setState({ user }))
            .catch(props.onError)
    }

    componentWillReceiveProps(props) {
        this.retrieve(props)
    }

    render() {
        const { user: { login, avatar_url, followers, following } } = this.state
        const { className } = this.props

        return login ? <section className={className}>
            <h2>info</h2>
            <h3>{login}</h3>
            <img src={avatar_url} alt={login} title={login} />
            <h4>followers: {followers}</h4>
            <h4>following: {following}</h4>
        </section> : null
    }
}

// function Info({ user: { login, avatar_url, followers, following }, className }) {
//     return login ? <section className={className}>
//         <h2>info</h2>
//         <h3>{login}</h3>
//         <img src={avatar_url} alt={login} title={login} />
//         <h4>followers: {followers}</h4>
//         <h4>following: {following}</h4>
//     </section> : null
// }

export default Info