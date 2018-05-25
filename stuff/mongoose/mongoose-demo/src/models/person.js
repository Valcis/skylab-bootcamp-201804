const mongoose = require('mongoose')
const { Person } = require('./schemas')

module.exports = mongoose.model('Person', Person)