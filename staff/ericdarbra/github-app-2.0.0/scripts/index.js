const logic = {
    url: 'https://api.github.com',
    token: 'TOKEN',
 
    headers() {
        return { headers: { Authorization: `Bearer ${this.token}`}}
    },
 
    searchUsers(query) {
        return fetch(`${this.url}/search/users?q=${query}`, this.headers())
            .then(resp => resp.json())
            .then(data => data.items)
            .catch(err => (err))
    },
 
    retrieveUser(username) {
        return fetch(`${this.url}/users/${username}`, this.headers())
            .then(resp => resp.json())
            .then(data => data)
            .catch(err => callback(err))
    }
 }