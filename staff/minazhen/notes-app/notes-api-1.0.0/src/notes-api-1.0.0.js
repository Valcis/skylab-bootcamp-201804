'use strict'

const axios = require('axios')

const notesApi = {
    url: 'NOWHERE',

    /**
     * 
     * @param {string} name 
     * @param {string} surname 
     * @param {string} email 
     * @param {string} password 
     * 
     * @returns {Promise<boolean>}
     */
    registerUser(name, surname, email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateErrors(false, "", true, name, true, surname, true, email, true, password)

                return axios.post(`${this.url}/users`, { name, surname, email, password })
                    .then(({ status, data }) => {
                        if (status !== 201 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return true
                    })
                    .catch(({ response: { data: { error } } }) => error)
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
                this._validateErrors(false, "", false, "", false, "", true, email, true, password)

                return axios.post(`${this.url}/auth`, { email, password })
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return data.data.id
                    })
                    .catch(({ response: { data: { error } } }) => error)
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
                if ((typeof id !== 'string') || (id.length !== 24)) throw Error("id has not a right format")

                return axios.get(`${this.url}/users/${id}`)
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return data.data
                    })
                    .catch(({ response: { data: { error } } }) => error)
            })
    },

    updateUser(userId, name, surname, email, password, newEmail, newPassword) {
        return Promise.resolve()
            .then(() => {
                this._validateErrors(true, userId, true, name, true, surname, true, email, true, password, true, newEmail, true, newPassword)

                return axios.patch(`${this.url}/users/${userId}`, { userId, name, surname, email, password, newEmail, newPassword })
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return true
                    })
                    .catch(({ response: { data: { error } } }) => error)
            })
            
    },

    unregisterUser(userId, email, password) {
        return Promise.resolve()
            .then(() => {
                this._validateErrors(true, userId, false, "", false, "", true, email, true, password)

                return axios.delete(`${this.url}/users/${userId}`, {data : { email, password }})
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)
                        return true
                    })
                    .catch(({ response: { data: { error } } }) => error)
            })
    },

    addNote(userId, text) {
        return Promise.resolve()
            .then(() => {
                this._validateNotes(true, userId, true, text)

                return axios.post(`${this.url}/users/${userId}/notes`, { text })
                    .then(({ status, data }) => {
                        if (status !== 201 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return data.data.id
                    })
                    .catch(({ response: { data: { error } } }) => error)
            })
    },

    retrieveNote(userId, noteId) {
        return Promise.resolve()
            .then(() => {
                this._validateNotes(true, userId, false, "", true, noteId)

                return axios.get(`${this.url}/users/${userId}/notes/${noteId}`)
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return data.data
                    })
                    .catch(({ response: { data: { error } } }) => error)
            })
    },

    listNotes(userId) {
        return Promise.resolve()
            .then(() => {
                this._validateNotes(true, userId)

                return axios.get(`${this.url}/users/${userId}/notes/`)
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                        return data.data
                    })
                    .catch(({ response: { data: { error } } }) => error)
            })
    },

    removeNote(userId, noteId) {
        return Promise.resolve()
            .then(() => {
                
                this._validateNotes(true, userId, false, "", true, noteId)

                return axios.delete(`${this.url}/users/${userId}/notes/${noteId}`)
                    .then(({ status, data }) => {
                        if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)
                        return true
                    })
                    .catch(({ response: { data: { error } } }) => error)
            })
    },

    updateNote(userId, noteId, text) {
        return Promise.resolve()
            .then(() => {
                this._validateNotes(true, userId, true, text, true, noteId)

                return axios.patch(`${this.url}/users/${userId}/notes/${noteId}`, { text })
                .then(({ status, data }) => {
                    if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                    return true
                })
                .catch(({ response: { data: { error } } }) => error)
        })
    },

    findNotes(userId, text) {
        return Promise.resolve()
        .then(() => {
                
            this._validateNotes(true, userId, true, text)

            return axios.get(`${this.url}/users/${userId}/notes`, { params: { q : text }})
            .then(({ status, data }) => {
                if (status !== 200 || data.status !== 'OK') throw Error(`unexpected response status ${status} (${data.status})`)

                return data.data
            })
            .catch(({ response: { data: { error } } }) => error)
    })

    },

    _validateNotes(vUserId, userId, vText, text, vNoteId, noteId) {
        if (vText){
            if (typeof text !== "string") throw Error("Note text is not a string")

            if (!(text.trim()).length) throw Error("Note text is empty or blank")
        }
        if (vUserId){
            if (typeof userId !== 'string') throw Error('userId is not a string')

            if (!(userId = userId.trim()).length) throw Error('userId is empty or blank')

            if (userId.length !== 24) throw Error('userId has a wrong format')
        }
        if (vNoteId){
            if (typeof noteId !== 'string') throw Error('noteId is not a string')

            if (!(noteId = noteId.trim()).length) throw Error('noteId is empty or blank')

            if (noteId.length !== 24) throw Error('noteId has a wrong format')
        
        }
    },

    _validateErrors(vUserId, userId, vName, name, vSurname, surname, vEmail, email, vPassword, password, vnewEmail, newEmail, vnewPassword, newPassword) {
        if (vUserId){
            if (typeof userId !== 'string') throw Error('userId is not a string')

            if (!(userId = userId.trim()).length) throw Error('userId is empty or blank')

            if (userId.length !== 24) throw Error('userId has a wrong format')
        }
        if (vName){
            if (typeof name !== "string") throw Error("User name is not a string")
    
            if (!(name = name.trim()).length) throw Error("User name is empty or blank")
        }
        if (vSurname){
            if (typeof surname !== "string") throw Error("User surname is not a string")
    
            if (!(surname = surname.trim()).length) throw Error("User surname is empty or blank")
        }
        if (vEmail){
            if (typeof email !== "string") throw Error("User email is not a string")
    
            if (!(email = email.trim()).length) throw Error("User email is empty or blank")
    
            const rex  = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    
            if (!rex.test(email)) throw Error ("User email is not a valid email")
        }
        if (vPassword){
            if (typeof password !== "string") throw Error("User password is not a string")
    
            if (!(password.trim()).length) throw Error("User password is empty or blank")
        }
        if (vnewEmail){
            if ((newEmail === "") || (newEmail === undefined)) return;
            
            if (typeof newEmail !== "string") throw Error("User new email is not a string")
    
            if (!(newEmail = newEmail.trim()).length) throw Error("User new email is empty or blank")
    
            const rex  = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    
            if (!rex.test(newEmail)) throw Error ("User new email is not a valid email")
            
        }
        if (vnewPassword){
            if ((newPassword === "") || (newPassword === undefined)) return;
            
            if (typeof newPassword !== "string") throw Error("User new password is not a string")
    
            if (!(newPassword.trim()).length) throw Error("User new password is empty or blank")
            
        }
    }

}

module.exports = notesApi