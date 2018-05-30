'use strict'

/**
 * Users API (client)
 * 
 * Provides a singleton client for Users API
 * 
 * @author manuelbarzi
 * @version 1.0.0
 */
const usersApi = {
    // the API base URL
    url: 'https://skylabcoders.herokuapp.com/api',

    /**
     * Common method to make HTTP requests
     * 
     * @param {string} path - The path to the endpoint
     * @param {string} method - The HTTP method (POST, GET, PUT, DELETE)
     * @param {Object} body - The data to be sent (if any)
     * @param {boolean} withToken - A flag to indicate if request is subject to token or not
     */
    _call(path, method, body, withToken) {
        const headers = {
            'content-type': 'application/json'
        }

        if (withToken) headers.authorization = `bearer ${this.token()}`

        const config = {
            method,
            headers
        }

        if (body) config.body = JSON.stringify(body)

        return fetch(`${this.url}/${path}`, config)
            .then(res => res.json())
    },

    token(token) {
        if (token) {
            this._token = token

            return
        }

        return this._token
    },

    /**
     * Registers a user
     * 
     * @async
     * 
     * @param {string} username - The choosen new user's username
     * @param {string} password - The choosen new user's password
     * @param {Object} [data] - The new user's data to be registered
     * 
     * @returns {Promise<string>} - The registered new user id
     */
    register(username, password, data) {
        return this._call('/user', 'post', { username, password, ...data })
            .then(({ status, data, error }) => {
                if (status === 'OK') return data.id

                throw Error(error)
            })
    },

    /**
     * Authenticates a user
     * 
     * @async
     * 
     * @param {string} username - The user's username
     * @param {string} password - The user's password
     * 
     * @returns {Promise<string>} - The user id
     */
    authenticate(username, password) {
        return this._call('/auth', 'post', { username, password })
            .then(({ status, data, error }) => {
                if (status === 'OK') {
                    this.token(data.token)

                    return data.id
                }

                throw Error(error)
            })
    },

    /**
     * Retrieves a user
     * 
     * @async
     * 
     * @param {string} id - The user's id
     * @param {string} password - The user's password
     * 
     * @returns {Promise<string>} - The user id
     */
    retrieve(id) {
        return this._call(`/user/${id}`, 'get', undefined, true)
            .then(({ status, data, error }) => {
                if (status === 'OK') return data

                throw Error(error)
            })
    },

    update(id, username, password, data) {
        return this._call(`/user/${id}`, 'put', { username, password, ...data }, true)
            .then(({ status, error }) => {
                if (status === 'OK') return true

                throw Error(error)
            })
    },

    unregister(id, username, password) {
        return this._call(`/user/${id}`, 'delete', { username, password }, true)
            .then(({ status, error }) => {
                if (status === 'OK') return true

                throw Error(error)
            })
    }
}

if (typeof module !== 'undefined') module.exports = usersApi