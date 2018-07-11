const mongoose = require('mongoose')
const { Market } = require('./schemas')

module.exports = mongoose.model('Market', Market)