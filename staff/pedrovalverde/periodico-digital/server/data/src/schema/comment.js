const { Schema, Schema: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    userId: {
        type: ObjectId,
        ref : 'User',
        required: true
    },
    content: {
        type: String,
        required: true
    },
    inputDate: {
        type: Date,
        required: true,
        default: Date.now
    },
    isDeleted: {
        type: Boolean,
        required: true,
        default: false
    }
})