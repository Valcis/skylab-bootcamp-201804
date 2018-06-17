'use strict'

const notesApi = require('notes-api')

notesApi.url = 'http://localhost:5000/api'

const logic = {
    userId: 'NO-ID',

    registerUser(name, surname, email, password) {
        return notesApi.registerUser(name, surname, email, password)
    },

    login(email, password) {
        return notesApi.authenticateUser(email, password)
            .then(id => {
                this.userId = id

                return true
            })
    }
}

module.exports = logic
//export default logic