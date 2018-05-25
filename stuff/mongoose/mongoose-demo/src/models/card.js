const mongoose = require('mongoose')
const { Card } = require('./schemas')

module.exports = mongoose.model('Card', Card)