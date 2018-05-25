const { Schema, Schema: { Types: { ObjectId } } } = require('mongoose')
const Card = require('./card')

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    age: Number,
    gender: {
        type: String,
        enum: ['M', 'F', 'U'],
        required: true
    },
    cards: [Card],
    pets: [{
        ref: 'Pet',
        type: ObjectId
    }]
})