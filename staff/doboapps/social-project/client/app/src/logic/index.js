'use strict'

const socialApi = require('social-api')

socialApi.url = 'http://localhost:5000/api'

const logic = {
    userId: 'NO-ID',

    registerUser(name, email, password) {
        return socialApi.registerUser(name, email, password)
    },

    login(email, password) {
        return socialApi.authenticateUser(email, password)
            .then(id => {
                this.userId = id

                return true
            })
    }
}

module.exports = logic
