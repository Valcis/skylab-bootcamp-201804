const mongoose = require('mongoose')

const {Schema} = mongoose

const Note = require('./Note')

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: String,
    email: String,
    password: String,
    notes: [Note]
})

const User = mongoose.model('User', userSchema)
module.exports = User