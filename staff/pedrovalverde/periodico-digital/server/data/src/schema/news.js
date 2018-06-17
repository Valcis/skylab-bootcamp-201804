const { Schema, Schema: { ObjectId } } = require('mongoose')

const Comment = require('./comment')

module.exports = new Schema({
    newsId:{
        type: String,
        required: true
    },
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
    comments: [Comment]
    
})
