const mongoose = require('mongoose')

const { User } = require('./schema')

module.exports = mongoose.model('User', User)