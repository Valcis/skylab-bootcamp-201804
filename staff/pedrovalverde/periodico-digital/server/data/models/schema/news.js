const { Schema, Schema: { ObjectId } } = require('mongoose')

const Comment = require('./comment')

module.exports = new Schema({
    newsId: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: false
    },
    summary: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
     category: {
        type: "array",
        minItems: 1,
        maxItems: 4,
        items: {
            type: "string"
        },   
        required: true
    }, 
    link: {
        type: String,
        required: false
    },
    pubDate: {
        type: String,
        required: true
    },
    inputDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    from: {
        type: String,
        default: "RSS",
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false,
        required: true
    },
    //comments: [Comment]
    comments: [{
        type : String
    }]
})
