import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import logic from '../logic'

class UsersList extends Component {
    state = { users: [] }

    componentDidMount() {
        this.search(this.props)
    }

    search(props) {
        logic.searchUsers(props.query)
            .then(users => this.setState({ users }))
            .catch(props.showError)
    }

    componentWillReceiveProps(props) {
        this.search(props)
    }

    render() {
        const { users } = this.state
        const { className } = this.props

        return users.length ? <section className={className}>
            <h2>list</h2>
            <ul>
                {users.map(({ id, login, avatar_url }) =>
                    <li key={id}>
                        <h3>{login}</h3>
                        <Link to={`/user/${login}`}><img src={avatar_url} alt={login} title={login} /></Link>
                    </li>)}
            </ul>
        </section> : null
    }
}

export default UsersList