'use strict'

const axios = require('axios')

const DATE_REGEX = new RegExp('[0-9]{4}-[0-9]{2}-[0-9]{2}')

const notesApi = {
    url: 'NO-URL',
    token: 'NO-TOKEN',

    /**
     * 
     * @param {string} name 
     * @param {string} surname 
     * @param {string} email 
     * @param {string} username
     * @param {string} password 
     * @param {date} birthdate 
     * @param {string} gender
     * @param {string} address 
     * @param {string} permission
     * 
     * @returns {Promise<boolean>}
     */
    registerUser(name, surname, email, username, password, birthdate, gender, address, permission) {
        return Promise.resolve()
            .then(() => {
                if (typeof name !== 'string') throw Error('user name is not a string')
                if (!(name = name.trim()).length) throw Error('user name is empty or blank')

                if (typeof surname !== 'string') throw Error('user surname is not a string')
                if (!(surname = surname.trim()).length) throw Error('user surname is empty or blank')

                if (typeof email !== 'string') throw Error('user email is not a string')
                if (!(email = email.trim()).length) throw Error('user email is empty or blank')

                if (typeof username !== 'string') throw Error('user username is not a string')
                if (!(username = username.trim()).length) throw Error('user username is empty or blank')

                if (typeof password !== 'string') throw Error('user password is not a string')
                if (!(password = password.trim()).length) throw Error('user password is empty or blank')

                if (typeof password !== 'string') throw Error('user password is not a string')
                if (!(password = password.trim()).length) throw Error('user password is empty or blank')

                if (typeof birthdate !== 'undefined' && !typeof birthdate !== 'string' && !DATE_REGEX.test(birthdate)) throw Error('user birthdate is not a date')

                if (typeof gender !== 'string') throw Error('user gender is not a string')
                if (gender !== "male" && gender !== "female" && gender !== "") throw Error('user gender value not admited')

                if (typeof address !== 'string') throw Error('user address is not a string')

                if (typeof permission !== 'string') throw Error('user permission is not a string')
                if (permission !== "reader" && permission !== "editor" && permission !== "admin" && permission !== "unsubscribe") throw Error('user permission value not admited')

                return axios.post(`${this.url}/users`, { name, surname, email, username, password, birthdate, gender, address, permission })
                    .then(({ status, data }) => {
                        if (status !== 201 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return true
                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err

                            throw Error(message)
                        } else throw err
                    })
            })
    },

    /**
    * 
    * @param {string} email 
    * @param {string} password 
    * 
    * @returns {Promise<string>}
    */
    authenticateUser(email, password) {
        return Promise.resolve()
            .then(() => {
                if (typeof email !== 'string') throw Error('user email is not a string')
                if (!(email = email.trim()).length) throw Error('user email is empty or blank')

                if (typeof password !== 'string') throw Error('user password is not a string')
                if (!(password = password.trim())) throw Error('user password is empty or blank')

                return axios.post(`${this.url}/auth`, { email, password })
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        const { data: { id, token } } = data

                        this.token = token

                        return id
                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err

                            throw Error(message)
                        } else throw err
                    })
            })
    },

    /**
     * 
     * @param {string} id
     * 
     * @returns {Promise<User>} 
     */
    retrieveUser(id) {
        return Promise.resolve()
            .then(() => {
                if (typeof id !== 'string') throw Error('user id is not a string')
                if (!(id = id.trim()).length) throw Error('user id is empty or blank')

                return axios.get(`${this.url}/users/${id}`, { headers: { authorization: `Bearer ${this.token}` } })
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return data.data
                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err

                            throw Error(message)
                        } else throw err
                    })
            })
    },

    /**
     * 
     * @param {string} name 
     * @param {string} surname 
     * @param {string} email 
     * @param {string} username
     * @param {string} password 
     * @param {date} birthdate 
     * @param {string} gender
     * @param {string} address 
     * @param {string} permission
     * @param {string} newEmail 
     * @param {string} newPassword 
     * 
     * @returns {Promise<boolean>}
     */
    updateUser(id, name, surname, email, username, password, birthdate, gender, address, permission, newEmail, newPassword) {
        return Promise.resolve()
            .then(() => {
                if (typeof id !== 'string') throw Error('user id is not a string')
                if (!(id = id.trim()).length) throw Error('user id is empty or blank')

                if (typeof name !== 'string') throw Error('user name is not a string')
                if (!(name = name.trim()).length) throw Error('user name is empty or blank')

                if (typeof surname !== 'string') throw Error('user surname is not a string')
                if (!(surname = surname.trim()).length) throw Error('user surname is empty or blank')

                if (typeof email !== 'string') throw Error('user email is not a string')
                if (!(email = email.trim()).length) throw Error('user email is empty or blank')

                if (typeof username !== 'string') throw Error('user username is not a string')
                if (!(username = username.trim()).length) throw Error('user username is empty or blank')

                if (typeof password !== 'string') throw Error('user password is not a string')
                if (!(password = password.trim()).length) throw Error('user password is empty or blank')

                if (birthdate.trim().length > 0) if (typeof birthdate !== 'date') throw Error('user birthdate is not a date')

                if (typeof gender !== 'string') throw Error('user gender is not a string')
                if (gender !== "male" && gender !== "female" && gender !== "") throw Error('user gender value not admited')

                if (typeof address !== 'string') throw Error('user address is not a string')

                if (typeof permission !== 'string') throw Error('user permission is not a string')
                if (permission !== "reader" && permission !== "editor" && permission !== "admin" && permission !== "unsubscribe") throw Error('user permission value not admited')

                if (newEmail.trim().length > 0) if (typeof newEmail !== 'string') throw Error('user newEmail is not a string')

                if (newPassword.trim().length > 0) if (typeof newPassword !== 'date') throw Error('user newPassword is not a string')

                return axios.patch(`${this.url}/users/${id}`, { name, surname, email, username, password, birthdate, gender, address, permission, newEmail, newPassword }, { headers: { authorization: `Bearer ${this.token}` } })
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return true
                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err

                            throw Error(message)
                        } else throw err
                    })
            })
    },

    /**
     * 
     * @param {string} id 
     * @param {string} email 
     * @param {string} password 
     * 
     * @returns {Promise<boolean>}
     */
    unregisterUser(id, email, password) {
        return Promise.resolve()
            .then(() => {
                if (typeof id !== 'string') throw Error('user id is not a string')
                if (!(id = id.trim()).length) throw Error('user id is empty or blank')

                if (typeof email !== 'string') throw Error('user email is not a string')
                if (!(email = email.trim()).length) throw Error('user email is empty or blank')

                if (typeof password !== 'string') throw Error('user password is not a string')
                if (!(password = password.trim()).length) throw Error('user password is empty or blank')

                if ((password = password.trim()).length === 0) throw Error('user password is empty or blank')

                return axios.delete(`${this.url}/users/${id}`, { headers: { authorization: `Bearer ${this.token}` }, data: { email, password } })
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return true
                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err

                            throw Error(message)
                        } else throw err
                    })
            })
    },

    // FOR NEWS BBDD:

    /**
     * 
     * @param {string} category 
     * 
     * @returns {Promise<categoryobject>}
     */
    getExternNews(category) {
        return Promise.resolve()
            .then(() => {
                if (typeof category !== 'string') throw Error('category is not a string')
                if (!(category = category.trim()).length) throw Error('category is empty or blank')

                return axios.get(`${this.url}/news/${category}/`)

                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'ok') throw Error(`unexpected response status ${status} (${data.status})`)
                        return data
                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err

                            throw Error(message)
                        } else throw err
                    })
            })
    },

    getNewsByPubDate(pubDate) {
        return Promise.resolve()
            .then(() => {
                if (typeof pubDate !== 'string') throw Error('pubDate is not a string')
                if (!(pubDate = pubDate.trim())) throw Error('pubDate is empty or blank')

                return axios.post(`${this.url}/news-bbdd`, { pubDate })
                    .then(( res) => {
                        console.log(res);
                       let { status, data } = res
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)
                        return id
                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err

                            throw Error(message)
                        } else throw err
                    })
            })
    },

    /**
     * 
     * @param {string} userId
     * @param {string} text 
     * 
     * @returns {Promise<string>}
     */
    addComnent(userId, text) {
        return Promise.resolve()
            .then(() => {
                if (typeof userId !== 'string') throw Error('user id is not a string')

                if (!(userId = userId.trim()).length) throw Error('user id is empty or blank')

                if (typeof text !== 'string') throw Error('text is not a string')

                if ((text = text.trim()).length === 0) throw Error('text is empty or blank')

                return axios.post(`${this.url}/users/${userId}/notes`, { text }, { headers: { authorization: `Bearer ${this.token}` } })
                    .then(({ status, data }) => {
                        if (status !== 201 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return data.data.id
                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err

                            throw Error(message)
                        } else throw err
                    })
            })
    },

    /**
     * 
     * @param {string} userId
     * @param {string} noteId 
     * 
     * @returns {Promise<Comnent>}
     */
    retrieveComnent(userId, noteId) {
        return Promise.resolve()
            .then(() => {
                if (typeof userId !== 'string') throw Error('user id is not a string')

                if (!(userId = userId.trim()).length) throw Error('user id is empty or blank')

                if (typeof noteId !== 'string') throw Error('note id is not a string')

                if (!(noteId = noteId.trim())) throw Error('note id is empty or blank')

                return axios.get(`${this.url}/users/${userId}/notes/${noteId}`, { headers: { authorization: `Bearer ${this.token}` } })
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return data.data
                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err

                            throw Error(message)
                        } else throw err
                    })
            })
    },

    /**
     * @param {string} userId
     * 
     * @returns {Promise<[Comnent]>}
     */
    listComnents(userId) {
        return Promise.resolve()
            .then(() => {
                if (typeof userId !== 'string') throw Error('user id is not a string')

                if (!(userId = userId.trim()).length) throw Error('user id is empty or blank')

                return axios.get(`${this.url}/users/${userId}/notes`, { headers: { authorization: `Bearer ${this.token}` } })
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return data.data
                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err

                            throw Error(message)
                        } else throw err
                    })
            })
    },

    /**
     * 
     * @param {string} userId
     * @param {string} noteId 
     * @param {string} text 
     * 
     * @returns {Promise<boolean>}
     */
    updateComnent(userId, noteId, text) {
        return Promise.resolve()
            .then(() => {
                if (typeof userId !== 'string') throw Error('user id is not a string')

                if (!(userId = userId.trim()).length) throw Error('user id is empty or blank')

                if (typeof noteId !== 'string') throw Error('note id is not a string')

                if (!(noteId = noteId.trim())) throw Error('note id is empty or blank')

                if (typeof text !== 'string') throw Error('text is not a string')

                if ((text = text.trim()).length === 0) throw Error('text is empty or blank')

                return axios.patch(`${this.url}/users/${userId}/notes/${noteId}`, { text }, { headers: { authorization: `Bearer ${this.token}` } })
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return true
                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err

                            throw Error(message)
                        } else throw err
                    })
            })
    },

    /**
     * 
     * @param {string} userId
     * @param {string} noteId 
     *
     * @returns {Promise<boolean>}
     */
    removeComnent(userId, noteId) {
        return Promise.resolve()
            .then(() => {
                if (typeof userId !== 'string') throw Error('user id is not a string')

                if (!(userId = userId.trim()).length) throw Error('user id is empty or blank')

                if (typeof noteId !== 'string') throw Error('note id is not a string')

                if (!(noteId = noteId.trim())) throw Error('note id is empty or blank')

                return axios.delete(`${this.url}/users/${userId}/notes/${noteId}`, { headers: { authorization: `Bearer ${this.token}` } })
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return true
                    })
                    .catch(err => {
                        debugger
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err

                            throw Error(message)
                        } else throw err
                    })
            })
    },

    /**
     * 
     * @param {string} userId
     * @param {string} text 
     * 
     * @returns {Promise<[Comnent]>}
     */
    findComnents(userId, text) {
        return Promise.resolve()
            .then(() => {
                if (typeof userId !== 'string') throw Error('user id is not a string')

                if (!(userId = userId.trim()).length) throw Error('user id is empty or blank')

                if (typeof text !== 'string') throw Error('text is not a string')

                if (!text.length) throw Error('text is empty')

                return axios.get(`${this.url}/users/${userId}/notes?q=${text}`, { headers: { authorization: `Bearer ${this.token}` } })
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return data.data
                    })
                    .catch(err => {
                        if (err.code === 'ECONNREFUSED') throw Error('could not reach server')

                        if (err.response) {
                            const { response: { data: { error: message } } } = err

                            throw Error(message)
                        } else throw err
                    })
            })
    }
}

module.exports = notesApi