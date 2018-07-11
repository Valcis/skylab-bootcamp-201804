const { Schema } = require('mongoose')

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },
    family: {
        type: String,
        enum: ['adopted dog', 'adopted cat']
    },
    age: Number,
    weight: Number,
    color: String
})