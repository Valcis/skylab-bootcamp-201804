const mongoose = require('mongoose')

const { News } = require('./schema')

module.exports = mongoose.model('News', News)