const { Schema } = require('mongoose')

module.exports = new Schema({
    id: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    expiration: {
        type: Date,
        required: true
    }
})