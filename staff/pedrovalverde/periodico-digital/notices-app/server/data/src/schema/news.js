const { Schema, Schema: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String,
        required: false
    },
    summary: {
        type: String,
        required: true
    },
    complete: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['portada', 'actualidad', 'sociedad', 'economia'],
        required: true
    },
    inputDate:{
        type : Date,
        default: Date.now,
        required : true
    },
    from : {
        type : String,
        default: "RSS",
        required : true
    },
    isDeleted : {
        type : Boolean,
        default: false,
        required : true
    },
    comments: [{
        type: ObjectId,
        ref: 'Comment',
        required : true
    }]
    
})
