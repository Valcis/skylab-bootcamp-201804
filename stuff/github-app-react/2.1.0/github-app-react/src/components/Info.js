import React from 'react'

function Info({ user: { login, avatar_url, followers, following }, className }) {
    return login ? <section className={className}>
        <h2>info</h2>
        <h3>{login}</h3>
        <img src={avatar_url} alt={login} title={login} />
        <h4>followers: {followers}</h4>
        <h4>following: {following}</h4>
    </section> : null
}

export default Info