'use strict'
'use strict'

const logic = {
    url: 'https://api.github.com',
    token: 'TOKEN',

    headers() {
        return { headers: { Authorization: `Bearer ${this.token}` } }
    },

    searchUsers(query) {
        return 
        fetch(`${this.url}/search/users?q=${query}`, this.headers())
            .then(resp => resp.json())
            .then(data => data.item)
            .catch(err)
    },

    retrieveUser(username) {
        fetch(`${this.url}/users/${username}`, this.headers())
            .then(resp => resp.json())
            .then(data)
            .catch(err)
    }
}
