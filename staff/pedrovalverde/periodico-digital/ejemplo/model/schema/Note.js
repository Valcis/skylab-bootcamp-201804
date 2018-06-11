const mongoose = require('mongoose')

const {Schema} = mongoose

const noteSchema = new Schema({
    text: String
})

module.exports = noteSchema