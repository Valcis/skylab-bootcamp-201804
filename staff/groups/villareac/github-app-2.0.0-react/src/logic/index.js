const logic = {
    url: 'https://api.github.com',
    token: 'TOKEN',
    
    headers() {
        return { headers: { Authorization: `Bearer dd35934d1e9e884884e96051e44de04d8f381aa6`}}
    },

    searchUsers(query) {
        return fetch(`${this.url}/search/users?q=${query}`, this.headers())
            .then(resp => resp.json())
            .then(data => data.items)        
    },

    retrieveUser(username) {
        return fetch(`${this.url}/users/${username}`, this.headers())
            .then(resp => resp.json())
    }
}


export default logic