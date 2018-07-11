'use strict'

const logic = require('../../logic')

module.exports = (req, res) => {

    return logic.listnotes()
        .then(notes => {
            res.json({status: "OK", data: notes})
        })
        .catch(err => {
            res.json(err.message)
        })
}