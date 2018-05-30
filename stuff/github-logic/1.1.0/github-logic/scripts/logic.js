'use strict'

const logic = {
    url: 'https://api.github.com',
    token: 'TOKEN',

    _headers() {
        return { headers: { Authorization: `Bearer ${this.token}` } }
    },

    searchUsers(query, callback) {
        fetch(`${this.url}/search/users?q=${query}`, this._headers())
            .then(resp => resp.json())
            .then(data => callback(undefined, data.items))
            .catch(err => callback(err))
    },

    retrieveUser(username, callback) {
        fetch(`${this.url}/users/${username}`, this._headers())
            .then(resp => resp.json())
            .then(data => callback(undefined, data.login ? data : undefined))
            .catch(err => callback(err))
    }
}