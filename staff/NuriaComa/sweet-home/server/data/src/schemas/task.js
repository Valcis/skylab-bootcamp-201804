const { Schema, SchemaTypes: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },
    apartmentId: {
        type: ObjectId,
        ref: 'Apartment',
        required: true
    }
    
})
