const mongoose = require('mongoose')
const { Apartment} = require('./schemas')

module.exports = mongoose.model('Apartment', Apartment)