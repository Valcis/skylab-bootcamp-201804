const logic = {
    url: 'https://api.github.com',
    token: '316f8c330c989ac16e9c3a0a6fa1a2b8c3c18935',

    headers() {
        return { headers: { Authorization: `Bearer ${this.token}`}}
    },

    searchUsers(query){
        return fetch(`${this.url}/search/users?q=${query}`, this.headers())
            .then(resp => resp.json())
            .then(data => data.items)
    },

    retrieveUser(username){
        return fetch(`${this.url}/users/${username}`, this.headers())
            .then(resp => resp.json())
    }

}

export default logic