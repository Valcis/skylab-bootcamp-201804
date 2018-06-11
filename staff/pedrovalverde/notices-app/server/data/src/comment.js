const mongoose = require('mongoose')

const { Comment } = require('./schema')

module.exports = mongoose.model('Comment', Comment)