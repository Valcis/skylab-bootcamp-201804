

if (typeof require === 'function') {
    var usersApi = require('../utils/users-api-1.0.0')
    var Xtorage = require('../utils/xtorage-1.0.1')
}

// user session storage for token
usersApi.token = token => {
    if (token) {
        Xtorage.session.set('token', token)
        // sessionStorage.setitem('token', token)
        return
    }
    return Xtorage.session.get('token')
    // return sessionStorage.getItem('token')
}

/**
 * Project App logic
 */
const logic = {
    /**
     * Registers a user
     * 
     * @async
     * 
     * @param {string} username - The user's username
     * @param {string} password - The user's password
     * @param {Object} data - The user's data
     * 
     * @returns {Promise<boolean>} - Confirms registration
     */
    register(username, password, data) {
        return usersApi.register(username, password, data)
            .then(() => true)
    },

    /**
     * Logs a user in
     * 
     * @async
     * 
     * @param {string} username - The user's username
     * @param {string} password - The user's password
     * 
     * @returns {Promise<boolean>} - Confirms log-in
     */
    login(username, password) {
        return usersApi.authenticate(username, password)
            .then(id => {
                Xtorage.session.set('id', id)

                return true
            })
    },

    /**
     * Checks wether user is logged in
     * 
     * @returns {boolean} - The login status (true -> logged in)
     */
    get loggedin() {
        const id = Xtorage.session.get('id'), token = usersApi.token()

        return typeof id === 'string' && typeof token === 'string'
    },

    /**
     * Logs a user out
     * 
     * @param {string} username - The user's username
     * @param {string} password - The user's password
     * 
     * @returns {boolean} - Confirms log-out
     */
    logout() {
        Xtorage.session.clear()

        return true
    },

    /**
     * Retrieves user's data
     * 
     * @async
     * 
     * @returns {Promise<Object>} - The user's data
     */
    retrieve() {
        const id = Xtorage.session.get('id')

        return usersApi.retrieve(id)

    },

    /**
     * Updates user's data
     * 
     * @async
     * 
     * @param {string} username - The user's username
     * @param {string} password - The user's password
     * @param {Object} data - The user's data
     * 
     * @returns {Promise<boolean>} - Confirms update
     */
    update(username, password, data) {
        const id = Xtorage.session.get('id')

        return usersApi.update(id, username, password, data)
            .then(() => true)
    },


    unregister(username, password) {
        const id = Xtorage.session.get('id')

        return usersApi.unregister(id, username, password)
            .then(() => {
                return this.logout()
            })
    }
}

// export default logic // babel
if (typeof module === 'object') module.exports = logic