'use strict'

const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Note = new Schema({   // lo pasamos como esquema directamente para que lo recoja user
    text: {
        type: String,
        required: true,
        minlength: 1,
        trim: true
    }
})

module.exports = Note