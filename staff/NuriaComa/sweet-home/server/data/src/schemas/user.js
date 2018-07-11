
const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    dni: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    apartmentId: {
        type: ObjectId,
        ref: 'Apartment',
        required: true
    },
    taskId: {
        type: ObjectId,
        ref: 'Task'
        
    }

})