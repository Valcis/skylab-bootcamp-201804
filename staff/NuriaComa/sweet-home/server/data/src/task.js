const mongoose = require('mongoose')
const { Task } = require('./schemas')

module.exports = mongoose.model('Task', Task)