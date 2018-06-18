const apiClient = require('api-client')

apiClient.url = 'http://localhost:5000/api'

const userLogic = {
    userId: 'NO-ID',

    registerUser(name, surname, email, username, password, birthdate, gender, address, permission) {
        return apiClient.registerUser(name, surname, email, username, password, birthdate, gender, address, permission)
    },

    loginUser(email, password) {
        return apiClient.authenticateUser(email, password)
            .then(id => {
                this.userId = id

                return true
            })
    }
    
}

module.exports = userLogic