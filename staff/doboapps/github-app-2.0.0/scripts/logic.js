'use strict'

const logic = {
    url: 'https://api.github.com',
    token: '',
    headers() {
        return { headers: { Authorization: `Bearer ${this.token}`}}
    },

    searchUsers(query) {
        return fetch(`${this.url}/search/users?q=${query}`, this.headers())
        .then(res => res.json())
        .then(data => data.items)
        .catch(err => err.message)
    },


    retrieveUser(username) {
        return fetch(`${this.url}/users/${username}`, this.headers())
            .then(resp => resp.json())
            .catch(err =>err.message )
    }
}