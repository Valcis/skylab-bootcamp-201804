const mongoose = require('mongoose')
const { Pet } = require('./schemas')

module.exports = mongoose.model('Pet', Pet)