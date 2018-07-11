//import usersApi from '../utils/users-api-1.0.0' // babel
//import Xtorage from '../utils/xtorage-1.0.1' // babel

if (typeof require === 'function') {
    var usersApi = require('../utils/users-api-1.0.0')
    var Xtorage = require('../utils/xtorage-1.1.0')
}

/**
 * Project App logic
 */
const logic = {
    /**
     * Initializes logic's storage
     * 
     * @param {Xtorage} storage - The storage to use (session or local)
     */
    init(storage = Xtorage.session) {
        if (!(storage instanceof Xtorage)) throw Error('storage not an instance of Xtorage')

        this.storage = storage

        // use session storage for token
        usersApi.token = token => {
            if (token) {
                this.storage.set('token', token)

                return
            }

            return this.storage.get('token')
        }
    },

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
                this.storage.set('id', id)

                return true
            })
    },

    /**
     * Checks wether user is logged in
     * 
     * @returns {boolean} - The login status (true -> logged in)
     */
    get loggedIn() {
        const id = this.storage.get('id'), token = usersApi.token()

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
        this.storage.clear()

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
        const id = this.storage.get('id')

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
        const id = this.storage.get('id')

        return usersApi.update(id, username, password, data)
            .then(() => true)
    },

    /**
     * Unregisters user
     * 
     * @async
     * 
     * @param {string} username - The user's username
     * @param {string} password - The user's password
     * 
     * @returns {Promise<boolean>} - Confirms unregistration 
     */
    unregister(username, password) {
        const id = this.storage.get('id')

        return usersApi.unregister(id, username, password)
            .then(() => this.logout())
    }
}

//export default logic // babel
if (typeof module === 'object') module.exports = logic