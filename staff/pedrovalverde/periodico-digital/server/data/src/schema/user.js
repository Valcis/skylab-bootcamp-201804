const { Schema, Schema: { ObjectId } } = require('mongoose')

module.exports = new Schema({
    name: {
        type: String,
        required: true
    },
    surname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        match: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        unique: true
    },
    username: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    birthdate: {
        type: String,
        required: false
    },
    subscribeDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    gender: [{
        type: String,
        enum: ['male', 'female', ''],
        required: false
    }],
    address: {
        type: String,
        required: false
    },
    permission: {
        type: String,
        enum: ['reader', 'editor', 'admin', 'unsubscribe'],
        default: 'reader',
        required: true
    },
    comments: [{
        news :{
            type: ObjectId,
            ref: 'News',
            required : false
        },
        comments: [{
            type: ObjectId,
            required : false
        }]
    }],
    likes :[{
        type :ObjectId,
        ref : 'News',
        required : false
    }]
})