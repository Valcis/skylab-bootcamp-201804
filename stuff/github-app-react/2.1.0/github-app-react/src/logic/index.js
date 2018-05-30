const logic = {
    url: 'https://api.github.com',
    token: 'TOKEN',

    _headers() {
        return { headers: { Authorization: `Bearer ${this.token}` } }
    },

    searchUsers(query) {
        return Promise.resolve()
            .then(() => {
                if (typeof query !== 'string') throw Error('query is not a string')

                if (!query.trim().length) return []

                return fetch(`${this.url}/search/users?q=${query}`, this._headers())
                    .then(resp => resp.json())
                    .then(data => data.items)
            })
    },

    retrieveUser(username) {
        return Promise.resolve()
            .then(() => {
                if (typeof username !== 'string') throw Error('username is not a string')

                if (!username.trim().length) return

                return fetch(`${this.url}/users/${username}`, this._headers())
                    .then(resp => resp.json())
                    .then(data => data.login ? data : undefined)
            })
    }
}

export default logic